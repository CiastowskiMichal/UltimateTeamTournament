import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Card from '../UI/Card/Card';

const NoContent = () => {
  return (
    <Card styles={style.noContent}>
      <Text style={style.noContentText}>No matches</Text>
    </Card>
  );
};

export default NoContent;

const style = StyleSheet.create({
  noContent: {
    alignItems: 'center',
  },
  noContentText: {
    fontSize: 40,
    color: 'seagreen',
  },
});
