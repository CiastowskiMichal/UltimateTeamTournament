/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Players from './src/screens/Players';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppContextProvider from './src/store/AppContextProvider';
import Score from './src/screens/Score';
import Matches from './src/screens/Matches';
import MatchScreen from './src/screens/MatchScreen';
import Settings from './src/screens/Settings';
import BottomTabButton from './src/components/UI/BottomTabButton';
import PhaseScreen from './src/screens/PhaseScreen';
import GradientText from './src/components/UI/GradientText';
import {StatusBar, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {basicColors} from './src/assets/colors';
import {MainTabParams} from './src/types/BottomTabParams';

const App = () => {
  const Tab = createBottomTabNavigator<MainTabParams>();

  return (
    <AppContextProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer
        theme={{
          colors: {
            background: basicColors.monochrome1,
            card: basicColors.monochrome2,
          },
        }}>
        <Tab.Navigator
          initialRouteName="Players"
          screenOptions={({route}) => ({
            headerBackground: () => {
              return (
                <LinearGradient
                  colors={[basicColors.monochrome3, basicColors.monochrome3T]}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{height: 100}}
                />
              );
            },
            headerTitle: ({children}) => {
              return (
                <GradientText
                  content={children}
                  colors={[basicColors.palegreen, basicColors.seagreen]}
                  textStyle={styles.gradientText}
                />
              );
            },
            tabBarIcon: ({focused}) => {
              return (
                <BottomTabButton routeName={route.name} focused={focused} />
              );
            },
            // headerRight: () => {
            //   return (
            //     <Pressable
            //       onPress={() => {
            //         navigation.navigate('Settings');
            //       }}>
            //       <Icon name="cog" size={36} color="grey" />
            //     </Pressable>
            //   );
            // },
            tabBarActiveTintColor: basicColors.activeGreen,
            tabBarInactiveTintColor: basicColors.monochrome6,
            tabBarLabelPosition: 'below-icon',
            tabBarLabelStyle: {marginBottom: 5},
            tabBarStyle: {
              height: 90,
            },
          })}>
          {/* <Tab.Screen name="Teams" component={Teams} /> */}
          <Tab.Screen
            name="Players"
            component={Players}
            options={{title: 'Tournament Creator'}}
          />
          <Tab.Screen
            name="Score"
            component={Score}
            options={{title: 'Score'}}
          />
          <Tab.Screen
            name="PhaseScreen"
            component={PhaseScreen}
            options={{title: 'Phases'}}
          />
          <Tab.Screen
            name="Matches"
            component={Matches}
            options={{title: 'Matches'}}
          />
          {/* <Tab.Screen name="Test Screen" component={TestScreen} /> */}
          <Tab.Screen
            name="MatchScreen"
            component={MatchScreen}
            options={{title: 'Match'}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: 'Settings'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  gradientText: {
    fontSize: 35,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    width: 'auto',
  },
  appBackground: {
    backgroundColor: '#333',
  },
});
