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
import DropdownComponent from "./DropdownComponent";
import API_ENDPOINTS from "../lib/api";

const ItemCard = ({ variants, id }) => {
  const variants_Set = variants;
  const itemId = id;
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalTag,setGeneralTag] = useState({});

  const searchTag = async () => {
    console.log("id", itemId);
    try {
      const res = await fetch(API_ENDPOINTS.getGeneralTag, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
        }),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const res_data = data.body;//get a string, but this string is a object
      const obj = JSON.parse(res_data);
      const obj_1 = JSON.parse(obj.general_tag[0]);
      
      setGeneralTag(obj_1)
      setModalVisible(true)
      // console.log(generalTag)


    } catch (error) {
      console.error("Error calling Lambda function:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slider"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              
            {Object.keys(generalTag).length > 0 ? (
                Object.keys(generalTag).map((key) => (
                  <DropdownComponent key={key} keyName={key} values={generalTag[key]} />
                ))
              ) : (
                <Text>Loading...</Text>
              )}


              {variants_Set.map((item, index) => {
                let imageUrl = "";

                try {
                  imageUrl = item.image;
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
          onPress={() => searchTag()}
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
    width: "90%",
    height: "70%",
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
    width: 200,
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
