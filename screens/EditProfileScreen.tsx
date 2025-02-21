import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {RootStackNavigationProp} from '../App';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const EditProfileScreen: React.FC = () => {  
  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/BG.png')}
        style={styles.imgBackGround}>
        <Text style={styles.nameText}>Name</Text>
        <TextInput style={styles.nameInput} />
        <Text style={styles.nameText}>Email</Text>
        <TextInput editable={false} style={styles.nameInput} />
        <Text style={styles.nameText}>Mobile No</Text>
        <TextInput style={styles.nameInput} />
        <TouchableOpacity style={styles.updateProfileButton}>
          <Text style={styles.updateProfileText}>Update Profile</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgBackGround: {
    width: width,
    height: height,
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
    marginLeft: 16,
    marginRight: 16,
    color: '#333',
    height: 56,
    borderColor: '#E2E3E4',
    borderWidth: 0.5,
  },
  updateProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateProfileButton: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: '#7559CC',
    borderRadius: 16,
    alignItems: 'center',
    height: 56,
    padding: 16,
  },
});

export default EditProfileScreen;
