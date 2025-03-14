import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {constantString} from '../utils/constantString';
import {apiConstants} from '../utils/appConstants';
import axios from 'axios';
import {
  LibraryCategory,
  CategoryListResponseModel,
} from '../model/CategoryListResponseModel';
import {Library, LibraryResponseModel} from '../model/LibraryResponseModel';
import Toast from 'react-native-toast-message';
import CategoryList from '../screens/CategoryListScreen';
import AudioList from '../screens/AudioListScreen';
import VideoList from '../screens/VideoListScreen';
import DocumentList from '../screens/DocumentListScreen';
import {styles} from '../model/styles';

const categories = ['Categories', 'Videos', 'Audios', 'Documents'] as const;
type Category = (typeof categories)[number];

const {width} = Dimensions.get('screen');

const HomeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Categories');
  
  const [categoryFeedData, setCategoryFeedData] = useState<LibraryCategory[]>([]);
  const [libraryFeedData, setLibraryFeedData] = useState<Library[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const data = selectedCategory === 'Categories' ? categoryFeedData : libraryFeedData;

  const fetchFeedList = async (isLoadMore = false, isRefresh = false) => {
    if (isLoadMore && !hasMoreData) return;
    if (isRefresh) {
      setPage(0);
      setHasMoreData(true);
      if (selectedCategory === 'Categories') {
        setCategoryFeedData([]);
      } else {
        setLibraryFeedData([]);
      }
    }
  
    setLoading(true);
  
    const currentFeedData =
      selectedCategory === 'Categories' ? categoryFeedData : libraryFeedData;
    const version = currentFeedData.length > 0 ? currentFeedData[0].id : 0;
  
    try {
      if (selectedCategory === 'Categories') {
        const response = await axios.post<CategoryListResponseModel>(
          apiConstants.categoryList,
          {
            page: isRefresh ? 0 : page,
            size: 50,
            category: selectedCategory, 
            version: version,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('API Response (Categories):', response.data);
        if (response.status === 200 && response.data.data?.docs) {
          const newDocs = response.data.data.docs;
          setCategoryFeedData(prev =>
            isLoadMore ? [...prev, ...newDocs] : newDocs
          );
          setPage(prevPage => prevPage + 1);
          if (newDocs.length < 10) setHasMoreData(false);
        } else {
          Toast.show({
            type: constantString.error,
            text1: constantString.failed,
            text2: response.data.message || constantString.someThingWentWrong,
          });
        }
      } else {
        const response = await axios.post<LibraryResponseModel>(
          apiConstants.homeLibraryList,
          {
            page: isRefresh ? 0 : page,
            size: 50,
            category: selectedCategory, 
            version: version,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('API Response (Library):', response.data);
        if (response.status === 200 && response.data.data?.docs) {
          const newDocs = response.data.data.docs;
          setLibraryFeedData(prev =>
            isLoadMore ? [...prev, ...newDocs] : newDocs
          );
          setPage(prevPage => prevPage + 1);
          if (newDocs.length < 10) setHasMoreData(false);
        } else {
          Toast.show({
            type: constantString.error,
            text1: constantString.failed,
            text2: response.data.message || constantString.someThingWentWrong,
          });
        }
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
    setPage(0);
    setHasMoreData(true);
    if (selectedCategory === 'Categories') {
      setCategoryFeedData([]);
    } else {
      setLibraryFeedData([]);
    }
    fetchFeedList();
  }, [selectedCategory]);

  const handleLoadMore = () => {
    if (!loading && hasMoreData) {
      fetchFeedList(true);
    }
  };

  const renderItem = ({item}: {item: LibraryCategory | Library}) => {
    switch (selectedCategory) {
      case 'Categories':
        return (
          <CategoryList item={item as LibraryCategory} onPress={() => {}} />
        );
      case 'Audios':
        return <AudioList item={item as Library} onPress={() => {}} />;
      case 'Videos':
        return <VideoList item={item as Library} onPress={() => {}} />;
      case 'Documents':
        return <DocumentList item={item as Library} onPress={() => {}} />;
      default:
        return null;
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
        data={data}
        keyExtractor={(item, index) =>
          item.id ? String(item.id) : `fallback-id-${index}`
        }
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={() => fetchFeedList(false, true)}
      />
    </View>
  );
};

export default HomeScreen;
