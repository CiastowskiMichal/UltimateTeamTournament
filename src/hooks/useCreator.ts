import {Club} from '../types/Club';
import {Match} from '../types/Match';
import {PhaseTeam} from '../types/PhaseTeam';
import {Player} from '../types/Player';
import {Team} from '../types/Team';
import useUtils from './useUtils';

interface useCreatorManager {
  randomizeTeams: (
    clubs: Club[],
    players: Player[],
    tournamentType: 'Elimination' | 'Rotation',
  ) => Team[];
  createMatches: (teams: Team[], tournamentType: string) => Match[];
  getMatchWinner: (match: Match) => Team;
  startPhase: (teams: Team[]) => PhaseTeam[];
  createNewMatch: (homeTeam: Team, guestTeam: Team) => Match;
}

const useCreator = (): useCreatorManager => {
  const {shuffleArray} = useUtils();

  const randomizeTeams = (
    clubs: Club[],
    players: Player[],
    tournamentType: 'Elimination' | 'Rotation',
  ): Team[] => {
    const randomClubs = shuffleArray([...clubs]);
    const randomPlayers = shuffleArray([...players]);
    const newTeams: Team[] = [];

    if (players.length === 8 || players.length === 6) {
      for (let index = 0; index < players.length; index++) {
        newTeams.push({
          id: randomClubs[index].id,
          clubName: randomClubs[index].name,
          playerName: [randomPlayers[index].name],
          wins: 0,
          loses: 0,
          ties: 0,
          goals: 0,
          points: 0,
          group:
            (players.length === 8 || players.length === 6) &&
            tournamentType === 'Rotation'
              ? index % 2
              : index % 4,
        });
      }
    } else if (players.length === 12 || players.length === 16) {
      for (let index = 0; index < players.length / 2; index++) {
        newTeams.push({
          id: randomClubs[index].id,
          clubName: randomClubs[index].name,
          playerName: [
            randomPlayers[index].name,
            randomPlayers[index + players.length / 2].name,
          ],
          wins: 0,
          loses: 0,
          ties: 0,
          goals: 0,
          points: 0,
          group:
            (players.length === 16 || players.length === 12) &&
            tournamentType === 'Rotation'
              ? index % 2
              : index % 4,
        });
      }
    }

    return newTeams;
  };

  //create table for phases with ids of teams to show them in each phase
  const startPhase = (teams: Team[]): PhaseTeam[] => {
    teams = teams.sort((a, b) => a.group - b.group);
    const phaseArr: PhaseTeam[] = [];
    teams.map(team =>
      phaseArr.push({
        id: team.id,
        phase: 0,
      }),
    );
    return phaseArr;
  };

  const createMatches = (teams: Team[], tournamentType: string) => {
    let matches: Match[] = [];
    if (tournamentType === 'Elimination') {
      teams = teams.sort((a, b) => a.group - b.group);

      for (let x = 0; x < teams.length / 2; x++) {
        matches.push({
          id:
            'id_' +
            teams[2 * x].id +
            '_' +
            teams[2 * x + 1].id +
            '_' +
            Date.now,
          group: teams[x].group,
          teams: [teams[2 * x], teams[2 * x + 1]],
          score: [0, 0],
          name: teams[2 * x].clubName + ' vs ' + teams[2 * x + 1].clubName,
          isCompleted: false,
        });
      }
    } else {
      teams = teams.sort((a, b) => a.group - b.group);
      //console.log('Rotation');
      const teamA = teams.slice(0, teams.length / 2);
      const teamB = teams.slice(teams.length / 2);

      const matchesA: Match[] = [];
      const matchesB: Match[] = [];

      console.log(teamA);
      for (let x = 0; x < teamA.length - 1; x++) {
        for (let y = x + 1; y < teamA.length; y++) {
          matchesA.push({
            id: 'id_' + teamA[x].id + '_' + teamA[y].id + '_' + Date.now,
            group: teamA[x].group,
            teams: [teamA[x], teamA[y]],
            score: [0, 0],
            name: teamA[x].clubName + ' vs ' + teamA[y].clubName,
            isCompleted: false,
          });
        }
      }
      for (let x = 0; x < teamB.length - 1; x++) {
        for (let y = x + 1; y < teamB.length; y++) {
          matchesB.push({
            id: 'id_' + teamB[x].id + '_' + teamB[y].id + '_' + Date.now,
            group: teamB[x].group,
            teams: [teamB[x], teamB[y]],
            score: [0, 0],
            name: teamB[x].clubName + ' vs ' + teamB[y].clubName,
            isCompleted: false,
          });
        }
      }
      //matches.push(...matchesA);
      //matches.push(...matchesB);
      matches = matchesA
        .map((element, index) => [element, matchesB[index]])
        .flat();
    }

    return matches;
  };

  const getMatchWinner = (match: Match): Team => {
    if (match.score[0] > match.score[1]) {
      return match.teams[0];
    } else {
      return match.teams[1];
    }
  };

  const createNewMatch = (homeTeam: Team, guestTeam: Team) => {
    const match: Match = {
      id: homeTeam.id * 1000 + guestTeam.id,
      group: 0,
      teams: [homeTeam, guestTeam],
      score: [0, 0],
      name: homeTeam.clubName + ' vs ' + guestTeam.clubName,
      isCompleted: false,
    };
    return match;
  };

  return {
    randomizeTeams,
    createMatches,
    getMatchWinner,
    startPhase,
    createNewMatch,
  };
};

export default useCreator;
