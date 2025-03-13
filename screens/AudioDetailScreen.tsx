import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound  from 'react-native-sound';
import { format, formatDate } from 'date-fns';
import {RouteProp, useRoute} from '@react-navigation/native';
import {LibraryObj} from '../model/LibraryResponseModel';
import { constantImage } from '../utils/images';


const { width, height } = Dimensions.get('screen');

const AudioDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: LibraryObj }, 'params'>>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  

  const playerItem = route.params.item;

  useEffect(() => {
    console.log('Loading audio from URL:', playerItem.url);
  
    const audio = new Sound(playerItem.url, undefined, (error) => {
      if (error) {
        console.log('Failed to load the sound:', error);
        setIsLoading(false);
        return;
      }
  
      const audioDuration = audio.getDuration();
      if (audioDuration <= 0) {
        console.log('Audio duration is invalid');
        setIsLoading(false);
        return;
      }
  
      console.log('Audio loaded successfully, duration:', audioDuration);
      setDuration(audioDuration);
      setSound(audio);
      setIsLoading(false);
    });
  
    return () => {
      audio.release();
    };
  }, [playerItem.url]);
  
  

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        sound.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
          setSliderValue(seconds);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  const togglePlayPause = () => {
    if (sound) {
      if (isPlaying) {
        console.log('Playback started');
        sound.pause();
      } else {
        sound.play((success) => {
          if (success) {
            console.log('Playback finished');
          } else {
            console.log('Playback failed');
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderValueChange = (value: number): void => {
    setSliderValue(value);
    if (sound) {
      sound.setCurrentTime(value);
    }
  };

  const rewind = () => {
    if (sound) {
      sound.getCurrentTime((currentTime) => {
        sound.setCurrentTime(Math.max(0, currentTime - 10));
      });
    }
  };

  const forward = () => {
    if (sound) {
      sound.getCurrentTime((currentTime) => {
        sound.setCurrentTime(Math.min(duration, currentTime + 10));
      });
    }
  };

  const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'No Date';
      return format(new Date(dateString), 'MMM d, yyyy');
    };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7559CC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Image
          source={playerItem.categoryId?.icon ? { uri: playerItem.categoryId.icon } : (constantImage.logo) }
          style={styles.audioDetailImage}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.dateText}>{formatDate(playerItem.updatedAt)}</Text>
        <Text style={styles.titleText}>{playerItem.title}</Text>
        <Text style={styles.categoryText}>{playerItem.categoryId?.name}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          minimumTrackTintColor="#7559CC"
          maximumTrackTintColor="#E2E3E4"
          thumbTintColor="#7559CC"
        />
      </View>

      <View style={styles.controlsContainer}>
        <Text style={styles.sliderLeftText}>{formatTime(currentTime)}</Text>
        <TouchableOpacity onPress={rewind}>
          <Image source={(constantImage.rewindIcon)}  style={styles.controlButtons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Image
            source={isPlaying ? (constantImage.pauseIcon) : (constantImage.playIcon)}
            style={styles.controlButtons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={forward}>
          <Image source={(constantImage.forwardIcon) } style={styles.controlButtons} />
        </TouchableOpacity>
        <Text style={styles.sliderRightText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioDetailImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    top: 5,
    textAlign: 'center',
  },
  categoryText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'gray',
    top: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
  sliderContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 50,
    top: 200,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 10,
    top: 200,
  },
  sliderLeftText: {
    fontSize: 16,
    color: 'black',
  },
  sliderRightText: {
    fontSize: 16,
    color: 'black',
  },
  controlButtons: {
    width: 40,
    height: 40,
  },
});

export default AudioDetailScreen;