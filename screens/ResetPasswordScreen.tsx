import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TTSButton} from 'react-native-ttsbutton';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from '../App';
import axios, {AxiosError} from 'axios';
import {LoginResponseModel, ResetPasswordResponseModel} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const {width, height} = Dimensions.get('screen');

const ResetPasswordScreen: React.FC = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'checkMailPopUp'>>();

  const [emailId, setEmail] = useState<string>('');

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const resetPasswordapiCall = async () => {

    if (emailId.trim() === '') {
      Alert.alert('Reset Password', 'Email Cannot be empty')
      return;
    }
    if (!validateEmail(emailId)) {
      Alert.alert('Reset Password', 'Enter a Valid email');
      return;
    }
    try {
      const response = await axios.get<ResetPasswordResponseModel>(
        'https://pvbm.net:3000/api/v1/user/forgotPassword', 
        {
          headers: {'Content-Type': 'application/json'},
          params: {
            emailId: emailId, 
          },
        }
      );

      console.log('API Reset Response:', response.data);

      if (response.status === 200 || response.data.message === 'true') {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset email sent successfully!',
        });

        if (response.data.data) {
          const otpDetails = {
            otp: response.data.data.otp,
            emailId: emailId
          };
          await AsyncStorage.setItem('OTPData', JSON.stringify({emailId: emailId}));
        }
        navigation.navigate('checkMailPopUp');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: response.data.message || 'Something went wrong',
        });
      }
    } catch (error) {
      console.log('API Reset Error:', error);

      if (axios.isAxiosError(error)) {
        console.log('Error Response:', error.response?.data);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response?.data?.message ||
          'Something went wrong. Please try again later.'
        })
      } else {
        Alert.alert('Error', 'Unexpected error occurred.');
      }
    } finally {
    }
  };

  return (
    <ImageBackground
      style={styles.imgBackGround}
      source={require('../assets/images/BG.png')}>
      <View style={styles.baseView}>
        <Text style={styles.textStyle}>
          Lost Your Password? Please enter your email will receive a link to
          create a new password via email.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputContainer}
            placeholder="Email"
            placeholderTextColor="#838795"
            keyboardType="email-address"
            value={emailId}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={resetPasswordapiCall}
            activeOpacity={0.7}>
            <Text style={styles.resetPasswordText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseView: {
    backgroundColor: 'clear',
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'regular',
    padding: 20,
    marginTop: 20,
  },
  inputContainer: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8FA',
    marginBottom: 32,
    color: '#333',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
    marginTop: 16,
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetPasswordButton: {
    backgroundColor: '#7559CC',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  resetPasswordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWrapper: {
    paddingHorizontal: 20,
  },
});

export default ResetPasswordScreen;