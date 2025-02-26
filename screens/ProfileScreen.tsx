import React, {useState,useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackNavigationProp} from '../App';
import {ScrollView} from 'react-native-gesture-handler';
import axios,{AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppUser } from './types';
import { useFocusEffect } from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    id: '1',
    title: 'Change Password',
    leftIcon: require('../assets/images/Password.png'),
    screen: 'createNewPassword',
  },
  {
    id: '2',
    title: 'Push Notifications',
    leftIcon: require('../assets/images/Notification.png'),
  },
  {
    id: '3',
    title: 'Terms & Conditions',
    leftIcon: require('../assets/images/Terms.png'),
    url: 'https://pvbm.net/terms-condition',
  },
  {
    id: '4',
    title: 'Privacy Policy',
    leftIcon: require('../assets/images/Privacy.png'),
    url: 'https://pvbm.net/privacy-policy',
  },
  {
    id: '5',
    title: 'Tell a Friend',
    leftIcon: require('../assets/images/ReferFriends.png'),                                 
  },
  {
    id: '6',
    title: 'About Us',
    leftIcon: require('../assets/images/AboutUs.png'),
    url: 'https://pvbm.net/aboutus',
  },
  {id: '7', title: 'Logout', leftIcon: require('../assets/images/Logout.png')},
];

const rightArrow = require('../assets/images/RightArrow.png');

const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'homeScreen'>>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');


  useFocusEffect(
    useCallback(() => {
      const getUserDetails = async () => {
        try {
          const userData = await AsyncStorage.getItem('AppUser');
          if (userData) {
            const user = JSON.parse(userData);
            setName(user.name || 'User Name');
            setEmail(user.email || 'example@example.com');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      getUserDetails();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('AppUser');
    navigation.navigate('login'); 
  };

  const moveToEditProfile = () => {
    console.log('Navigating to Edit Profile');
    navigation.navigate('editProfile');
  };
  const handleNavigation = (item: {screen?: string; url?: string, title?: string}) => {
    if (item.title == 'Logout') {
      handleLogout();
    } else if (item.screen) {
      navigation.navigate(item.screen as never);
    } else if (item.url) {
      navigation.navigate('webPage', { url: item.url, title: item.title });
    }
  };
  return (
      <View style={styles.headerContainer}>
      <Text style={styles.header}>Profile</Text>
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/SetProfile.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <TouchableOpacity onPress={moveToEditProfile} activeOpacity={0.7}>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleNavigation(item)}
            style={styles.itemContainer}>
            <Image source={item.leftIcon} style={styles.leftImage} />
            <Text style={styles.text}>{item.title}</Text>
            <Image source={rightArrow} style={styles.rightImage} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.footerView}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image
          style={styles.footerImage}
          source={require('../assets/images/TechmangoLogo.png')}
        />
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  editProfile: {
    color: '#7559CC',
    marginTop: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  leftImage: {
    width: 32,
    height: 32,
    marginRight: 15,
  },
  rightImage: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
  text: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  footerView: {
    backgroundColor: '#F8F8FA',
    width: width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 20,
    marginLeft: 0,
  },
  footerImage: {
    justifyContent: 'center',
    height: 60,
    width: 300,
    marginVertical: 20,
  },
  footerText: {
    color: 'purple',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProfileScreen;
