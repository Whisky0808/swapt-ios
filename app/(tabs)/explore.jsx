import Ionicons from "@expo/vector-icons/Ionicons";

import { StyleSheet, Image, Platform } from "react-native";
import { useState, useContext } from "react";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import {useAvater} from '../../components/AvatarProvider'


export default function TabTwoScreen() {



  const {uploadAvatar} = useAvater();

  const  selectImage = async () => {
    console.log("pick a picture")
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      uploadAvatar(result.assets[0].uri);
    }

  };
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#d8d6fd", dark: "#1D3D47" }}
      
    >
      <CustomButton title={"Change The Badge"} handlePress={selectImage} />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ExternalLink href="https://swaptqr.com/">
        <ThemedText type="link">Learn more about Swapt</ThemedText>
      </ExternalLink>

      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{" "}
          <ThemedText type="defaultSemiBold">
            components/HelloWave.tsx
          </ThemedText>{" "}
          component uses the powerful{" "}
          <ThemedText type="defaultSemiBold">
            react-native-reanimated
          </ThemedText>{" "}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The{" "}
              <ThemedText type="defaultSemiBold">
                components/ParallaxScrollView.tsx
              </ThemedText>{" "}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  Logo: {
    height: 140,
    width: 160,
    bottom: 10,
    left: 10,
    position: 'absolute',
  },
});
