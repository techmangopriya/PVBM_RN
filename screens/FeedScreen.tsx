import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator , RefreshControl } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../App';
import { LibraryResponseModel, Library } from './LibraryResponseModel';
import { format } from 'date-fns';
import { constantImage } from '../utils/images';
import { constantString } from '../utils/constantString';
import { apiConstants } from '../utils/appConstants';

const videoIcon = constantImage.videoIcon;
const audioIcon = constantImage.audioIcon;
const docIcon = constantImage.docIcon;


const FeedScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'homeScreen'>>();
  const [feedData, setFeedData] = useState<Library[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeedList = async (isLoadMore = false, isRefresh = false) => {
    if (isLoadMore && !hasMoreData) return;
  
    if (isRefresh) {
      setPage(0);           
      setHasMoreData(true); 
      setFeedData([]);     
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post<LibraryResponseModel>(
        apiConstants.feeds,
        {
          page: isRefresh ? 0 : page,
          size: 50,
          version: feedData.length > 0 ? feedData[0].id : 0,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      if (response.status === 200 && response.data.data?.docs) {
        const newDocs = response.data.data.docs;
  
        if (newDocs.length > 0) {
          setFeedData(isLoadMore ? [...feedData, ...newDocs] : newDocs);
          setPage((prevPage) => prevPage + 1);
        }
  
        if (newDocs.length < 10) {
          setHasMoreData(false);
        }
      } else {
        Toast.show({
          type: constantString.error,
          text1: constantString.failed,
          text2: response.data.message || constantString.someThingWentWrong,
        });
      }
    } catch (error) {
      console.log('API Error:', error);
      Toast.show({
        type: constantString.error,
        text1: constantString.errorCaps,
        text2: constantString.someThingWentWrong,
      });
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };
  
  useEffect(() => {
    fetchFeedList();
  }, []);
  
  const handleLoadMore = () => {
    if (!loading && hasMoreData) {
      fetchFeedList(true);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No Date'; 
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeedList(false, true);
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    alignItems: 'flex-start',
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
    borderRadius: 10,
    resizeMode: 'cover',
    height: 120,
    width: 120,
  },
  thumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default FeedScreen;