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
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants } from '../utils/appConstants';

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
      Alert.alert(constantString.resetPassword, constantString.emailEmpty)
      return;
    }
    if (!validateEmail(emailId)) {
      Alert.alert(constantString.resetPassword, constantString.enterValidEmail);
      return;
    }
    try {
      const response = await axios.get<ResetPasswordResponseModel>(
        apiConstants.forgotPassword, 
        {
          headers: {'Content-Type': 'application/json'},
          params: {
            emailId: emailId, 
          },
        }
      );

      console.log(constantString.apiResetResponse, response.data);

      if (response.status === 200 || response.data.message === 'true') {
        Toast.show({
          type: constantString.success,
          text1: constantString.sucessCaps,
          text2: constantString.passwordSuccessfully,
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
          type: constantString.error,
          text1: constantString.failed,
          text2: response.data.message || constantString.someThingWentWrong,
        });
      }
    } catch (error) {
      console.log(constantString.apiResetError, error);

      if (axios.isAxiosError(error)) {
        console.log(constantString.errorResponse, error.response?.data);
        Toast.show({
          type: constantString.error,
          text1: constantString.errorCaps,
          text2: error.response?.data?.message ||
          constantString.someThingWentWrong
        })
      } else {
        Alert.alert(constantString.errorCaps, constantString.unexpectedError);
      }
    } finally {
    }
  };

  return (
    <ImageBackground
      style={styles.imgBackGround}
      source={constantImage.bgBackGround}>
      <View style={styles.baseView}>
        <Text style={styles.textStyle}>{constantString.resetPasswordText}</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputContainer}
            placeholder={constantString.email}
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
            <Text style={styles.resetPasswordText}>{constantString.resetPassword}</Text>
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