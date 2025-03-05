import React, {useCallback, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import {RootStackNavigationProp} from '../App';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ResetPasswordResponseModel} from './types';
const {width, height} = Dimensions.get('screen');
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants } from '../utils/appConstants';

const CreateNewPassword: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'passwordPopUp'>>();
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<string>('');
  const [emailId, setEmail] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      const fetchResetEmailId = async () => {
        try {
          const resetEmailId = await AsyncStorage.getItem('ResetEmailId');
          if (resetEmailId) {
            const {emailId} = JSON.parse(resetEmailId);
            setEmail(emailId);
            console.log(constantString.emailRetrived, emailId);
          }
        } catch (error) {
          console.log(constantString.errorFetchingEmail, error);
        }
      };
      fetchResetEmailId();
    }, []),
  );

  const apiCallCreatePassword = async () => {
    if (password.length < 8) {
      Alert.alert(constantString.changePassword, constantString.passwordLength);
      return;
    }

    if (confirmPassword.length < 8) {
      Alert.alert(
        constantString.changePassword,
        constantString.confirmPasswordLength,
      );
      return;
    }

    if (password != confirmPassword) {
      Alert.alert(constantString.changePassword, constantString.confirmPasswordDoesnotMatch);
    }

    try {
      const response = await axios.patch<ResetPasswordResponseModel>(
        apiConstants.changePassword,
        {
          emailId: emailId,
          password: password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );

      console.log(constantString.aPIChangePasswordResponse, response.data);
      if (response.status === 200 || response.data.message === 'true') {
        Toast.show({
          type: constantString.success,
          text1: constantString.sucessCaps,
          text2: response.data.message || '',
        });

        if (response.data.data) {
        }
        navigation.navigate('passwordPopUp');
      } else {
        Toast.show({
          type: constantString.error,
          text1: constantString.changePasswordFailed,
          text2: response.data.message || constantString.invalidEmail,
        });
      }
    } catch (error) {
      console.log(constantString.aPIChangePasswordError, error);

      if (axios.isAxiosError(error)) {
        console.log(constantString.errorResponse, error.response?.data);
        Toast.show({
          type: constantString.error,
          text1: constantString.changePasswordFailed,
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
  return (
    <ImageBackground
      style={styles.imgBackGround}
      source={constantImage.bgBackGround}>
      <View style={styles.baseViewStyle}>
        <Text style={styles.forgetText}>{constantString.changePasswordText} </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder={constantString.password}
            placeholderTextColor="#838795"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.confirmPasswordInput}
            placeholder={constantString.newPassword}
            placeholderTextColor="#838795"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={apiCallCreatePassword}>
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
  },
  baseViewStyle: {
    flex: 1,
  },
  forgetText: {
    fontSize: 16,
    fontWeight: 'regular',
    padding: 16,
    marginTop: 16,
  },
  passwordInput: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8FA',
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
  confirmPasswordInput: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F8FA',
    color: '#333',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#E2E3E4',
    marginTop: 16,
    borderWidth: 0.5,
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    paddingHorizontal: 20,
  },
  resetPasswordButton: {
    marginTop: 32,
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
});
export default CreateNewPassword;