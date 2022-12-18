import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

const style = StyleSheet.create({
  basicCard: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 3,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {height: 2, width: 3},
  },
});

interface CardProps {
  styles?: ViewStyle | ViewStyle[];
  children: ReactNode | ReactNode[];
}

const Card = ({children, styles}: CardProps) => {
  return <View style={[style.basicCard, styles]}>{children}</View>;
};

export default Card;
