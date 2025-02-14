import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import { RootStackNavigationProp } from '../App';

const { width, height } = Dimensions.get('screen');

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'createAccount'>>();
  const [isSelected, setSelection] = useState(false);

  const accountCreatedPopUpScreen = () => {
    console.log("Navigating to accountCreatedPopUp...");  
    navigation.navigate('accountCreatedPopUp');
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
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Password"
            placeholderTextColor="#838795"
            secureTextEntry
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Confirm Password"
            placeholderTextColor="#838795"
            secureTextEntry
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Email"
            placeholderTextColor="#838795"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Mobile no"
            placeholderTextColor="#838795"
            keyboardType="phone-pad"
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
          <TouchableOpacity onPress={() => navigation.navigate('webPage', { url: 'https://pvbm.net/terms-condition' })}>
            <Text style={styles.linkText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('webPage', { url: 'https://pvbm.net/privacy-policy' })}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={accountCreatedPopUpScreen}
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
