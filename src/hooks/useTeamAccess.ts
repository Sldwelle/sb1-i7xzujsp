import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type TeamMember = Database['public']['Tables']['team_members']['Row'];
type HackathonConfig = Database['public']['Tables']['hackathon_config']['Row'];

interface TeamAccessState {
  isCoOwner: boolean;
  isHackathonActive: boolean;
  canEdit: boolean;
  loading: boolean;
  teamMembers: TeamMember[];
  hackathonConfig: HackathonConfig | null;
}

export function useTeamAccess() {
  const [state, setState] = useState<TeamAccessState>({
    isCoOwner: false,
    isHackathonActive: false,
    canEdit: false,
    loading: true,
    teamMembers: [],
    hackathonConfig: null,
  });

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      const [teamMembersResult, configResult, canEditResult] = await Promise.all([
        supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true }),
        supabase
          .from('hackathon_config')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase.rpc('can_edit_project', { user_uuid: user.id })
      ]);

      const isCoOwner = teamMembersResult.data?.some(
        member => member.user_id === user.id && member.role === 'co-owner' && member.is_active
      ) || false;

      const now = new Date();
      const config = configResult.data;
      const isHackathonActive = config
        ? now >= new Date(config.start_time) && now <= new Date(config.end_time)
        : false;

      setState({
        isCoOwner,
        isHackathonActive,
        canEdit: canEditResult.data || false,
        loading: false,
        teamMembers: teamMembersResult.data || [],
        hackathonConfig: config,
      });
    } catch (error) {
      console.error('Error checking team access:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return state;
}
