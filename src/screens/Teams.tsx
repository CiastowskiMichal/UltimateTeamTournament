import React from 'react';
import {Image, StyleSheet} from 'react-native';
import data from '../assets/data/teams.json';
import teamImages from '../assets/teamlogos';
import {ClubListResponse} from '..//types/ClubListResponse';
import {ScrollView} from 'react-native';
import Card from '../components/UI/Card/Card';
import Container from '../components/UI/Container';

const Teams = () => {
  const clubResponse: ClubListResponse = data;

  return (
    <Container>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {clubResponse.clubs.map((club, index) => {
          return (
            <Card key={club.id}>
              <Image
                style={style.imageBasic}
                key={club.id}
                source={teamImages[index]}
              />
            </Card>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default Teams;

const style = StyleSheet.create({
  imageBasic: {
    height: 80,
    width: 80,
  },
});
