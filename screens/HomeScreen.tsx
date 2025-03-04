import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const categories = ['Categories', 'Videos', 'Audios', 'Documents'];
const {width, height} = Dimensions.get('screen');
import {RootStackNavigationProp} from '../App'

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Categories');
  return (
    <View style={styles.container}>
      <Text style={styles.libraryTextCont}>Library</Text>

      <View style={styles.segmentContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.segmentButton,
              selectedCategory === item && styles.selectedSegment,
            ]}
            onPressIn={() => setSelectedCategory(item)}>
            <Text
              style={[
                styles.segmentText,
                selectedCategory === item && styles.selectedText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>Selected: {selectedCategory}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
    padding: 10,
  },
  libraryTextCont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedSegment: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  selectedText: {
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;