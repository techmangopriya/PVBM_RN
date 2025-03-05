import React, { useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../App';
import { constantString } from '../utils/constantString';
import { constantImage } from '../utils/images';

const {width, height} = Dimensions.get('screen');

const EditPopUpScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'editProfile'>>();
  const [modalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
    navigation.navigate('homeScreen', { refresh: true });
  };
    
    return (
      <Modal
      animationType='none'
      transparent={false}
      visible={modalVisible}
      onRequestClose={handleClose}
      >
      <View style={styles.container}>
        <View style={styles.popViewContainer}>
          <Image
            source={constantImage.message}
            style={styles.image}
          />
          <Text style={styles.baseText}>{constantString.successfullyUpdated}</Text>
          <Text style={styles.subText}>{constantString.yourProfileHasBeenUpdated}</Text>
          <TouchableOpacity style={styles.closeButton} onPressIn={handleClose}>
            <Text style={styles.closeText}>{constantString.close}</Text>
          </TouchableOpacity>
        </View>
      </View>                  
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    popViewContainer: { 
      backgroundColor: 'white',
      width: width * 0.8,
      height: 298,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    image: {
      marginTop: 30,
      width: 50,
      height: 50,
    },
    baseText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'black',
      marginTop: 10,
    },
    subText: {
      fontSize: 16,
      color: '#5A6072',
      fontWeight: '300',
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 30,
    },
    closeButton: {
      width: '80%',
      backgroundColor: '#7559CC',
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      height: 56,
    },
    closeText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
  export default EditPopUpScreen;