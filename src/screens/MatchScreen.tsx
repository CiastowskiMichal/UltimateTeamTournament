import React, {useCallback, useContext, useEffect, useRef} from 'react';
import AppContext from '../store/AppContext';
import {ScrollView, Dimensions} from 'react-native';
import Container from '../components/UI/Container';
import NoContent from '../components/NoContent/NoContent';
import MatchListElement from '../components/MatchListElement';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParams} from '../types/BottomTabParams';
import useCreator from '../hooks/useCreator';

type MatchScreenNavigationProp = BottomTabNavigationProp<
  MainTabParams,
  'MatchScreen'
>;

const MatchScreen = () => {
  const navigation = useNavigation<MatchScreenNavigationProp>();
  const {
    matches,
    matchNumber,
    halfFinalTeams,
    finalTeams,
    onAddNewMatches,
    phase,
    tournamentType,
    chosenTeams,
    onHalfFinalTeamsUpdate,
  } = useContext(AppContext);
  const {createNewMatch} = useCreator();

  const scrollViewRef = useRef<ScrollView>(null);
  const {width} = Dimensions.get('screen');

  const updateScrollRef = useCallback(() => {
    scrollViewRef.current?.scrollTo({
      x: matchNumber * width,
      animated: true,
    });
  }, [matchNumber, width]);
  useFocusEffect(() => {
    updateScrollRef();
  });

  useEffect(() => {
    if (matchNumber === matches.length) {
      switch (phase) {
        case 1 as number:
          //update here matches after group phase:
          if (tournamentType === 'Elimination') {
            //elimination group phase
            onAddNewMatches([
              createNewMatch(halfFinalTeams[0], halfFinalTeams[1]),
              createNewMatch(halfFinalTeams[2], halfFinalTeams[3]),
            ]);
          } else {
            //rotation group phase
            const teamsA = chosenTeams
              .filter(a => a.group === 0)
              .sort((a, b) => b.points - a.points || b.goals - a.goals);
            const teamsB = chosenTeams
              .filter(a => a.group === 1)
              .sort((a, b) => b.points - a.points || b.goals - a.goals);
            console.log(teamsA);
            //add to half final teams
            onHalfFinalTeamsUpdate(teamsA[0]);
            onHalfFinalTeamsUpdate(teamsB[1]);
            onHalfFinalTeamsUpdate(teamsA[1]);
            onHalfFinalTeamsUpdate(teamsB[0]);

            //create matches with half final teams
            onAddNewMatches([
              createNewMatch(teamsA[0], teamsB[1]),
              createNewMatch(teamsA[1], teamsB[0]),
            ]);
          }
          break;
        case 2 as number:
          //update after halffinals
          onAddNewMatches([createNewMatch(finalTeams[0], finalTeams[1])]);
          break;
        default:
          break;
      }
    }
  }, [matchNumber, matches]);

  const onNavigationHandler = () => {
    navigation.navigate('Matches');
  };
  const onEndTournamentHandler = () => {
    navigation.navigate('PhaseScreen');
  };

  const swipeRight = () => {
    scrollViewRef.current?.scrollTo({
      x: (matchNumber + 1) * width,
      animated: true,
    });
  };

  if (!matches.length) {
    return (
      <Container>
        <NoContent />
      </Container>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      snapToInterval={width}
      scrollEnabled={false}>
      {phase < 3 &&
        matches.map(match => (
          <MatchListElement
            key={match.id}
            actualMatch={match}
            onSwipeRight={swipeRight}
            onNavigation={onNavigationHandler}
            onEndTourament={onEndTournamentHandler}
          />
        ))}
    </ScrollView>
  );
};

export default MatchScreen;
