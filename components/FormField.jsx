import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";
import eyeIcon from "../assets/icons/eye.png";
import eyeIconHide from "../assets/icons/eye-hide.png";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text>{title}</Text>
      <View
        className={
          "w-full h-16 px-4 border-2 border-black rounded-2xl items-center flex-row focus:border-secondary-300"
            
        }
      >
        <TextInput
          className={"flex-1 text-black font-psemibold"}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="black"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? eyeIcon : eyeIconHide}
              className="w-7 h-7"
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
