import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {format} from 'date-fns';
import {LibraryObj} from '../model/LibraryResponseModel';
import PlayerItem from '../model/CategoryListResponseModel';

const {width, height} = Dimensions.get('screen');

const VideoDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<{params: LibraryObj}, 'params'>>();
  const [isLoading, setIsLoading] = useState(true);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const playerItem = new PlayerItem(route.params.item);

  const getYoutubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  useEffect(() => {
    const videoId = getYoutubeVideoId(playerItem.url);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&modestbranding=1`;
      setEmbedUrl(embedUrl);
    }
  }, [playerItem.url]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'No Date';
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#0000ff"
          />
        )}
        {embedUrl && (
          <WebView
            style={styles.webView}
            source={{uri: embedUrl}}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            onLoadEnd={() => setIsLoading(false)}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.dateText}>
          {formatDate(playerItem.dateCreated)}
        </Text>
        <Text style={styles.titleText}>{playerItem.title}</Text>
        <Text style={styles.descriptionText}>{playerItem.categoryName}</Text>
        <Text style={styles.subDescriptionText}>{playerItem.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'clear',
    width: width,
  },
  webView: {
    flex: 1,
    width: width,
    height: 300,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    top: 25,
    marginLeft: 16,
  },
  dateText: {
    fontSize: 14,
    color: 'black',
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 20,
    color: '#766CC',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: 'gray',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginTop: 10,
  },
  subDescriptionText: {
    fontSize: 16,
    color: 'gray',
    alignSelf: 'flex-start',
    fontWeight: 'regular',
    marginTop: 10,
  },
});

export default VideoDetailScreen;