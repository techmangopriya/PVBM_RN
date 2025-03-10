import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import axios from 'axios';
import {RootStackNavigationProp} from '../App';
import Toast from 'react-native-toast-message';
import {constantString} from '../utils/constantString';
import {constantImage} from '../utils/images';
import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const AudioDetailScreen: React.FC = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <View>
        <Image source={constantImage.aboutUs} style={styles.audioDetailImage} />
      </View>
      <View>
        <Text style={styles.dateText}>sep 08, 2023</Text>
        <Text style={styles.titleText}>Asminparatman with Mahamantra</Text>
        <Text style={styles.descriptionText}>Asminparatman with Mahamantra</Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  audioDetailImage: {
    width: 150,
    height: 150,
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'regular',
    color: 'gray',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'regular',
    color: 'black',
    top: 5,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'regular',
    color: 'black',
    top: 10,
    alignItems: 'center',
    textAlign: 'center'
  },
});

export default AudioDetailScreen;
