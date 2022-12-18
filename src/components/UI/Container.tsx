import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface ContainerProps {
  style?: ViewStyle | ViewStyle[];
  children: ReactNode | ReactNode[];
}

const Container = ({children, style}: ContainerProps) => {
  return <View style={[styles.basicContainer, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  basicContainer: {
    paddingTop: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
});
