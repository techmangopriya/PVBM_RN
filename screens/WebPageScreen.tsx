import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

const WebPageScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url } = route.params as { url: string };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity >
      </TouchableOpacity>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
};

export default WebPageScreen;
