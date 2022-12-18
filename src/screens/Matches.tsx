import React, {useContext} from 'react';
import AppContext from '../store/AppContext';
import Container from '../components/UI/Container';
import MatchItem from '../components/MatchItem/MatchItem';
import NoContent from '../components/NoContent/NoContent';
import {ScrollView} from 'react-native-gesture-handler';

const Matches = () => {
  const context = useContext(AppContext);
  const {matches} = context;

  return (
    <Container>
      <ScrollView>
        {matches.length > 0 ? (
          matches.map(item => <MatchItem key={item.id} match={item} />)
        ) : (
          <NoContent />
        )}
      </ScrollView>
    </Container>
  );
};

export default Matches;
