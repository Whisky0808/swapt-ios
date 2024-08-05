import {
  View,
  Text,
  Image,
  Alert,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import DropdownComponent from "./DropdownComponent"

const ItemCard = (variants) => {
  console.log("variants", variants.item);
  const variants_Set = variants.item;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
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
                  <DropdownComponent></DropdownComponent>
                  // <View style={styles.container} key={index}>
                    
                  //   <View style={styles.textArea}>
                  //     <Text>Stock:{item.inventory}</Text>
                  //     <Text>Profit:{item.price}</Text>
                  //     <Text>Catagory:{item.tags}</Text>
                  //   </View>
                  //   <Image
                  //     source={{ uri: imageUrl }}
                  //     style={styles.img}
                  //     resizeMode="contain"
                  //   />
                  // </View>
                );
              })}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
          
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Click For More Details</Text>
        </Pressable>
      </View>
      {/* {variants_Set.map((item, index) => {
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
      })} */}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width:"90%",
    height:"70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width:200,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  //lllllllll
  container: {
    height: 100,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  textArea: {
    height: "100%",
  },
  img: {
    width: 60,
    height: 60,
  },
});
