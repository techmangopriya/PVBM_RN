import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../App';

const { width, height } = Dimensions.get('screen');

const OTPScreen: React.FC = () => {
    const navigation = useNavigation<RootStackNavigationProp<'checkMailPopUp'>>();
    const moveToCheckMail = () => {
        navigation.navigate('checkMailPopUp')
    }
  return (
    <ImageBackground source={require('../assets/images/BG.png')} style={styles.imgBackGround}>
      <Text style={styles.lblTitle}>
        Enter the verification code we just sent you on your email address
      </Text>
      <View style={styles.otpContainer}>
        <OtpInput
          numberOfDigits={4}
          focusColor='purple'
          secureTextEntry={false}
          blurOnFilled={true}
          disabled={false}
          type='numeric'
          theme={{
            containerStyle: styles.containerStyle,
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.infoText}>Didn't receive the code?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Re-send code</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={moveToCheckMail}>
          <Text style={styles.continueText}>Continue</Text>
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
    backgroundColor: '#7559CC' ,
    height: 50,
    width: '90%',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 16,
    justifyContent: "center"
  },
  continueText: {
   color: 'white',
   fontSize: 16,
   textAlign: 'center'
  }
});

export default OTPScreen;
