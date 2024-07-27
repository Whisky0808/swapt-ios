import { View, Text, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link,router } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  //set it as an Object rather than a string seperately

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sumbit = async () => {
    console.log("sign up form is gonna be submitted");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email || !form.password || !form.username) {
    Alert.alert('Error', "Please fill all the fields correctly");
    return;
  } else if (form.password.length < 8) {
    Alert.alert('Error', "Password must be at least 8 characters long");
    return;
  } else if (!emailRegex.test(form.email)) {
    Alert.alert('Error', "Please enter a valid email address");
    return;
  }
    console.log(form)
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email,form.password,form.username)
      
      // set it to the global state, cuz the context and session does need the  info
      
      router.replace('(tabs)');
      return result;
    } catch (error) {
      Alert.alert('Error',error.message);
    }finally{
      setIsSubmitting(false)
    }

    
  };
  return (
    <SafeAreaView className={"w-full h-full"}>
      <ScrollView>
        <View
          className={
            "w-full justify-center align-middle  px-4 my-6"
          }
        >
          <Image
            source={logo}
            resizeMode="contain"
            className="w-[14vh] h-[14vh]"
          ></Image>
          <Text className="text-2xl font-semibold text-black-100 mt-10 font-psemibold">
            Start Your Journey!
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) =>
              setForm({
                ...form,
                username: e,
              })
            }
            otherStyles="mt-3"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-3"
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
            title="Sign up"
            handlePress={sumbit}
            containerStyles={"mt-5"}
            isLoading={isSubmitting}
          />
        <View className="justify-center mt-5 items-center">
          <Text className="font-psemibold text-lg">
            What you are waiting for?
          </Text>
          <Link href={"sign_in"}>
            <Text className="font-pblack text-red-900 text-lg">Sign In</Text>
          </Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
