import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LibraryCategory } from '../model/CategoryListResponseModel';
import { constantImage } from '../utils/images';
import { styles } from '../model/styles';

interface CategoryListProps {
  item: LibraryCategory;
  onPress: () => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ item, onPress }) => {

  const countFor = (values: string[] | null | undefined): string => {
    return values ? String(values.length) : "0";
  };
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: item.icon }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.mediaRow}>
            <View style={styles.mediaItem}>
              <Image source={constantImage.catAudioIcon} style={styles.mediaIcon} />
              <Text style={styles.mediaText}>{countFor(item.audioPosts)}</Text>
            </View>
            <View style={styles.mediaItem}>
              <Image source={constantImage.catVideoIcon} style={styles.mediaIcon} />
              <Text style={styles.mediaText}>{countFor(item.videoPosts)}</Text>
            </View>
            <View style={styles.mediaItem}>
              <Image source={constantImage.docIcon} style={styles.mediaIcon} />
              <Text style={styles.mediaText}>{countFor(item.docPosts)}</Text>
            </View>
          </View>
        </View>
        <Image source={constantImage.rightArrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryList;