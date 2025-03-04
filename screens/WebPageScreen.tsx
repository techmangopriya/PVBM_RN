import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

const WebPageScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { url, title } = route.params as { url: string; title?: string };

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ title });
    }
  }, [navigation, title]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      </TouchableOpacity>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
};

export default WebPageScreen;