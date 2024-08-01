import { View, Text, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const ItemCard = (variants) => {
  console.log("variants", variants.item);
  const variants_Set = variants.item;
  return (
    <View>
      {variants_Set.map((item, index) => {
        let imageUrl = "";
        console.log(item);
        try {
          imageUrl = item.image;
          console.log("fff", imageUrl);
        } catch (error) {
          console.error("Error parsing image URL:", error);
        }
        return (
          <View style={styles.container} key={index}>
            <View style={styles.textArea}>
              <Text>Stock:{item.inventory}</Text>
              <Text>Profit:{item.price}</Text>
              <Text>Catagory:{item.tags}</Text>
            </View>
            <Image
              source={{ uri: imageUrl }}
              style={styles.img}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'space-between',
  },
  textArea: {
    height: "100%",
  },
  img: {
    width: 60,
    height: 60,
  },
});
