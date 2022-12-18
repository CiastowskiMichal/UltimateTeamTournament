import React from 'react';
import {basicColors} from '../../assets/colors';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import teamImages from '../../assets/teamlogos';
import Card from '../UI/Card/Card';
import {Team} from '../../types/Team';

interface PhaseItemProps {
  team: Team;
  flexStyle: ViewStyle;
}

const PhaseItem = ({team, flexStyle}: PhaseItemProps) => {
  return (
    <Card styles={[style.scoreItem, flexStyle]}>
      <Image
        style={style.imageBasic}
        key={team.id}
        source={teamImages[team.id - 1]}
      />
      <View>
        <Text style={style.clubName}>{team.clubName}</Text>
        {team.playerName.length > 1 ? (
          <Text>
            {team.playerName[0]}, {team.playerName[1]}
          </Text>
        ) : (
          <Text> {team.playerName[0]} </Text>
        )}
      </View>
    </Card>
  );
};

export default PhaseItem;

const style = StyleSheet.create({
  imageBasic: {
    height: 80,
    width: 80,
    marginRight: 50,
  },
  clubName: {
    fontSize: 20,
    color: basicColors.monochrome2,
    fontWeight: 'bold',
  },
  scoreItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: basicColors.monochrome5,
  },
});
