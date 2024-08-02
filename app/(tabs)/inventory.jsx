import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import API_ENDPOINTS from "../../lib/api";
import { Collapsible } from "@/components/Collapsible";
import ItemCard from "../../components/ItemCard"

const inventory = () => {
  const [inventoryId, setInventoryId] = useState("");
  const [inventoryData, setInventoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [display,setDisplay] = useState(false)
  const handleInventory = (e) => {
    setInventoryId(e);
  };
  const search = async () => {
    
    try {
      const response = await fetch(API_ENDPOINTS.getInventory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id:inventoryId,
          // store_id: "2382a225-42dd-11ef-8eb2-3f93c8370d33"
          // store_id: "3fb7da68-43ac-11ef-8e10-35bd6906fbae"
        }),
      });
      const status = response.status;
      const data = await response.json();
    

      if (data && data.length > 0 && status != 400) {
        setInventoryData(data);
        setDisplay(true)
      } else {
        setDisplay(false)
        console.log("No data received from API");
      }
    } catch (error) {
      console.error("Error calling Lambda function:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //to update the state, the setData function only set the data, but haven't upload it exactly
  useEffect(() => {
    console.log("Updated inventoryData:", inventoryData);
  }, [inventoryData]);
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
        <CustomButton
          title="Search"
          handlePress={search}
          containerStyles={"mt-7"}
          isLoading={isLoading}
        />
        {isLoading ? (
          <Text>Loading...</Text>
        ) : display ? (
          inventoryData.map((item, index) => {
            let imageUrl = "";
            try {
              const imageArray = JSON.parse(item.image);
              imageUrl = imageArray[0];
              
            } catch (error) {
              console.error("Error parsing image URL:", error);
            }
            return(
              <Collapsible key={index} title={item.item_name} img={imageUrl}>
              {<ItemCard item={item.variants}></ItemCard>}
            </Collapsible>

            )
            
          })
        ) : (
          <Text>No inventory data available</Text>
        )}
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
