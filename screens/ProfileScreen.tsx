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
import { useIsFocused } from '@react-navigation/native';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';
import { appConstants } from '../utils/appConstants.tsx';

const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    id: '1',
    title: constantString.changePassword,
    leftIcon: constantImage.password,
    screen: 'createNewPassword',
  },
  {
    id: '2',
    title: constantString.pushNotifications,
    leftIcon: constantImage.pushNotification,
  },
  {
    id: '3',
    title: constantString.termsAndConditions,
    leftIcon: constantImage.terms,
    url: appConstants.termsUrl
  },
  {
    id: '4',
    title: constantString.privacyPolicy,
    leftIcon: constantImage.privacy,
    url: appConstants.privacyUrl,
  },
  {
    id: '5',
    title: constantString.tellaFriend,
    leftIcon: constantImage.referFriends,                                 
  },
  {
    id: '6',
    title: constantString.aboutUs,
    leftIcon: constantImage.aboutUs,
    url: appConstants.aboutUsUrl,
  },
  {id: '7', title: constantString.logout, leftIcon: constantImage.logOut},
];

const rightArrow = constantImage.rightArrow;

const ProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'homeScreen'>>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNo, setMobileNo] = useState<string>('');
  const [id, setId] = useState<string>('');

  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const getUserDetails = async () => {
        try {
          const userData = await AsyncStorage.getItem('AppUser');
          if (userData) {
            const user: AppUser = JSON.parse(userData);
            setName(user.name || 'User Name');
            setEmail(user.email || 'example@example.com');
            setMobileNo(user.mobileNo || '9999999999');
            setId(user.id || '');
          }
        } catch (error) {
          console.error(constantString.errorFetchingUserData, error);
        }
      };
  
      const refresh = navigation.getState().routes.some(
        (route) =>
          route.params && typeof route.params === 'object' && 'refresh' in route.params && route.params.refresh
      );
      if (refresh) {
        getUserDetails();
      }

      getUserDetails();
    }, [navigation])
  );
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('AppUser');
    navigation.navigate('login'); 
  };

  const moveToEditProfile = () => {
     navigation.navigate('editProfile', { name : name, email: email, mobileNo: mobileNo, id: id });
  };

  const handleNavigation = (item: {screen?: string; url?: string, title?: string}) => {
    if (item.title == constantString.logout) {
      handleLogout();
    } else if (item.screen) {
      navigation.navigate(item.screen as never);
    } else if (item.url) {
      navigation.navigate('webPage', { url: item.url, title: item.title });
    }
  };
  return (
      <View style={styles.headerContainer}>
      <Text style={styles.header}>{constantString.profile}</Text>
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={constantImage.setProfile}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          <TouchableOpacity onPress={moveToEditProfile} activeOpacity={0.7}>
            <Text style={styles.editProfile}>{constantString.editProfile}</Text>
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
      {/* <View style={styles.footerView}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image
          style={styles.footerImage}
          source={constantImage.techmangoLogo}
        />
      </View> */}
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