import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../App';
import axios from 'axios';
import {ResetPasswordResponseModel} from './types';

const {width, height} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants } from '../utils/appConstants';


const OTPScreen: React.FC = () => {
  const navigation =
    useNavigation<RootStackNavigationProp<'createNewPassword'>>();
   const [otp, setOtp] = useState<string>('');
   const [emailId, setEmail] = useState<string>('');

   useFocusEffect(
    useCallback(() => {
      const fetchEmail = async () => {
        try {
          const otpData = await AsyncStorage.getItem('OTPData');
          if (otpData) {
            const {emailId} = JSON.parse(otpData);
            setEmail(emailId);
            console.log(constantString.emailRetrived, emailId);
          }
        } catch (error) {
          console.log(constantString.errorFetchingEmail, error);
        }
      };
  
      fetchEmail();
    }, [])
   );

  const resendOTPApiCall = async () => {
    try {
      const response = await axios.get<ResetPasswordResponseModel>(
        apiConstants.forgotPassword,
        {
          headers: {'Content-Type': 'application/json'},
          params: {
            emailId: emailId,
          },
        },
      );
      console.log(constantString.otpResendResponse, response.data);

      if (response.status === 200 || response.data.message === 'true') {
        Toast.show({
          type: constantString.success,
          text1: constantString.success,
          text2: constantString.otpResendSent,
        });
        setOtp('');

        if (response.data.data) {
          const resetEmailId = {
            emailId: emailId
          };
          await AsyncStorage.setItem(constantString.resetEmailId, JSON.stringify({emailId: emailId}));
        }
      } else {
        Toast.show({
          type: constantString.error,
          text1: constantString.failed,
          text2: response.data.message || constantString.someThingWentWrong,
        });
      }
    } catch (error) {
      console.log(constantString.otpResendError, error);

      if (axios.isAxiosError(error)) {
        console.log(constantString.errorResponse, error.response?.data);
        Toast.show({
          type: constantString.error,
          text1: constantString.errorCaps,
          text2:
            error.response?.data?.message ||
           constantString.someThingWentWrong,
        });
      } else {
        Alert.alert(constantString.errorCaps, constantString.unexpectedError);
      }
    } finally {
    }
  };

  const moveToCreateNewPassword = () => {
    navigation.navigate('createNewPassword');
  };
  return (
    <ImageBackground
      source={constantImage.bgBackGround} 
      style={styles.imgBackGround}>
      <Text style={styles.lblTitle}>{constantString.otpText}</Text>
      <View style={styles.otpContainer}>
        <OtpInput
          numberOfDigits={4}
          focusColor="purple"
          secureTextEntry={false}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          onTextChange={(text) => setOtp(text)}
          theme={{
            containerStyle: styles.containerStyle,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.infoText}>{constantString.didNotReceiveTheCode}</Text>
        <TouchableOpacity style={styles.button} onPressIn={resendOTPApiCall}>
          <Text style={styles.buttonText}>{constantString.reSendCode}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.continueButton, otp.length !== 4 && {opacity: 0.5}]}
        disabled={otp.length !== 4}
        onPressIn={moveToCreateNewPassword}>
        <Text style={styles.continueText}>{constantString.continue}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: width,
    height: height,
  },
  lblTitle: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'regular',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 20,
  },
  otpContainer: {
    height: 100,
    overflow: 'hidden',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  containerStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'clear',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginLeft: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    paddingTop: 5,
    color: '#7559CC',
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: '#7559CC',
    height: 50,
    width: '90%',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OTPScreen;