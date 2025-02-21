import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {FeedItem} from '../screens/types';

const videoIcon = require('../assets/images/ic_video_icon.png');
const audioIcon = require('../assets/images/ic_audio_icon.png');

const feedData: FeedItem[] = [
  {
    id: '1',
    title: 'Nynym class 2024-dasakam1...',
    category: 'Class-Satsang-Narayaneeyam',
    date: 'Oct 20, 2024',
    type: 'VIDEO',
  },
  {
    id: '2',
    title: 'Bgvtmintroduction-vijayadas...',
    category: 'Classes-Bgvtm-2024',
    date: 'Oct 16, 2024',
    type: 'VIDEO',
  },
  {
    id: '3',
    title: 'Narayaneeyam-dasakam-67',
    category: 'Class-Satsang-Narayaneeyam',
    date: 'Sep 16, 2024',
    type: 'VIDEO',
  },
  {
    id: '4',
    title: 'Bgvtm-5.1',
    category: 'Bgvtm-Slokas-Parayana-Canto-5',
    date: 'Mar 18, 2024',
    type: 'AUDIO',
  },
  {
    id: '5',
    title: 'Bgvtm-5.1',
    category: 'Bgvtm-Slokas-Parayana-Canto-5',
    date: 'Mar 18, 2024',
    type: 'AUDIO',
  },
];

const FeedScreen: React.FC = () => {
  const renderItem = ({item}: {item: FeedItem}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <View style={styles.footer}>
        <Text style={styles.date}>{item.date}</Text>
        <View style={styles.typeContainer}>
          <Image
            source={item.type == 'VIDEO' ? videoIcon : audioIcon}
            style={styles.icon}
          />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      <FlatList
        data={feedData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  card: {
    backgroundColor: '#F8F9FC',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: '#666',
  },
  typeText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default FeedScreen;
