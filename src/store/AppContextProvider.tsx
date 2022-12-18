import React, {ReactNode, useState} from 'react';
import {Team} from '../types/Team';
import {Match} from '../types/Match';
import {Player} from '../types/Player';
import AppContext from './AppContext';
import AppContextProps from './AppContextProps';
import {PhaseTeam} from '../types/PhaseTeam';

interface AppContextProviderProps {
  children: ReactNode | ReactNode[];
}

const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [chosenPlayers, setChosenPlayers] = useState<Player[]>([]);
  const [chosenTeams, setChosenTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchNumber, setMatchNumber] = useState<number>(0);
  const [phase, setPhase] = useState<number>(0);
  const [halfFinalTeams, setHalfFinalTeams] = useState<Team[]>([]);
  const [finalTeams, setFinalTeams] = useState<Team[]>([]);
  const [finalist, setFinalist] = useState<Team>();
  const [phases, setPhases] = useState<PhaseTeam[]>([]);
  const [tournamentType, setTournamentType] = useState<
    'Elimination' | 'Rotation'
  >('Elimination');

  const onUpdatePlayers = (newPlayers: Player[]) => {
    setChosenPlayers(newPlayers);
  };
  const onUpdateMatch = (newMatch: Match) => {
    const existingMatch = matches.find(item => item.id === newMatch.id);

    if (existingMatch) {
      const matchIndex = matches.findIndex(
        item => item.id === existingMatch.id,
      );
      if (matchIndex > -1) {
        matches[matchIndex] = newMatch;
        setMatches(matches);
      } else {
        return;
      }
    }
  };

  const onMatchNumberUpdate = () => {
    const newNumber = matchNumber + 1;
    setMatchNumber(newNumber);
  };

  const updateTournamentType = (type: 'Elimination' | 'Rotation') => {
    setTournamentType(type);
  };

  const onClosePhase = (newMatch: Match) => {
    const existingMatch = matches.find(item => item.id === newMatch.id);
    if (existingMatch) {
      const matchIndex = matches.findIndex(
        item => item.id === existingMatch.id,
      );
      if (matchIndex > -1) {
        matches[matchIndex] = newMatch;
        setMatches(matches);
      } else {
        return;
      }
    }
  };

  const onUpdateMatches = (newMatches: Match[]) => {
    setMatches(newMatches);
  };

  const onAddNewMatches = (newMatches: Match[]) => {
    setMatches(prevState => {
      return [...prevState, ...newMatches];
    });
  };

  const onAddNewMatch = (newMatch: Match) => {
    setMatches(prevState => {
      return [...prevState, newMatch];
    });
  };

  const onUpdateTeams = (teams: Team[]) => {
    setChosenTeams(teams);
  };

  const onHalfFinalTeamsUpdate = (newTeam: Team) => {
    setHalfFinalTeams(prevState => {
      return [...prevState, newTeam];
    });
  };

  const onFinalTeamsUpdate = (newTeam: Team) => {
    setFinalTeams(prevState => {
      return [...prevState, newTeam];
    });
  };

  const onFinalistUpdate = (newTeam: Team) => {
    setFinalist(newTeam);
  };

  const onResetContext = () => {
    setChosenPlayers([]);
    setChosenTeams([]);
    setMatches([]);
    setMatchNumber(0);
    setPhase(0);
    setHalfFinalTeams([]);
    setFinalTeams([]);
    //setFinalist();
  };

  const onTeamUpdate = (newTeam: Team) => {
    const copy = [...chosenTeams];
    const teamIndex = copy.findIndex(item => item.id === newTeam.id);
    copy[teamIndex] = newTeam;
    setChosenTeams(copy);
  };

  const onUpdatePhase = () => {
    setPhase(prevState => (prevState += 1));
  };

  const onPhaseUpdate = (newPhases: PhaseTeam[]) => {
    setPhases(newPhases);
  };

  const initialContext: AppContextProps = {
    chosenPlayers,
    chosenTeams,
    halfFinalTeams,
    matches,
    onUpdatePlayers,
    onUpdateMatch,
    onClosePhase,
    onUpdateMatches,
    onUpdateTeams,
    onResetContext,
    onTeamUpdate,
    onUpdatePhase,
    onHalfFinalTeamsUpdate,
    onAddNewMatches,
    onAddNewMatch,
    onMatchNumberUpdate,
    onFinalTeamsUpdate,
    onFinalistUpdate,
    matchNumber,
    phase,
    finalTeams,
    phases,
    onPhaseUpdate,
    finalist,
    tournamentType,
    updateTournamentType,
  };

  return (
    <AppContext.Provider value={initialContext}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
