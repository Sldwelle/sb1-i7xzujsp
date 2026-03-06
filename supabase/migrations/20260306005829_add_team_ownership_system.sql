/*
  # Team Ownership and Access Control System

  ## Overview
  This migration creates a team ownership system for the hackathon project, restricting
  edit access to only 6 approved co-owner team members during the 48-hour period.

  ## New Tables
  
  ### `team_members`
  - `id` (uuid, primary key) - Unique identifier for team member record
  - `user_id` (uuid, foreign key to auth.users) - Reference to authenticated user
  - `email` (text, unique) - Team member email address
  - `full_name` (text) - Team member display name
  - `role` (text) - Role in the team (default: 'co-owner')
  - `is_active` (boolean) - Whether the member has active access
  - `joined_at` (timestamptz) - When the member joined the team
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `hackathon_config`
  - `id` (uuid, primary key) - Configuration record identifier
  - `start_time` (timestamptz) - Hackathon start time
  - `end_time` (timestamptz) - Hackathon end time (48 hours after start)
  - `max_team_size` (integer) - Maximum number of team members (6)
  - `is_active` (boolean) - Whether the hackathon is currently active
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all new tables
  - Only authenticated co-owner team members can read team member list
  - Only co-owners can read hackathon configuration
  - All write operations are restricted (managed through application logic)

  ## Functions
  - `is_co_owner(user_uuid)` - Check if a user is an active co-owner
  - `is_hackathon_active()` - Check if within 48-hour hackathon window
  - `can_edit_project(user_uuid)` - Verify user has edit access (co-owner + active hackathon)
*/

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'co-owner' CHECK (role IN ('co-owner', 'viewer')),
  is_active boolean DEFAULT true,
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create hackathon_config table
CREATE TABLE IF NOT EXISTS hackathon_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  max_team_size integer DEFAULT 6,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_config ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is a co-owner
CREATE OR REPLACE FUNCTION is_co_owner(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members
    WHERE user_id = user_uuid
    AND role = 'co-owner'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if hackathon is active
CREATE OR REPLACE FUNCTION is_hackathon_active()
RETURNS boolean AS $$
DECLARE
  config_record RECORD;
BEGIN
  SELECT * INTO config_record
  FROM hackathon_config
  WHERE is_active = true
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF config_record IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN now() >= config_record.start_time 
    AND now() <= config_record.end_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user can edit project
CREATE OR REPLACE FUNCTION can_edit_project(user_uuid uuid)
RETURNS boolean AS $$
BEGIN
  RETURN is_co_owner(user_uuid) AND is_hackathon_active();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for team_members

-- Co-owners can view all team members
CREATE POLICY "Co-owners can view team members"
  ON team_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members tm
      WHERE tm.user_id = auth.uid()
      AND tm.role = 'co-owner'
      AND tm.is_active = true
    )
  );

-- RLS Policies for hackathon_config

-- Co-owners can view hackathon configuration
CREATE POLICY "Co-owners can view hackathon config"
  ON hackathon_config
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE user_id = auth.uid()
      AND role = 'co-owner'
      AND is_active = true
    )
  );

-- Insert initial hackathon configuration (48-hour window starting now)
INSERT INTO hackathon_config (start_time, end_time, max_team_size, is_active)
VALUES (
  now(),
  now() + interval '48 hours',
  6,
  true
)
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON team_members(email);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_hackathon_config_active ON hackathon_config(is_active) WHERE is_active = true;