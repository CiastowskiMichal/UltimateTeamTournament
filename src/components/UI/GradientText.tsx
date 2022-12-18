import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

interface GradientTextProps {
  content: string;
  colors: string[];
  textStyle: TextStyle;
}

const GradientText = ({content, colors, textStyle}: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text style={textStyle}>{content}</Text>}>
      <LinearGradient
        style={{alignSelf: 'flex-start'}}
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={[textStyle, {opacity: 0}]}>{content}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
