import { Users, Clock, AlertCircle } from 'lucide-react';
import { useTeamAccess } from '../hooks/useTeamAccess';

export function TeamAccessBanner() {
  const { isCoOwner, isHackathonActive, canEdit, loading, teamMembers, hackathonConfig } = useTeamAccess();

  if (loading) {
    return null;
  }

  if (!isCoOwner) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <div>
            <h3 className="text-sm font-semibold text-red-800">Access Restricted</h3>
            <p className="text-sm text-red-700 mt-1">
              You are not a co-owner of this hackathon project. Edit access is limited to team members only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isHackathonActive) {
    const endTime = hackathonConfig ? new Date(hackathonConfig.end_time) : null;
    const hasEnded = endTime && new Date() > endTime;

    return (
      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-orange-500 mr-3" />
          <div>
            <h3 className="text-sm font-semibold text-orange-800">
              {hasEnded ? 'Hackathon Ended' : 'Hackathon Not Active'}
            </h3>
            <p className="text-sm text-orange-700 mt-1">
              {hasEnded
                ? `The 48-hour hackathon period ended on ${endTime?.toLocaleString()}. Edit access is now disabled.`
                : 'The hackathon has not started yet. Edit access will be enabled during the 48-hour period.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const endTime = hackathonConfig ? new Date(hackathonConfig.end_time) : null;
  const timeRemaining = endTime ? Math.max(0, endTime.getTime() - Date.now()) : 0;
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <Users className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-green-800">Co-Owner Access Active</h3>
            <p className="text-sm text-green-700 mt-1">
              You have edit access during this 48-hour hackathon period.
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-green-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {hoursRemaining}h {minutesRemaining}m remaining
              </span>
              <span>
                Team: {teamMembers.filter(m => m.is_active).length}/{hackathonConfig?.max_team_size || 6} members
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
