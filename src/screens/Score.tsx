import React, {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import NoContent from '../components/NoContent/NoContent';
import ScoreItem from '../components/ScoreItem/ScoreItem';
import Container from '../components/UI/Container';
import AppContext from '../store/AppContext';
import {basicColors} from '../assets/colors';

const Score = () => {
  const {chosenTeams, tournamentType} = useContext(AppContext);
  console.log('Score Screen');
  console.log(chosenTeams);
  console.log(tournamentType);
  console.log(tournamentType === 'Rotation');

  return (
    <Container>
      {chosenTeams.length > 0 ? (
        tournamentType === 'Rotation' ? (
          <View>
            <Text
              style={{
                color: basicColors.monochrome7,
                fontSize: 24,
                alignSelf: 'center',
                fontWeight: 'bold',
                marginVertical: 12,
              }}>
              GROUP A
            </Text>
            <FlatList
              data={chosenTeams
                .filter(x => x.group === 0)
                .sort((a, b) => b.points - a.points || b.goals - a.goals)}
              renderItem={({item}) => <ScoreItem team={item} />}
            />
            <Text
              style={{
                color: basicColors.monochrome7,
                fontSize: 24,
                alignSelf: 'center',
                fontWeight: 'bold',
                marginVertical: 12,
              }}>
              GROUP B
            </Text>
            <FlatList
              data={chosenTeams
                .filter(x => x.group === 1)
                .sort((a, b) => b.points - a.points || b.goals - a.goals)}
              renderItem={({item}) => <ScoreItem team={item} />}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={chosenTeams}
              renderItem={({item}) => <ScoreItem team={item} />}
            />
          </View>
        )
      ) : (
        <NoContent />
      )}
    </Container>
  );
};

export default Score;
