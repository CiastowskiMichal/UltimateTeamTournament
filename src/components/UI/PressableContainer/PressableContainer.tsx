import React, {ReactNode} from 'react';
import {Pressable} from 'react-native';

interface PressableContainerProps {
  children: ReactNode | ReactNode[];
  onPress: () => void;
}

const PressableContainer = ({children, onPress}: PressableContainerProps) => {
  return (
    <Pressable pointerEvents="auto" onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default PressableContainer;
