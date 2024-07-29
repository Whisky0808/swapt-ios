import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { logOut, signIn } from "../../lib/appwrite";
const SignIn = () => {
  //set it as an Object rather than a string seperately

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sumbit = async () => {
    console.log("form is gonna be submitted", form);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email || !form.password ) {
      Alert.alert("Error", "Please fill all the fields correctly");
      return;
    } else if (form.password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    } else if (!emailRegex.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    try {
       const res = await signIn(form.email,form.password);
       console.log(res)
       router.replace('(tabs)')
    } catch (error) {
      Alert.alert('Error',error.message);
    }
  };
  return (
    <SafeAreaView className={"w-full h-full"}>
      <ScrollView>
        <View
          className={
            "w-full justify-center align-middle min-h-[85vh] px-4 my-6"
          }
        >
          <Image
            source={logo}
            resizeMode="contain"
            className="w-[14vh] h-[14vh]"
          ></Image>
          <Text className="text-2xl font-semibold text-black-100 mt-10 font-psemibold">
            Log in to Swapt
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign in"
            handlePress={sumbit}
            containerStyles={"mt-7"}
            isLoading={isSubmitting}
          />
          <View className="justify-center mt-5 items-center">
            <Text className="font-psemibold text-lg">
              You don't have an account?
            </Text>
            <Link href={"sign_up"}>
              <Text className="font-pblack text-red-900 text-lg">Sign Up</Text>
            </Link>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
