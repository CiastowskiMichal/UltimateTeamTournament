import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import {basicColors} from '../../assets/colors';

interface PaginationDotsProps {
  currentDot: number;
  onClickPagination: (index: number) => void;
}

const PaginationDots = ({
  currentDot,
  onClickPagination,
}: PaginationDotsProps) => {
  const dotList: number[] = [0, 1, 2, 3];
  const roundedNumber: number = Math.round(currentDot);
  const onPressHandler = (index: number) => {
    onClickPagination(index);
  };
  return (
    <View style={styles.pagination}>
      {dotList.map(dot => {
        return dot === roundedNumber ? (
          <Pressable key={dot} onPress={() => onPressHandler(dot)}>
            <FontAwesomeIcon
              style={[styles.dots, styles.activeDot]}
              icon={faCircle}
              size={24}
              color={basicColors.activeGreen}
            />
          </Pressable>
        ) : (
          <Pressable key={dot} onPress={() => onPressHandler(dot)}>
            <FontAwesomeIcon
              style={styles.dots}
              icon={faCircle}
              size={24}
              color={basicColors.monochrome4}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  pagination: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  dots: {
    marginHorizontal: 5,
  },
  activeDot: {
    shadowColor: basicColors.activeGreen,
    shadowRadius: 5,
    shadowOpacity: 4,
    shadowOffset: [0, 0],
  },
});
