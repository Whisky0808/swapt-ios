import { View, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import API_ENDPOINTS from "../../lib/api"

const inventory = () => {
  const [inventoryId, setInventoryId] = useState("");
  const handleInventory = (e) => {
    setInventoryId(e);
  };
  const sumbit = async(e) => {

    try {
      const response = await fetch(API_ENDPOINTS.getInventory,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          "store_id":"2382a225-42dd-11ef-8eb2-3f93c8370d33"
        }),

      });
      const data = await response.json();
      console.log("data",data);

    } catch (error) {
      console.error('Error calling Lambda function:', error);
    }
  };
  return (
    <>
      <ThemedView
        style={styles.titleContainer}
        className="items-center bg-secondary-100"
      >
        <ThemedText type="title" className="top-3 m-3 ">
          Inventory
        </ThemedText>
      </ThemedView>
      <ScrollView className="m-3">
        <FormField
          title={"Inventory Id"}
          value={inventoryId}
          handleChangeText={(e) => handleInventory(e)}
        />
        <CustomButton  title="Search"
            handlePress={(e)=>sumbit(e)}
            containerStyles={"mt-7"}
           />
      </ScrollView>
    </>
  );
};

export default inventory;
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    height: 120,
  },
});
