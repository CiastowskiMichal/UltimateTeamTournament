import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faTrophy} from '@fortawesome/free-solid-svg-icons/faTrophy';
import {faRocket} from '@fortawesome/free-solid-svg-icons/faRocket';
import {faSoccerBall} from '@fortawesome/free-solid-svg-icons/faSoccerBall';
import {faGamepad} from '@fortawesome/free-solid-svg-icons/faGamepad';
import {faBullseye} from '@fortawesome/free-solid-svg-icons/faBullseye';
import {basicColors} from '../../assets/colors';

interface Props {
  routeName: string;
  focused: boolean;
}

const BottomTabButton = ({routeName, focused}: Props) => {
  let iconName = faRocket;
  switch (routeName) {
    case 'Players':
      iconName = faRocket;
      break;

    case 'MatchScreen':
      iconName = faGamepad;
      break;

    case 'Score':
      iconName = faTrophy;
      break;

    case 'Matches':
      iconName = faBullseye;
      break;

    case 'PhaseScreen':
      iconName = faSoccerBall;
      break;

    case 'Settings':
      iconName = faCogs;
      break;

    default:
      break;
  }

  return (
    <View>
      <FontAwesomeIcon
        icon={iconName}
        size={36}
        color={focused ? basicColors.activeGreen : basicColors.monochrome8}
        style={focused ? styles.selected : {}}
      />
    </View>
  );
};
export default BottomTabButton;

const styles = StyleSheet.create({
  selected: {
    shadowColor: basicColors.activeGreen,
    shadowRadius: 3,
    shadowOpacity: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
