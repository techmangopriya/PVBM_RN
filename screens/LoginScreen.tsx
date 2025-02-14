/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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
} from 'react-native';
import { RootStackNavigationProp } from '../App';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('screen');

const LoginScreen : React.FC= () => {
  const navigation = useNavigation<RootStackNavigationProp<'createAccount'>>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const moveToResetScreen = () => {
    navigation.navigate('resetPassword')
  }

  const moveToAccountScreen = () => {
    navigation.navigate('createAccount')
  }

  const moveToHomeScreen = () => {
    navigation.navigate('homeScreen');
  };

  return (

    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={{ flex: 1 }}
  >
    <KeyboardAwareScrollView 
      contentContainerStyle={{ flexGrow: 1 }} 
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
    <ScrollView>
    <ImageBackground
      style={styles.imgBackGround}
      source={require('../assets/images/BG.png')} 
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: width }}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')} 
        />
      </View>

      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
            />
            <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {/* <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#aaa" /> */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword} onPress={moveToResetScreen}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={moveToHomeScreen}>
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccount}>Don't have an account? </Text>
            <TouchableOpacity onPress={moveToAccountScreen}>
              <Text style={styles.createAccountLink}>Create Account</Text>
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
    shadowOffset: {width: 0,height: 4},
    shadowOpacity:0.2,
    shadowColor: '#000',
    shadowRadius: 6,
    alignItems: 'center',
    elevation: 5, 
  },
  loginContainer: {
     backgroundColor: 'clear',
    width: '100%',
    padding: 20,
     borderRadius: 20,
    elevation: 5,
    marginBottom: 100,
    
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
  },
  passwordInput: {
    flex: 1,
    color: '#333',
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