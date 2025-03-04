/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {RootStackNavigationProp} from '../App';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios, {AxiosError} from 'axios';
import DeviceInfo from 'react-native-device-info';
import {LoginResponseModel} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const {width, height} = Dimensions.get('screen');

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'createAccount'>>();

  const [email, setEmail] = useState<string>('priya.dg@techmango.net');
  const [password, setPassword] = useState<string>('12345677');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [id,setId] = useState<string>('67af19359c7bab2e36b7a085');

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Login Error', 'Enter a valid email');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Login Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const deviceModel = DeviceInfo.getModel();
      const systemVersion = DeviceInfo.getSystemVersion();
      const pushToken = '';
      // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzIyZDhhMThhMDZjODVhNDM4ZDA3Y2UiLCJ1c2VyUm9sZSI6Im51bGwiLCJpYXQiOjE3MzYwNjEzMzcsImV4cCI6MTczNjIzNDEzNywiYXVkIjoiNjMyMmQ4YTE4YTA2Yzg1YTQzOGQwN2NlIiwiaXNzIjoiYmJyYXVuIn0.yNB3WFTFavXHFegfLRFARNGDOwdRkxkpE5BN1bnr66Q';
      const parameters = {
        email,
        password,
        deviceInfo: {
          pushToken,
          osVersion: systemVersion,
          deviceModel,
          osType: Platform.OS,
        },
      };
      const response = await axios.post<LoginResponseModel>(
        'https://pvbm.net:3000/api/v1/user/login',
        parameters,
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log('API Login Response:', response.data);

      if (response?.status == 200 || response.data?.message === 'true') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data?.message || 'Login successful',
        });
        if (response.data.accessToken) {
          const userDetails = {
            name: response.data.data?.name,
            email: response.data.data?.email,
            mobileNo: response.data.data?.mobileNo,
            id: response.data.data?.id
          };

          await AsyncStorage.setItem('AppUser', JSON.stringify(userDetails));
        }
        navigation.navigate('homeScreen');
      } else {
        Toast.show({
          type: 'success',
          text1: 'Login Failed',
          text2: response.data?.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      console.log('API Login Error:', error);

      if (axios.isAxiosError(error)) {
        console.log('Error Response:', error.response?.data);
        Toast.show({
          type: 'Error',
          text1: 'Login Failed',
          text2: error.response?.data?.message ||
          'Something went wrong. Please try again later.',
        });
      } else {
        Alert.alert('Error', 'Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const moveToResetScreen = () => {
    navigation.navigate('resetPassword');
  };

  const moveToAccountScreen = () => {
    navigation.navigate('createAccount');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <ScrollView>
          <ImageBackground
            style={styles.imgBackGround}
            source={require('../assets/images/BG.png')}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
              />
            </View>

            <View style={styles.container}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>Login</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}>
                    {/* <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#aaa" /> */}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <Text
                    style={styles.forgotPassword}
                    onPress={moveToResetScreen}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleLogin}>
                  <Text style={styles.signInText}>Sign in</Text>
                </TouchableOpacity>

                <View style={styles.createAccountContainer}>
                  <Text style={styles.createAccount}>
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={moveToAccountScreen}>
                    <Text style={styles.createAccountLink}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: width,
    height: height,
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  loginContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    marginBottom: 100,
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        borderRadius: 0,
      },
    }),
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F8F8FA',
    padding: 12,
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 15,
    color: '#333',
    height: 50,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    padding: 12,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    color: '#333',
    minHeight: 40,
  },
  forgotPassword: {
    color: '#7559CC',
    textAlign: 'right',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#7559CC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccount: {
    fontSize: 14,
    color: '#333',
  },
  createAccountLink: {
    color: '#7559CC',
    fontWeight: 'bold',
    fontSize: 14,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default LoginScreen;