import React from "react";
import { Dimensions, View, StyleSheet } from 'react-native'
import { Text } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('screen')

const HomeScreen: React.FC = () => {
return (
<View style={styles.container}>
  <Text style={styles.libraryTextCont}>Library</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
    width: width,
    height: height,
    backgroundColor: 'white',
},
libraryTextCont: {
    textAlign: 'left',
    color: 'black',
    fontSize: 34,
    fontWeight: 'bold'
}
});

export default HomeScreen;