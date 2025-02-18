import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackNavigationProp } from '../App';



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
  },
  {
    id: '4',
    title: 'Privacy Policy',
    leftIcon: require('../assets/images/Privacy.png'),
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
  },
  {id: '7', title: 'Logout', leftIcon: require('../assets/images/Logout.png')},
];

const rightArrow = require('../assets/images/RightArrow.png');

const ProfileScreen = () => {

  // const navigation = useNavigation<NavigationProp>();

  // const handlePress = (item: { id: string; screen?: keyof RootStackParamList }) => {
  //   if (item.screen) {
  //     navigation.navigate(item.screen as keyof RootStackParamList);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/SetProfile.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>UserName</Text>
          <Text style={styles.profileEmail}>pvbm@gmail.com</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          // <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.itemContainer}>
            <Image source={item.leftIcon} style={styles.leftImage} />
            <Text style={styles.text}>{item.title}</Text>
            <Image source={rightArrow} style={styles.rightImage} />
          </View>
          // </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
});

export default ProfileScreen;
