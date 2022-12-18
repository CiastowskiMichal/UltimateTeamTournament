import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {basicColors} from '../assets/colors';
import teamImages from '../assets/teamlogos';
import useCreator from '../hooks/useCreator';
import AppContext from '../store/AppContext';
import {Match} from '../types/Match';
import CustomButton from './CustomButton';
import Card from './UI/Card/Card';
import Container from './UI/Container';

interface MatchListElementProps {
  actualMatch: Match;
  onSwipeRight: () => void;
  onNavigation: () => void;
  onEndTourament: () => void;
}

const MatchListElement = ({
  actualMatch,
  onSwipeRight,
  onNavigation,
  onEndTourament,
}: MatchListElementProps) => {
  const {
    matches,
    matchNumber,
    onUpdateMatch,
    onTeamUpdate,
    chosenTeams,
    onHalfFinalTeamsUpdate,
    onFinalTeamsUpdate,
    onFinalistUpdate,
    onMatchNumberUpdate,
    phase,
    onUpdatePhase,
    tournamentType,
  } = useContext(AppContext);

  const {} = useCreator();

  const [match, setMatch] = useState<Match>(actualMatch);

  const {width} = Dimensions.get('screen');

  const onNextMatch = () => {
    const homeTeam = chosenTeams.find(({id}) => id === match.teams[0].id);
    const guestTeam = chosenTeams.find(({id}) => id === match.teams[1].id);

    if (!homeTeam || !guestTeam) {
      return;
    }
    homeTeam.goals = homeTeam.goals + match.score[0];
    guestTeam.goals = guestTeam.goals + match.score[1];
    if (match.score[0] > match.score[1]) {
      homeTeam.wins = homeTeam.wins + 1;
      homeTeam.points = homeTeam.points + 3;
      guestTeam.loses = guestTeam.loses + 1;
    } else if (match.score[0] < match.score[1]) {
      guestTeam.wins = guestTeam.wins + 1;
      guestTeam.points = guestTeam.points + 3;
      homeTeam.loses = homeTeam.loses + 1;
    } else {
      guestTeam.ties = guestTeam.ties + 1;
      homeTeam.ties = homeTeam.ties + 1;
      guestTeam.points = guestTeam.points + 1;
      homeTeam.points = homeTeam.points + 1;
    }
    onTeamUpdate(homeTeam);
    onTeamUpdate(guestTeam);

    onUpdateMatch(match);
    onMatchNumberUpdate();

    switch (phase) {
      case 0:
        if (tournamentType === 'Elimination') {
          if (match.score[0] > match.score[1]) {
            onHalfFinalTeamsUpdate(homeTeam);
          } else {
            onHalfFinalTeamsUpdate(guestTeam);
          }
        }

        break;
      case 1:
        if (match.score[0] > match.score[1]) {
          onFinalTeamsUpdate(homeTeam);
        } else {
          onFinalTeamsUpdate(guestTeam);
        }
        break;
      case 2:
        if (match.score[0] > match.score[1]) {
          onFinalistUpdate(homeTeam);
        } else {
          onFinalistUpdate(guestTeam);
        }
    }

    if (matchNumber === matches.length - 1) {
      if (phase < 2) {
        onNavigation();
        onUpdatePhase();
      } else {
        onEndTourament();
        onUpdatePhase();
      }
    }
  };

  const onScoreModify = (type: boolean, teamId: number) => {
    const newMatch = {...match};

    if (type) {
      newMatch.score[teamId] = newMatch.score[teamId] + 1;
    } else {
      newMatch.score[teamId] = newMatch.score[teamId] - 1;
    }
    newMatch.isCompleted = true;
    setMatch(newMatch);
  };

  return (
    <Container key={match.id} style={{width}}>
      <Card>
        <View style={[style.teamsView]}>
          <View style={[style.singleTeam]}>
            <Image
              style={style.imageBasic}
              source={teamImages[match.teams[0].id - 1]}
            />
            <Text style={style.clubName}>{match.teams[0].clubName}</Text>
            {match.teams[0].playerName.length > 1 ? (
              <Text>
                {match.teams[0].playerName[0]}, {match.teams[0].playerName[1]}
              </Text>
            ) : (
              <Text> {match.teams[0].playerName[0]} </Text>
            )}
            <Text style={style.scoreItem}>{match.score[0]}</Text>
            <CustomButton
              title={'Add Score'}
              enabled={true}
              onPress={() => {
                onScoreModify(true, 0);
              }}
              containerStyle={style.buttonContainer}
              buttonStyle={style.addScoreButton}
            />
            <CustomButton
              title={'Remove Score'}
              enabled={match.score[0] > 0 ? true : false}
              onPress={() => {
                onScoreModify(false, 0);
              }}
              containerStyle={style.buttonContainer}
              buttonStyle={style.deleteScoreButton}
            />
          </View>
          <Text style={style.vsItem}>:</Text>
          <View style={[style.singleTeam]}>
            <Image
              style={style.imageBasic}
              source={teamImages[match.teams[1].id - 1]}
            />
            <Text style={style.clubName}>{match.teams[1].clubName}</Text>
            {match.teams[1].playerName.length > 1 ? (
              <Text>
                {match.teams[1].playerName[0]}, {match.teams[1].playerName[1]}
              </Text>
            ) : (
              <Text> {match.teams[1].playerName[0]} </Text>
            )}
            <Text style={style.scoreItem}>{match.score[1]}</Text>
            <CustomButton
              title={'Add Score'}
              enabled={true}
              onPress={() => {
                onScoreModify(true, 1);
              }}
              containerStyle={style.buttonContainer}
              buttonStyle={style.addScoreButton}
            />
            <CustomButton
              title={'Remove Score'}
              enabled={match.score[1] > 0 ? true : false}
              onPress={() => {
                onScoreModify(false, 1);
              }}
              containerStyle={style.buttonContainer}
              buttonStyle={style.deleteScoreButton}
            />
          </View>
        </View>

        <CustomButton
          onPress={() => {
            onSwipeRight();
            onNextMatch();
          }}
          title="Next Match"
          enabled={
            (match.score[0] > 0 || match.score[1] > 0) &&
            match.score[0] !== match.score[1]
              ? true
              : false
          }
          containerStyle={style.buttonContainer}
          buttonStyle={style.nextMatchButton}
        />
      </Card>
    </Container>
  );
};
export default MatchListElement;

const style = StyleSheet.create({
  imageBasic: {
    height: 250,
    width: 250,
    marginBottom: 30,
  },
  teamsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 60,
    alignItems: 'center',
  },
  singleTeam: {
    alignItems: 'center',
    width: '48%',
  },
  vsItem: {
    fontSize: 60,
    alignContent: 'center',
    width: '4%',
  },
  scoreItem: {
    fontSize: 150,
  },
  deleteScoreButton: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: 180,
  },
  addScoreButton: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 180,
  },
  nextMatchButton: {
    borderRadius: 15,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  clubName: {
    fontSize: 45,
    height: 120,
    width: '90%',
    textAlign: 'center',
  },
});
