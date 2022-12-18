import React from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {basicColors} from '../assets/colors';

interface CustomButtonProps {
  title: string;
  enabled: boolean;
  onPress: () => void;
  containerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  colors?: string[];
}

const CustomButton = ({
  title,
  enabled,
  onPress,
  containerStyle,
  buttonStyle,
  colors,
}: CustomButtonProps) => {
  if (colors === undefined) {
    colors = [basicColors.palegreen, basicColors.seagreen];
  }
  return (
    <Pressable disabled={!enabled} onPress={onPress} style={containerStyle}>
      {enabled ? (
        <LinearGradient
          style={[buttonStyle]}
          colors={[colors[0], colors[1]]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
          <Text style={[styles.enabledText, styles.padding]}>{title}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.disabledBackground, buttonStyle]}>
          <Text style={[styles.disabledText, styles.padding]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  disabledBackground: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
  },
  enabledText: {
    color: 'white',
    fontSize: 20,
  },
  disabledText: {
    color: 'darkgray',
    fontSize: 20,
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'center',
  },
});
