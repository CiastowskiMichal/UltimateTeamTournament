import React, {useContext} from 'react';
import {Button, Image, Text} from 'react-native';
import Card from '../components/UI/Card/Card';
import Container from '../components/UI/Container';
import AppContext from '../store/AppContext';

const Settings = () => {
  const {onResetContext} = useContext(AppContext);

  return (
    <Container>
      <Card styles={{alignItems: 'center'}}>
        <Button onPress={onResetContext} title="Reset Context" />
        <Text>Languages: TBD</Text>
      </Card>
    </Container>
  );
};

export default Settings;
