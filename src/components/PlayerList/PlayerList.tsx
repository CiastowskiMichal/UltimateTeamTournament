import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Player} from '../../types/Player';
import Card from '../UI/Card/Card';
import PressableContainer from '../UI/PressableContainer/PressableContainer';

interface PlayerListProps {
  players: Player[];
  togglePlayer: (state: boolean, id: number) => void;
}

const PlayerList = ({players, togglePlayer}: PlayerListProps) => {
  return (
    <View>
      {players.map(player => {
        return (
          <PressableContainer
            key={player.id}
            onPress={() => togglePlayer(!player.clicked, player.id)}>
            <Card
              styles={[
                styles.playerCard,
                player.clicked ? styles.checked : styles.unchecked,
              ]}>
              <Text
                style={
                  player.clicked ? styles.textChecked : styles.textUnchecked
                }>
                {player.name}
              </Text>
            </Card>
          </PressableContainer>
        );
      })}
    </View>
  );
};

export default PlayerList;

const styles = StyleSheet.create({
  playerCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'seagreen',
  },
  unchecked: {
    backgroundColor: 'white',
  },
  textChecked: {
    color: '#FFFFFF',
  },
  textUnchecked: {
    color: '#000000',
  },
});
