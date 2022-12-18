import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Match} from '../../types/Match';
import teamImages from '../../assets/teamlogos';
import Card from '../UI/Card/Card';
import {basicColors} from '../../assets/colors';

interface Props {
  match: Match;
}

const MatchItem = ({match}: Props) => {
  const {teams, isCompleted, score} = match;
  const homeTeam = teams[0];
  const guestTeam = teams[1];

  return (
    <Card styles={isCompleted ? style.matchCompleted : style.matchNotcompleted}>
      <View style={style.matchContainer}>
        <Image style={style.imageBasic} source={teamImages[homeTeam.id - 1]} />

        <View style={style.scoreContainer}>
          {/* <Text>{match.group === 0 ? 'Group A' : 'Group B'}</Text> */}
          <Text style={style.clubName}>{match.name}</Text>
          {match.teams[0].playerName.length > 1 ? (
            <Text style={style.playerName}>
              {match.teams[0].playerName[0]},{match.teams[0].playerName[1]} vs{' '}
              {match.teams[1].playerName[0]},{match.teams[1].playerName[1]}
            </Text>
          ) : (
            <Text style={style.playerName}>
              {match.teams[0].playerName} vs {match.teams[1].playerName}
            </Text>
          )}
          {isCompleted && (
            <Text style={style.score}>
              {score[0]} : {score[1]}
            </Text>
          )}
        </View>
        <Image style={style.imageBasic} source={teamImages[guestTeam.id - 1]} />
      </View>
    </Card>
  );
};
export default MatchItem;

const style = StyleSheet.create({
  imageBasic: {
    height: 80,
    width: 80,
  },
  matchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    color: basicColors.monochrome2,
  },
  matchCompleted: {
    backgroundColor: basicColors.activeGreen,
  },
  matchNotcompleted: {
    backgroundColor: basicColors.monochrome6,
  },
  score: {
    fontSize: 30,
    color: basicColors.monochrome2,
    fontWeight: 'bold',
  },
  scoreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  clubName: {
    fontWeight: 'bold',
    color: basicColors.monochrome2,
    fontSize: 16,
  },
  playerName: {
    color: basicColors.monochrome3,
  },
});
