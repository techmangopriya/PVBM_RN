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
import {AppUser, LoginResponseModel} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

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
    if (!name) return Alert.alert('Create an Account', 'Enter Name');
    if (password.length < 8)
      return Alert.alert(
        'Create an Account',
        'Enter Password with at least 8 characters',
      );
    if (confirmPassword.length < 8)
      return Alert.alert(
        'Create an Account',
        'Enter Confirm Password with at least 8 characters',
      );
    if (password !== confirmPassword)
      return Alert.alert('Create an Account', "Confirm Password Doesn't match");
    if (!validateEmail(email))
      return Alert.alert('Create an Account', 'Enter a valid Email');
    if (!validatePhone(mobile.trim()))
      return Alert.alert(
        'Create an Account',
        'Enter valid Mobile Number with at least 10 digits',
      );
    if (!isSelected)
      return Alert.alert(
        'Create an Account',
        'Please accept the Terms and Conditions',
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
        'https://pvbm.net:3000/api/v1/user/register',
        parameters,
        {headers: {'Content-Type': 'application/json'}},
      );
      console.log('API Create Account Response:', response.data);

      if (response?.status == 200 || response.data?.message == 'true') {
        Alert.alert('Success', response.data?.message || 'Login successful');

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
          type: 'error',
          text1: 'Create Account Failed',
          text2: response?.data?.message || 'Invalid credentials',
        });
      }
    } catch (error) {
      console.log('API Create Account Error:', error);

      if (axios.isAxiosError(error)) {
        console.log('Error Response:', error.response?.data);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            error.response?.data?.message ||
            'Something went wrong. Please try again later.',
        });
      } else {
        Alert.alert('Error', 'Unexpected error occurred.');
      }
    } finally {
    }
  };
  const openURL = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't open URL", err));
  };

  return (
    <ScrollView>
      <ImageBackground
        style={styles.imgBackGround}
        source={require('../assets/images/BG.png')}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.nameInput}
            placeholder="Name"
            placeholderTextColor="#838795"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Password"
            placeholderTextColor="#838795"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Confirm Password"
            placeholderTextColor="#838795"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Email"
            placeholderTextColor="#838795"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Mobile no"
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
            <Text style={styles.label}>
              I hereby agree to Terms and Conditions and Privacy Policy
            </Text>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate('webPage', {
                  url: 'https://pvbm.net/terms-condition',
                  title: 'Terms & Conditions',
                })
              }>
              <Text style={styles.linkText}>Terms & Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate('webPage', {
                  url: 'https://pvbm.net/privacy-policy',
                  title: 'Privacy Policy',
                })
              }>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPressIn={registerUser}
            activeOpacity={0.7}>
            <Text style={styles.submitText}>Submit</Text>
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