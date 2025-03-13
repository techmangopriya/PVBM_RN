import React, {useState, version, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {constantImage} from '../utils/images';
import {constantString} from '../utils/constantString';
import {apiConstants} from '../utils/appConstants';
import axios from 'axios';
import {RootStackNavigationProp} from '../App';
import {
  CategoryListResponseModel,CategoryList,LibraryCategory,
} from '../model/CategoryListResponseModel';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Library } from '../model/LibraryResponseModel';

const categories = ['Categories', 'Videos', 'Audios', 'Documents'];

const libraryItems = [
  {
    id: '1',
    title: 'Asminparatman With Mahamantra',
    image: constantImage.audioIcon,
    audioCount: 0,
    videoCount: 1,
    documentCount: 0,
  },
  {
    id: '2',
    title: 'Bgvtm-Panchageetam',
    image: constantImage.audioIcon,
    audioCount: 0,
    videoCount: 5,
    documentCount: 4,
  },
  {
    id: '3',
    title: 'Bgvtm-Panchastuthi',
    image: constantImage.audioIcon,
    audioCount: 0,
    videoCount: 11,
    documentCount: 7,
  },
  {
    id: '4',
    title: 'Bgvtm-Sanskrit-Text',
    image: constantImage.audioIcon,
    audioCount: 0,
    videoCount: 0,
    documentCount: 13,
  },
];

const {width} = Dimensions.get('screen');

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Categories');
  const navigation = useNavigation<RootStackNavigationProp<'homeScreen'>>();
  const [feedData, setFeedData] = useState<LibraryCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [page, setPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const moveToAudioDetailPage = (item: any) => {
    if (selectedCategory === 'Audios') {
    navigation.navigate('audioDetail', item);
    } else if (selectedCategory === 'Videos') {
      navigation.navigate('videoDetail', item);
    }
  };

  const fetchFeedList = async (isLoadMore = false, isRefresh = false) => {
    if (isLoadMore && !hasMoreData) return;
  
    if (isRefresh) {
      setPage(0);           
      setHasMoreData(true); 
      setFeedData([]);     
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post<CategoryListResponseModel>(
        apiConstants.categoryList,
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
      console.log(constantString.apiError, error);
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
  return (
    <View style={styles.container}>
      <Text style={styles.libraryText}>{constantString.library}</Text>

      <View style={styles.segmentContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.segmentButton,
              selectedCategory === item && styles.selectedSegment,
            ]}
            onPress={() => setSelectedCategory(item)}>
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

      <FlatList
        data={libraryItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => moveToAudioDetailPage(item)}>
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.mediaRow}>
                <View style={styles.mediaItem}>
                  <Image
                    source={constantImage.catAudioIcon}
                    style={styles.mediaIcon}
                  />
                  <Text style={styles.mediaText}>{item.audioCount}</Text>
                </View>
                <View style={styles.mediaItem}>
                  <Image
                    source={constantImage.catVideoIcon}
                    style={styles.mediaIcon}
                  />
                  <Text style={styles.mediaText}>{item.videoCount}</Text>
                </View>
                <View style={styles.mediaItem}>
                  <Image
                    source={constantImage.docIcon}
                    style={styles.mediaIcon}
                  />
                  <Text style={styles.mediaText}>{item.documentCount}</Text>
                </View>
              </View>
            </View>
            <Image source={constantImage.rightArrow} style={styles.arrowIcon} />
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  libraryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectedSegment: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  mediaIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  mediaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: 'gray',
  },
});
export default HomeScreen;