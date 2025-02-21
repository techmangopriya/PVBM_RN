import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const CheckMailPopUpScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.popViewContainer}>
        <Image
          source={require('../assets/images/Message.png')}
          style={styles.image}
        />
        <Text style={styles.baseText}>Check your mail</Text>
        <Text style={styles.subText}>
          We have sent a password recover instructions to your email.
        </Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  absoluteBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  popViewContainer: {
    backgroundColor: 'white',
    width: 327,
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

export default CheckMailPopUpScreen;
