import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: '#6200ee',
          background: '#1e1e2f',
          card: '#27273a',
          text: '#e0e0e0',
          border: '#444',
          notification: '#00bfff',
        },
      }}>
      <AppNavigator/>
    </NavigationContainer>
  );
}