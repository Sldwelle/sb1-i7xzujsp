/*
  # Add Gamification and Premium Features

  1. New Tables
    - `user_stats`
      - `user_id` (uuid, primary key, references profiles)
      - `level` (integer, default 1)
      - `experience_points` (integer, default 0)
      - `current_streak` (integer, default 0)
      - `longest_streak` (integer, default 0)
      - `last_activity_date` (date)
      - `total_transactions` (integer, default 0)
      - `is_premium` (boolean, default false)
      - `premium_expires_at` (timestamptz, nullable)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `achievements`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `icon` (text)
      - `xp_reward` (integer)
      - `requirement_type` (text) - e.g., 'transactions', 'streak', 'savings'
      - `requirement_value` (integer)
      - `tier` (text) - 'bronze', 'silver', 'gold', 'platinum'
      - `created_at` (timestamptz, default now())
    
    - `user_achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `achievement_id` (uuid, references achievements)
      - `unlocked_at` (timestamptz, default now())
      - Unique constraint on (user_id, achievement_id)

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to read/update their own data
    - Achievements table is readable by all authenticated users
    - Admin-only insert on achievements table

  3. Functions
    - Trigger to update user stats automatically
    - Function to calculate level from XP
    - Function to check and award achievements
*/

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  level integer DEFAULT 1 CHECK (level > 0),
  experience_points integer DEFAULT 0 CHECK (experience_points >= 0),
  current_streak integer DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak integer DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date date,
  total_transactions integer DEFAULT 0 CHECK (total_transactions >= 0),
  is_premium boolean DEFAULT false,
  premium_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  xp_reward integer DEFAULT 0 CHECK (xp_reward >= 0),
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL CHECK (requirement_value > 0),
  tier text NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  created_at timestamptz DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id uuid NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_stats
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON user_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Authenticated users can view all achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level DESC);
CREATE INDEX IF NOT EXISTS idx_user_stats_xp ON user_stats(experience_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);

-- Function to calculate level from XP (100 XP per level, exponential growth)
CREATE OR REPLACE FUNCTION calculate_level(xp integer)
RETURNS integer AS $$
BEGIN
  RETURN FLOOR(SQRT(xp / 100.0)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update user stats when transaction is added
CREATE OR REPLACE FUNCTION update_user_stats_on_transaction()
RETURNS TRIGGER AS $$
DECLARE
  today date := CURRENT_DATE;
  last_date date;
  new_streak integer;
  xp_gain integer := 10;
BEGIN
  -- Get last activity date
  SELECT last_activity_date INTO last_date
  FROM user_stats
  WHERE user_id = NEW.user_id;

  -- Calculate streak
  IF last_date IS NULL THEN
    new_streak := 1;
  ELSIF last_date = today THEN
    new_streak := NULL; -- Don't update streak for same day
  ELSIF last_date = today - INTERVAL '1 day' THEN
    new_streak := COALESCE((SELECT current_streak FROM user_stats WHERE user_id = NEW.user_id), 0) + 1;
    xp_gain := xp_gain + 5; -- Bonus XP for maintaining streak
  ELSE
    new_streak := 1; -- Streak broken
  END IF;

  -- Upsert user stats
  INSERT INTO user_stats (
    user_id, 
    experience_points, 
    total_transactions, 
    current_streak, 
    longest_streak,
    last_activity_date,
    level
  )
  VALUES (
    NEW.user_id,
    xp_gain,
    1,
    COALESCE(new_streak, 1),
    COALESCE(new_streak, 1),
    today,
    1
  )
  ON CONFLICT (user_id) DO UPDATE SET
    experience_points = user_stats.experience_points + xp_gain,
    total_transactions = user_stats.total_transactions + 1,
    current_streak = CASE 
      WHEN new_streak IS NOT NULL THEN new_streak
      ELSE user_stats.current_streak
    END,
    longest_streak = CASE
      WHEN new_streak IS NOT NULL THEN GREATEST(user_stats.longest_streak, new_streak)
      ELSE user_stats.longest_streak
    END,
    last_activity_date = today,
    level = calculate_level(user_stats.experience_points + xp_gain),
    updated_at = now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for transaction stats
DROP TRIGGER IF EXISTS trigger_update_user_stats ON transactions;
CREATE TRIGGER trigger_update_user_stats
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_transaction();

-- Insert default achievements
INSERT INTO achievements (name, description, icon, xp_reward, requirement_type, requirement_value, tier)
VALUES
  ('First Step', 'Log your first transaction', 'Zap', 50, 'transactions', 1, 'bronze'),
  ('Getting Started', 'Log 10 transactions', 'TrendingUp', 100, 'transactions', 10, 'bronze'),
  ('Transaction Pro', 'Log 50 transactions', 'Award', 250, 'transactions', 50, 'silver'),
  ('Financial Master', 'Log 100 transactions', 'Trophy', 500, 'transactions', 100, 'gold'),
  ('Budget Legend', 'Log 500 transactions', 'Crown', 1000, 'transactions', 500, 'platinum'),
  ('One Week Streak', 'Maintain a 7-day streak', 'Flame', 200, 'streak', 7, 'bronze'),
  ('Two Week Warrior', 'Maintain a 14-day streak', 'Flame', 400, 'streak', 14, 'silver'),
  ('Month Master', 'Maintain a 30-day streak', 'Flame', 800, 'streak', 30, 'gold'),
  ('Consistency King', 'Maintain a 100-day streak', 'Flame', 2000, 'streak', 100, 'platinum'),
  ('Budget Beginner', 'Create your first budget goal', 'Target', 50, 'budget_goals', 1, 'bronze'),
  ('Savings Starter', 'Create your first savings goal', 'PiggyBank', 50, 'savings_goals', 1, 'bronze'),
  ('Goal Achiever', 'Complete a savings goal', 'CheckCircle', 300, 'savings_completed', 1, 'silver'),
  ('Level 5', 'Reach level 5', 'Star', 100, 'level', 5, 'bronze'),
  ('Level 10', 'Reach level 10', 'Star', 250, 'level', 10, 'silver'),
  ('Level 25', 'Reach level 25', 'Star', 500, 'level', 25, 'gold'),
  ('Level 50', 'Reach level 50', 'Star', 1000, 'level', 50, 'platinum')
ON CONFLICT (name) DO NOTHING;

-- Function to check and award achievements
CREATE OR REPLACE FUNCTION check_and_award_achievements(p_user_id uuid)
RETURNS void AS $$
DECLARE
  user_record RECORD;
  achievement_record RECORD;
BEGIN
  -- Get user stats
  SELECT * INTO user_record FROM user_stats WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN;
  END IF;

  -- Check transaction-based achievements
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE requirement_type = 'transactions' 
    AND requirement_value <= user_record.total_transactions
  LOOP
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, achievement_record.id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END LOOP;

  -- Check streak-based achievements
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE requirement_type = 'streak' 
    AND requirement_value <= user_record.longest_streak
  LOOP
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, achievement_record.id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END LOOP;

  -- Check level-based achievements
  FOR achievement_record IN 
    SELECT * FROM achievements 
    WHERE requirement_type = 'level' 
    AND requirement_value <= user_record.level
  LOOP
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, achievement_record.id)
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check achievements after stats update
CREATE OR REPLACE FUNCTION trigger_check_achievements()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM check_and_award_achievements(NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_award_achievements ON user_stats;
CREATE TRIGGER trigger_award_achievements
  AFTER INSERT OR UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION trigger_check_achievements();