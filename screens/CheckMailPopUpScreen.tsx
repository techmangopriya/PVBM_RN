import React  from "react";
import {
    Dimensions,
    View,
    Text,
    StyleSheet,
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const CheckMailPopUpScreen: React.FC = () => {
    return (
<View style={styles.container}>
      <Text style={styles.text}>Account Created Successfully!</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
  });
  
export default CheckMailPopUpScreen;