import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import data from '../assets/data/players.json';
import PlayerList from '../components/PlayerList/PlayerList';
import Container from '../components/UI/Container';
import useCreator from '../hooks/useCreator';
import AppContext from '../store/AppContext';
import {Player} from '../types/Player';
import clubData from '../assets/data/teams.json';
import {ClubListResponse} from '../types/ClubListResponse';

import PlayerListResponse from '../types/PlayerListResponse';
import {Club} from '../types/Club';
import CustomButton from '../components/CustomButton';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabParams} from '../types/BottomTabParams';
import {useNavigation} from '@react-navigation/native';
import {basicColors} from '../assets/colors';

type PlayersNavigationProps = BottomTabNavigationProp<MainTabParams, 'Players'>;

const Players = () => {
  const navigation = useNavigation<PlayersNavigationProps>();
  const [players, setPlayers] = useState<Player[]>([]);

  const clubResponse: ClubListResponse = clubData;
  const clubs: Club[] = clubResponse.clubs;

  const {randomizeTeams, createMatches} = useCreator();

  const playerList: PlayerListResponse = data;

  useEffect(() => {
    setPlayers(playerList.players);
  }, [playerList.players]);

  const toggleHandler = (state: boolean, id: number) => {
    const newArray: Player[] = playerList.players.map(player => {
      if (player.id === id) {
        player.clicked = state;
      }
      return player;
    });
    setPlayers(newArray);
  };

  const appContext = useContext(AppContext);

  const onEliminationTournamentCreate = () => {
    const newPlayers = players.filter(x => x.clicked === true);

    appContext.onResetContext();
    appContext.onUpdatePlayers(newPlayers);
    const randomTeams = randomizeTeams(clubs, newPlayers, 'Elimination');
    const matches = createMatches(randomTeams, 'Elimination');
    //console.log(matches);
    appContext.onUpdateTeams(randomTeams);
    appContext.onUpdateMatches(matches);
    appContext.updateTournamentType('Elimination');
    navigation.navigate('MatchScreen');
  };

  const onRotationTournamentCreate = () => {
    const newPlayers = players.filter(x => x.clicked === true);

    appContext.onResetContext();
    appContext.onUpdatePlayers(newPlayers);
    const randomTeams = randomizeTeams(clubs, newPlayers, 'Rotation');
    const matches = createMatches(randomTeams, 'Rotation');
    //console.log(matches);
    appContext.onUpdateTeams(randomTeams);
    appContext.onUpdateMatches(matches);
    appContext.updateTournamentType('Rotation');
    navigation.navigate('MatchScreen');
  };

  return (
    <Container>
      <CustomButton
        title="Create Rotation Tournament"
        containerStyle={{marginBottom: 10, alignSelf: 'center'}}
        buttonStyle={{borderRadius: 10}}
        enabled={
          players.filter(player => player.clicked === true).length === 6 ||
          players.filter(player => player.clicked === true).length === 12 ||
          players.filter(player => player.clicked === true).length === 8 ||
          players.filter(player => player.clicked === true).length === 16
            ? true
            : false
        }
        onPress={onRotationTournamentCreate}
      />
      <CustomButton
        title="Create Elimination Tournament"
        containerStyle={{marginBottom: 10, alignSelf: 'center'}}
        colors={[basicColors.lightOrange, basicColors.lightRed]}
        buttonStyle={{borderRadius: 10}}
        enabled={
          players.filter(player => player.clicked === true).length === 8 ||
          players.filter(player => player.clicked === true).length === 16
            ? true
            : false
        }
        onPress={onEliminationTournamentCreate}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <PlayerList players={players} togglePlayer={toggleHandler} />
      </ScrollView>
    </Container>
  );
};

export default Players;
