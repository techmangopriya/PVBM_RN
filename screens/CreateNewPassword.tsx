import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const CreateNewPassword: React.FC = () => {
  return (
    <ImageBackground
      style={styles.imgBackGround}
      source={require('../assets/images/BG.png')}
    >
      <View style={styles.baseViewStyle}>
        <Text style={styles.forgetText}>
          Your new password must be different from previously used passwords.
        </Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#838795"
          />
          <TextInput
            style={styles.confirmPasswordInput}
            placeholder="New Password"
            placeholderTextColor="#838795"
          />
        </View>
        <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.resetPasswordButton}>
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
  }
});
export default CreateNewPassword;