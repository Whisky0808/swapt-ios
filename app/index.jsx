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


      <View className="flex-1  justify-center bg-white p-3">
      <View className="mb-6">
      <Text className="text-3xl font-pblack mb-3">Welcome to Swapt app!</Text>
      <Text className='text-xs font-pbold'>Enjoy Your Coupons Here!</Text>
      </View>
      <StatusBar style="auto" />

      <CustomButton
        title="Continue to Login"
        // handlePress={()=>router.push('./(tabs)')}
        handlePress={()=>router.push('./sign_in')}
        containerStyles="w-full mt-7"
      ></CustomButton>
      
      
    </View>

  
    
    
    
  )
}

