import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import {RootStackNavigationProp} from '../App';
import axios, {AxiosError} from 'axios';
import {AppUser, LoginResponseModel} from '../model/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants, appConstants } from '../utils/appConstants';

const {width, height} = Dimensions.get('screen');

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'createAccount'>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [id,setId] = useState('');

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string): boolean => /^[0-9]{10}$/.test(phone);

  const registerUser = async () => {
    if (!name) return Alert.alert(constantString.createAnAccount, constantString.enterName);
    if (password.length < 8)
      return Alert.alert(
        constantString.createAnAccount,
        constantString.passwordLength,
      );
    if (confirmPassword.length < 8)
      return Alert.alert(
        constantString.createAnAccount,
        constantString.confirmPasswordLength,
      );
    if (password !== confirmPassword)
      return Alert.alert(constantString.createAnAccount, constantString.confirmPasswordDoesnotMatch );
    if (!validateEmail(email))
      return Alert.alert(constantString.createAnAccount, constantString.enterValidEmail);
    if (!validatePhone(mobile.trim()))
      return Alert.alert(
        constantString.createAnAccount,
        constantString.mobileLength,
      );
    if (!isSelected)
      return Alert.alert(
        constantString.createAnAccount,
        constantString.acceptTheTC,
      );

    try {
      const parameters: Record<string, any> = {
        email,
        password,
        name,
        deviceInfo: {
          pushToken: '',
          osVersion: Platform.Version,
          deviceModel: Platform.OS,
          osType: 'ios',
        },
      };
      const response = await axios.post<LoginResponseModel>(
        apiConstants.createAccount,
        parameters,
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log(constantString.aPICreateAccountResponse, response.data);

      if (response?.status == 200 || response.data?.message == 'true') {
        Alert.alert(constantString.sucessCaps, response.data?.message || constantString.accountCreatedSuccessful);

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
          type: constantString.error,
          text1: constantString.createAccountFailed,
          text2: response?.data?.message ||  constantString.invalidCredentials,
        });
      }
    } catch (error) {
      console.log(constantString.aPICreateAccountError, error);

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
  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error(constantString.couldnotOpenUrl, err));
  };

  return (
    <ScrollView>
      <ImageBackground
        style={styles.imgBackGround}
        source={constantImage.bgBackGround}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.nameInput}
            placeholder={constantString.name}
            placeholderTextColor="#838795"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.nameInput}
            placeholder={constantString.password}
            placeholderTextColor="#838795"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.nameInput}
            placeholder={constantString.confirmPassword}
            placeholderTextColor="#838795"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.nameInput}
            placeholder={constantString.email}
            placeholderTextColor="#838795"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.nameInput}
            placeholder={constantString.mobileNo}
            placeholderTextColor="#838795"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              isChecked={isSelected}
              onClick={() => setSelection(!isSelected)}
              checkBoxColor="#7559CC"
            />
            <Text style={styles.label}>{constantString.agreeText} </Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate('webPage', {
                  url: appConstants.termsUrl,
                  title: constantString.termsAndConditions
                })
              }>
              <Text style={styles.linkText}>{constantString.termsAndConditions}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate('webPage', {
                  url: appConstants.privacyUrl,
                  title: constantString.privacyPolicy,
                })
              }>
              <Text style={styles.linkText}>{constantString.privacyPolicy}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPressIn={registerUser}
            activeOpacity={0.7}>
            <Text style={styles.submitText}>{constantString.submit}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: width,
    height: height,
    alignItems: 'center',
  },
  nameInput: {
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
  },
  inputWrapper: {
    flexGrow: 1,
    padding: 20,
    width: width,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  checkbox: {
    marginRight: 8,
    marginTop: 3,
  },
  label: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#7559CC',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 350,
  },
  submitButton: {
    backgroundColor: '#7559CC',
    padding: 15,
    borderRadius: 16,
    width: width * 0.8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAccountScreen;