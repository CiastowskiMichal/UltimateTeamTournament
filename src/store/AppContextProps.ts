import {Player} from '../types/Player';
import {Team} from '../types/Team';
import {Match} from '../types/Match';
import {PhaseTeam} from '../types/PhaseTeam';

interface AppContextProps {
  chosenPlayers: Player[];
  chosenTeams: Team[];
  halfFinalTeams: Team[];
  finalTeams: Team[];
  finalist: Team | undefined;
  matches: Match[];
  phases: PhaseTeam[];
  onPhaseUpdate: (newPhaseTeam: PhaseTeam[]) => void;
  onUpdatePlayers: (newPlayers: Player[]) => void;
  onUpdateMatch: (newMatch: Match) => void;
  onClosePhase: (newMatch: Match) => void;
  onUpdateMatches: (newMatches: Match[]) => void;
  onAddNewMatches: (newMatches: Match[]) => void;
  onAddNewMatch: (newMatch: Match) => void;
  onUpdateTeams: (teams: Team[]) => void;
  onResetContext: () => void;
  onUpdatePhase: () => void;
  onTeamUpdate: (newTeam: Team) => void;
  onMatchNumberUpdate: () => void;
  onHalfFinalTeamsUpdate: (newTeam: Team) => void;
  onFinalTeamsUpdate: (newTeam: Team) => void;
  onFinalistUpdate: (newTeam: Team) => void;
  matchNumber: number;
  phase: number;
  tournamentType: 'Elimination' | 'Rotation';
  updateTournamentType: (type: 'Elimination' | 'Rotation') => void;
}

export default AppContextProps;
