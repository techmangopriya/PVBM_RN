import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../App';
import { LibraryResponseModel, Library } from './LibraryResponseModel';
import { format } from 'date-fns';

const videoIcon = require('../assets/images/ic_video_icon.png');
const audioIcon = require('../assets/images/ic_audio_icon.png');

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'homeScreen'>>();
  const [feedData, setFeedData] = useState<Library[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeedList = async () => {
    setLoading(true);
    try {
      const response = await axios.post<LibraryResponseModel>(
        'https://pvbm.net:3000/api/v1/user/feeds',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200 && response.data.data?.docs) {
        setFeedData(response.data.data.docs);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: response.data.message || 'Something went wrong',
        });
      }
    } catch (error) {
      console.log('API Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedList();
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No Date'; 
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const renderItem = ({ item }: { item: Library }) => (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {item.categoryID?.name ? item.categoryID.name : 'No Category'}
          </Text>
        </View>
        <View style={styles.thumbContainer}>
          <Image
            source={item.thumbnailImage ? { uri: item.thumbnailImage } : videoIcon}
            style={styles.thumbImage}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(item.updatedAt)}</Text>
        <View style={styles.typeContainer}>
          <Image
            source={item.contentType === 'video' ? videoIcon : audioIcon}
            style={styles.icon}
          />
          <Text style={styles.typeText}>{item.contentType?.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff"/>
      ) : (
        <FlatList
          data={feedData}
          keyExtractor={(item) => item.id || item.toString()}
          renderItem={renderItem}
        />
      )}
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
    backgroundColor: 'clear',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    borderColor: '#E2E3E4',
    borderWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    color: '#838795',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 5,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  typeContainer: {
    flexDirection: 'row',
    marginLeft: 10,
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
  thumbImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  thumbContainer: {
    flexDirection: 'row',
  },
});

export default FeedScreen;