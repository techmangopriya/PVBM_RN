import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TTSButton} from 'react-native-ttsbutton'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from '../App';

const {width, height} = Dimensions.get('screen');

const ResetPasswordScreen: React.FC = ({}) => {
  const navigation = useNavigation<RootStackNavigationProp<'resetPassword'>>();
  const [email, setEmail] = useState<string>('');

  const moveToCheckMailScreen = () => {
    console.log('click button')
    navigation.navigate('checkMailPopUp');
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
          />
        </View>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={styles.resetPasswordButton}
            onPress={moveToCheckMailScreen}
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
