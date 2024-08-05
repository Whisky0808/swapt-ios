import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Image , ImageSourcePropType,View} from 'react-native';



export default ListItem = ( {children, title, img} )=> {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const imageSource = { uri: img };
  
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        
        <View >
          <Image source={imageSource} style={styles.img} resizeMode='contain'/>
        </View>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    // margin:5,

  },
  img:{
    width:100,
    height:100,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  content: {
    // marginTop: 10,
    marginLeft: 24,
  },
});