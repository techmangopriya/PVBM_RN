/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import CreateNewPassword from './screens/CreateNewPassword';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AccountCreatedPopUpScreen from './screens/AccountCreatedPopUpScreen';
import CheckMailPopUpScreen from './screens/CheckMailPopUpScreen';
import WebPageScreen from './screens/WebPageScreen';
import HomeScreen from './screens/HomeScreen';

type RootStackParamList = {
  login: undefined;
  resetPassword: undefined;
  createNewPassword: undefined;
  createAccount: undefined;
  accountCreatedPopUp: undefined;
  checkMailPopUp: undefined;
  webPage: {url: string};
  homeScreen: undefined;
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const {width, height} = Dimensions.get('screen');

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="resetPassword"
            component={ResetPasswordScreen}
            options={{title: 'Reset Password'}}
          />
          <Stack.Screen
            name="createNewPassword"
            component={CreateNewPassword}
            options={{title: 'Create New Password'}}
          />
          <Stack.Screen
            name="createAccount"
            component={CreateAccountScreen}
            options={{title: 'Create Account'}}
          />
          <Stack.Screen
            name="accountCreatedPopUp"
            component={AccountCreatedPopUpScreen}
            options={{
              presentation: 'fullScreenModal',
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="checkMailPopUp"
            component={CheckMailPopUpScreen}
            options={{
              presentation: 'fullScreenModal',
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen name="webPage" component={WebPageScreen} options={{ title: ''}} />
          <Stack.Screen name='homeScreen' component={HomeScreen} options={{ title: ''}} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
