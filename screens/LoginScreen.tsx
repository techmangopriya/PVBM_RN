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
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants } from '../utils/appConstants';

const {width, height} = Dimensions.get('screen');

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'createAccount'>>();

  const [email, setEmail] = useState<string>('priya.dg@techmango.net');
  const [password, setPassword] = useState<string>('12345677');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [id,setId] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert(constantString.loginError, constantString.enterValidEmail);
      return;
    }

    if (password.length < 8) {
      Alert.alert(constantString.loginError, constantString.passwordLength);
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
        apiConstants.login,
        parameters,
        {headers: {'Content-Type': 'application/json'}},
      );

      console.log(constantString.apiLoginResponse, response.data);

      if (response?.status == 200 || response.data?.message === 'true') {
        Toast.show({
          type: constantString.success,
          text1: constantString.sucessCaps,
          text2: response.data?.message || constantString.loginSuccessful
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
          type: constantString.success,
          text1: constantString.loginFailed,
          text2: response.data?.message || constantString.invalidCredentials,
        });
      }
    } catch (error) {
      console.log(constantString.apiLoginError, error);

      if (axios.isAxiosError(error)) {
        console.log(constantString.errorResponse, error.response?.data);
        Toast.show({
          type: constantString.error,
          text1: constantString.loginFailed,
          text2: error.response?.data?.message ||
          constantString.someThingWentWrong,
        });
      } else {
        Alert.alert(constantString.error, constantString.unexpectedError);
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
            source={constantImage.bgBackGround}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <Image
                style={styles.logo}
                source={constantImage.logo}
              />
            </View>

            <View style={styles.container}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginTitle}>{constantString.login}</Text>

                <TextInput
                  style={styles.input}
                  placeholder={constantString.email}
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder={constantString.password}
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
                    onPress={moveToResetScreen}>{constantString.forgotPassword}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleLogin}>
                  <Text style={styles.signInText}>{constantString.signIn}</Text>
                </TouchableOpacity>

                <View style={styles.createAccountContainer}>
                  <Text style={styles.createAccount}>
                   {constantString.dontHaveAccount}{' '}
                  </Text>
                  <TouchableOpacity onPress={moveToAccountScreen}>
                    <Text style={styles.createAccountLink}>{constantString.createAccount}</Text>
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