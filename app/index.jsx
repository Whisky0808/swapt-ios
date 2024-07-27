import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Link} from 'expo-router'
import CustomButton from '../components/CustomButton'
import { Redirect, router } from "expo-router";

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


export default function App() {
 
  return (
    
    <View className="flex-1 items-center justify-center bg-white p-3">
      <Text className="text-3xl font-pblack">Welcome to Swapt app!</Text>
      <Text className='text-2xl font-pbold'>Enjoy Your Coupons Here</Text>
      <StatusBar style="auto" />

      <CustomButton
        title="Continue to Login"
        handlePress={()=>router.push('./sign_in')}
        containerStyles="w-full mt-7"
      ></CustomButton>
      
      
    </View>
    
  )
}

