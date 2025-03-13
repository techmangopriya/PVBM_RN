/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import CreateNewPassword from './screens/CreateNewPassword';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AccountCreatedPopUpScreen from './screens/AccountCreatedPopUpScreen';
import CheckMailPopUpScreen from './screens/CheckMailPopUpScreen';
import WebPageScreen from './screens/WebPageScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import FeedScreen from './screens/FeedScreen';
import OTPScreen from './screens/OTPScreen';
import PasswordCreatedPopUpScreen from './screens/PasswordCreatedPopUpScreen';
import EditPopUpScreen from './screens/EditPopUpScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import { constantImage } from './utils/images';
import AudioDetailScreen from './screens/AudioDetailScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';
import { LibraryResponseModel,Library } from './model/LibraryResponseModel';

type RootStackParamList = {
  login: undefined;
  resetPassword: undefined;
  createNewPassword: undefined;
  createAccount: undefined;
  accountCreatedPopUp: undefined;
  checkMailPopUp: undefined;
  webPage: {url: string; title?: string};
  homeScreen: { refresh: boolean } | undefined;
  editProfile: { name?: string; email?: string; mobileNo?: string; id?: string };
  otpEntry: undefined;
  passwordPopUp: undefined;
  editProfilePopup : undefined;
  audioDetail:{ item: Library };
  videoDetail: {item: Library};
};

export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('screen');

const BottomTabs: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let iconSource;
            switch (route.name) {
              case 'Library':
                iconSource = constantImage.libraryIcon;
                break;
              case 'Feed':
                iconSource = constantImage.feedIcon;
                break;
              case 'Profile':
                iconSource = constantImage.profileIcon;
                break;
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#8B5CF6' : 'gray',
                }}
                resizeMode="contain"
              />
            );
          },
          tabBarActiveTintColor: '#8B5CF6',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold'},
        })}>
        <Tab.Screen name="Library" component={HomeScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              headerShown: false,
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="resetPassword"
            component={ResetPasswordScreen}
            options={{
              title: 'Reset Password',
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="createNewPassword"
            component={CreateNewPassword}
            options={{
              title: 'Create New Password',
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="createAccount"
            component={CreateAccountScreen}
            options={{
              title: 'Create Account',
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="accountCreatedPopUp"
            component={AccountCreatedPopUpScreen}
            options={{
              presentation: 'fullScreenModal',
              title: '',
              headerShown: false,
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="checkMailPopUp"
            component={CheckMailPopUpScreen}
            options={{
              presentation: 'fullScreenModal',
              title: '',
              headerShown: false,
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="webPage"
            component={WebPageScreen}
            options={{title: '', headerBackTitle: '', headerTintColor: 'black'}}
          />
          <Stack.Screen
            name="homeScreen"
            component={BottomTabs}
            options={{
              headerShown: false,
              title: '',
              headerBackTitle: '',
              headerTintColor: 'black',
            }}
          />
          <Stack.Screen
            name="editProfile"
            component={EditProfileScreen}
            options={{title: 'Edit Profile'}}
          />
          <Stack.Screen
            name="otpEntry"
            component={OTPScreen}
            options={{title: 'Verify OTP'}}
          />
          <Stack.Screen
            name="passwordPopUp"
            component={PasswordCreatedPopUpScreen}
            options={{
              title: '',
              presentation: 'fullScreenModal',
              headerShown: false,
              headerBackTitle: '',
              headerTintColor: 'black'
            }}
          />

         <Stack.Screen
          name='editProfilePopup'
          component={EditPopUpScreen}
          options={{
            title: "",
            presentation: 'fullScreenModal',
            headerShown: false,
            headerBackTitle: '',
            headerTintColor: 'black',
          }}
          />

          <Stack.Screen
          name='audioDetail'
          component={AudioDetailScreen}
          options={{
            title: "Audio",
          }}
          />

          <Stack.Screen
          name='videoDetail'
          component={VideoDetailScreen}
          options={{
            title:'Video',
          }}
          />
          
        </Stack.Navigator>
        <Toast/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
export default App;
