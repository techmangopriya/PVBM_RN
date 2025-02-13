import React from 'react';
import {Dimensions, View, StyleSheet, Text} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';


const {width, height} = Dimensions.get('screen');

const AccountCreatedPopUpScreen: React.FC = () => {
  return (
    <View style={styles.container}>
     <BlurView
        style={styles.absoluteBlur}
        blurType="light" 
        blurAmount={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  absoluteBlur: {
    ...StyleSheet.absoluteFillObject
  },
});

export default AccountCreatedPopUpScreen;
