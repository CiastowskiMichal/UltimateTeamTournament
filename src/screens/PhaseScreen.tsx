import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NoContent from '../components/NoContent/NoContent';
import Container from '../components/UI/Container';
import AppContext from '../store/AppContext';

import PaginationDots from '../components/UI/PaginationDots';
import PhaseItem from '../components/PhaseItem/PhaseItem';
import {Team} from '../types/Team';
import Card from '../components/UI/Card/Card';
import {basicColors} from '../assets/colors';
import teamImages from '../assets/teamlogos';
import GradientText from '../components/UI/GradientText';

const PhaseScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    chosenTeams,
    halfFinalTeams,
    finalTeams,
    finalist,
    phase,
    tournamentType,
  } = useContext(AppContext);
  const {width} = useMemo(() => Dimensions.get('screen'), []);
  const [paginationValue, setPaginationValue] = useState(0);

  useEffect(() => {
    console.log('phase:' + phase);
    scrollViewRef.current?.scrollTo({x: phase * width, animated: true});
  }, [phase]);

  const onScrollHandler = (event: any) => {
    const currentWidth: number = event.nativeEvent.contentOffset.x;
    const screenWidth: number = width;
    const currentPage: number = currentWidth / screenWidth;
    setPaginationValue(currentPage);
  };

  const onClickPaginationHandler = (index: number) => {
    scrollViewRef.current?.scrollTo({x: index * width, animated: true});
  };

  const groupList = (teams: Team[]) => {
    const element: ReactNode[] = [];
    if (tournamentType === 'Rotation') {
      for (let i = 0; i < 2; i++) {
        element.push(
          <View key={1 + i} style={{flex: 1}}>
            {teams
              .filter(team => team.group === i)
              .map(team => (
                <PhaseItem key={team.id} team={team} flexStyle={{flex: 1}} />
              ))}
          </View>,
        );
        if (i < 3) {
          element.push(
            <View
              key={5 + i}
              style={{backgroundColor: 'transparent', height: 10}}
            />,
          );
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        element.push(
          <View key={1 + i} style={{flex: 1}}>
            {teams
              .filter(team => team.group === i)
              .map(team => (
                <PhaseItem key={team.id} team={team} flexStyle={{flex: 1}} />
              ))}
          </View>,
        );
        if (i < 3) {
          element.push(
            <View
              key={5 + i}
              style={{backgroundColor: 'transparent', height: 10}}
            />,
          );
        }
      }
    }

    return element;
  };

  const halfGroupList = (teams: Team[]) => {
    const element: ReactNode[] = [];
    if (tournamentType === 'Rotation') {
      for (let i = 0; i < 2; i++) {
        element.push(<View key={1 + i} style={{flex: 1}} />);
        element.push(
          <View key={5 + i} style={{flex: 2}}>
            {teams
              .filter(team => team.group === i)
              .map(team => (
                <PhaseItem key={team.id} team={team} flexStyle={{flex: 1}} />
              ))}
          </View>,
        );
        element.push(<View key={10 + i} style={{flex: 1}} />);
        if (i < 3) {
          element.push(
            <View
              key={15 + i}
              style={{backgroundColor: 'transparent', height: 10}}
            />,
          );
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        element.push(<View key={1 + i} style={{flex: 1}} />);
        element.push(
          <View key={5 + i} style={{flex: 2}}>
            {teams
              .filter(team => team.group === i)
              .map(team => (
                <PhaseItem key={team.id} team={team} flexStyle={{flex: 1}} />
              ))}
          </View>,
        );
        element.push(<View key={10 + i} style={{flex: 1}} />);
        if (i < 3) {
          element.push(
            <View
              key={15 + i}
              style={{backgroundColor: 'transparent', height: 10}}
            />,
          );
        }
      }
    }

    return element;
  };

  const finalGroupList = (teams: Team[]) => {
    const element: ReactNode[] = [];
    for (let i = 0; i < 2; i++) {
      element.push(<View key={1 + i} style={{flex: 1}} />);
      element.push(
        <View key={5 + i} style={{flex: 1}}>
          <PhaseItem key={teams[i].id} team={teams[i]} flexStyle={{flex: 1}} />
        </View>,
      );
      element.push(<View key={10 + i} style={{flex: 1}} />);
      if (i < 0) {
        element.push(
          <View
            key={15 + i}
            style={{backgroundColor: 'transparent', height: 10}}
          />,
        );
      }
    }
    return element;
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        snapToInterval={width}
        onScroll={onScrollHandler}
        scrollEventThrottle={8}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}>
        <Container style={{width}}>
          {chosenTeams.length > 0 ? groupList(chosenTeams) : <NoContent />}
        </Container>
        <Container style={{width}}>
          {halfFinalTeams.length === 4 ? (
            halfGroupList(halfFinalTeams)
          ) : (
            <NoContent />
          )}
        </Container>
        <Container style={{width}}>
          {finalTeams.length === 2 ? finalGroupList(finalTeams) : <NoContent />}
        </Container>
        <Container style={{width}}>
          {finalist !== undefined ? (
            <View style={{flex: 1}}>
              <Card
                styles={{
                  alignItems: 'center',
                  backgroundColor: basicColors.monochrome5,
                }}>
                <GradientText
                  content="WINNER"
                  colors={[basicColors.lightOrange, basicColors.lightRed]}
                  textStyle={{fontSize: 50, fontWeight: 'bold'}}
                />
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      flex: 3,
                      paddingVertical: 30,
                    }}>
                    <Image
                      style={{height: 250, width: 250}}
                      key={finalist.id}
                      source={teamImages[finalist.id - 1]}
                    />
                    <Text
                      style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: basicColors.monochrome3,
                        paddingVertical: 24,
                      }}>
                      {finalist.clubName}
                    </Text>
                    {finalist.playerName.length > 1 ? (
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: basicColors.monochrome1,
                        }}>
                        {finalist.playerName[0]}, {finalist.playerName[1]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: basicColors.monochrome1,
                        }}>
                        {finalist.playerName}
                      </Text>
                    )}
                  </View>
                  <View style={{flex: 2}}>
                    <Image
                      style={[styles.shadow, {transform: [{rotateZ: '15deg'}]}]}
                      source={require('../assets/pictures/world-cup.png')}
                    />
                  </View>
                </View>
              </Card>
            </View>
          ) : (
            <NoContent />
          )}
        </Container>
      </ScrollView>
      <PaginationDots
        onClickPagination={onClickPaginationHandler}
        currentDot={paginationValue}
      />
    </>
  );
};

export default PhaseScreen;

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: basicColors.lightOrange,
        shadowOpacity: 1,
        shadowRadius: 10,
      },
    }),
  },
});
