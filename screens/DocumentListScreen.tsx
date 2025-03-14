import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Library } from '../model/LibraryResponseModel';
import { constantImage } from '../utils/images';
import { styles } from '../model/styles'
import { format } from 'date-fns';

interface DocumentListProps {
  item: Library;
  onPress: () => void;
}
const formatDate = (dateString: string | undefined) => {
      if (!dateString) return 'No Date';
      return format(new Date(dateString), 'MMM d, yyyy');
    };

const DocumentList: React.FC<DocumentListProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: item.categoryId?.icon }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.mediaRow}>
            <View style={styles.mediaItem}>
              <Text style={styles.videoDateText}>{formatDate(item.updatedAt)}</Text>
            </View>
          </View>
        </View>
        <Image source={constantImage.rightArrow} style={styles.arrowIcon} />
      </View>
    </TouchableOpacity>
  );
};

export default DocumentList;