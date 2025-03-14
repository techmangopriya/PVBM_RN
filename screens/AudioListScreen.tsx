import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Library } from '../model/LibraryResponseModel';
import { constantImage } from '../utils/images';
import { styles } from '../model/styles';

interface AudioListProps {
  item: Library;
  onPress: () => void;
}

const AudioList: React.FC<AudioListProps> = ({ item, onPress }) => {
  useEffect(() => {
  }, [item]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: item.categoryId?.icon }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTitle}>{item.categoryId?.name}</Text>
          <View style={styles.mediaRow}>
            <View style={styles.mediaItem}>
              <Image source={constantImage.audioIcon} style={styles.mediaIcon} />
              <Text style={styles.videoDateText}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <Image source={constantImage.rightArrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default AudioList;
