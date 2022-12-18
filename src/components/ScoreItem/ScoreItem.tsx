import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Team} from '../../types/Team';
import teamImages from '../../assets/teamlogos';
import Card from '../UI/Card/Card';
import {basicColors} from '../../assets/colors';

interface ScoreItemProps {
  team: Team;
}

const ScoreItem = ({team}: ScoreItemProps) => {
  const {id, clubName, loses, ties, playerName, wins, goals, points} = team;
  return (
    <Card styles={style.scoreItem}>
      <View style={style.imageAndTitle}>
        <Image style={style.imageBasic} key={id} source={teamImages[id - 1]} />
        <View>
          <Text style={style.clubName}>{clubName}</Text>
          {playerName.length > 1 ? (
            <Text>
              {playerName[0]}, {playerName[1]}
            </Text>
          ) : (
            <Text>{playerName[0]}</Text>
          )}
        </View>
      </View>
      <View style={style.fullRecordContainer}>
        <View style={style.recordContainer}>
          <Text style={style.recordLabel}>Wins</Text>
          <Text style={style.records}>{wins}</Text>
        </View>
        <View style={style.recordContainer}>
          <Text style={style.recordLabel}>Ties</Text>
          <Text style={style.records}>{ties}</Text>
        </View>
        <View style={style.recordContainer}>
          <Text style={style.recordLabel}>Loses</Text>
          <Text style={style.records}>{loses}</Text>
        </View>
        <View style={style.recordContainer}>
          <Text style={style.recordLabel}>Points</Text>
          <Text style={style.records}>{points}</Text>
        </View>
        <View style={style.recordContainer}>
          <Text style={style.recordLabel}>Goals</Text>
          <Text style={style.records}>{goals}</Text>
        </View>
      </View>
    </Card>
  );
};

export default ScoreItem;

const style = StyleSheet.create({
  imageBasic: {
    height: 80,
    width: 80,
    marginRight: 50,
  },
  scoreItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: basicColors.monochrome5,
  },
  clubName: {
    fontSize: 20,
    color: basicColors.monochrome2,
    fontWeight: 'bold',
  },
  imageAndTitle: {
    display: 'flex',
    flexDirection: 'row',
    width: '55%',
    alignItems: 'center',
  },
  records: {
    fontSize: 30,
    fontWeight: 'bold',
    color: basicColors.monochrome4,
  },
  recordLabel: {
    fontSize: 12,
    color: basicColors.monochrome4,
  },
  recordContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fullRecordContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
