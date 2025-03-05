import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { RootStackNavigationProp } from '../App';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { apiConstants } from '../utils/appConstants';

type EditProfileParams = {
  name: string;
  email: string;
  mobileNo: string;
  id: string;
};

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'editProfilePopup'>>();
  const route = useRoute<RouteProp<{ params: EditProfileParams }, 'params'>>();

  const { name, email, mobileNo, id } = route.params;

  const [userName, setUserName] = useState(name);
  const [userMobile, setUserMobile] = useState(mobileNo);
  const [userEmail, setUserEmail] = useState(email);
  const [userId, setUserId] = useState(id);


  const updateProfileApiCall = async () => {
    console.log({
      id: userId,
      name: userName,
      mobile_no: userMobile,
    });

    try {
      const response = await axios.patch(
       apiConstants.updateProfile,
        {
          id: userId,
          name: userName,
          mobile_no: userMobile,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(constantString.apiEditProfileResponse, response.data);
      if (response.status === 200 || response.data.message === 'true') {
        Toast.show({
          type: constantString.success,
          text1: constantString.sucessCaps,
          text2: response.data.message || '',
        });
        
       navigation.navigate('editProfilePopup');
      } else {
        Toast.show({
          type: constantString.error,
          text1: constantString.editProfileFailed,
          text2: response.data.message || constantString.invalidCredentials,
        });
      }
    } catch (error) {
      console.log(constantString.editProfileFailed, error);
      Toast.show({
        type: constantString.error,
        text1: constantString.editProfileFailed,
        text2: constantString.someThingWentWrong,
      });
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={constantImage.bgBackGround}
        style={styles.imgBackGround}>
        <Text style={styles.nameText}>{constantString.name}</Text>
        <TextInput
          style={styles.nameInput}
          value={userName}
          onChangeText={setUserName}
        />

        <Text style={styles.nameText}>{constantString.email}</Text>
        <TextInput
          editable={false}
          style={styles.emailInput}
          value={userEmail}

        />

        <Text style={styles.nameText}>{constantString.mobileNo}</Text>
        <TextInput
          style={styles.nameInput}
          value={userMobile}
          onChangeText={setUserMobile}
          keyboardType="number-pad"
        />

        <TouchableOpacity style={styles.updateProfileButton} 
         onPress={updateProfileApiCall}
        >
          <Text style={styles.updateProfileText}>{constantString.updateProfile}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    color: '#838795',
    marginTop: 15,
    paddingLeft: 16,
    fontSize: 14,
  },
  nameInput: {
    backgroundColor: '#F8F8FA',
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 15,
    marginHorizontal: 16,
    color: '#333',
    height: 56,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
    padding: 15,
  },
  emailInput: {
    backgroundColor: '#E2E3E4',
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 15,
    marginHorizontal: 16,
    color: '#333',
    height: 56,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
    padding: 15,
  },
  updateProfileButton: {
    marginHorizontal: 16,
    backgroundColor: '#7559CC',
    borderRadius: 16,
    alignItems: 'center',
    height: 56,
    padding: 16,
  },
  updateProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;