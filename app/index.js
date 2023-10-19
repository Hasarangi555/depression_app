import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Stack } from "expo-router";
import { View, Text, ImageBackground, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const BackgroundImage = require("../assets/images/bgImage.jpg");

const headerTitleStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: COLORS.primary,
  justifyContent: "center",
  backgroundColor: COLORS.gray2,
};

const Home = () => {

  const navigation = useNavigation(); // Initialize navigation

  const handleChatBotPress = () => {
    navigation.navigate('talkspace',); // Navigate to the ChatBot screen
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: "Depression Prediction App",
          headerTitleStyle: headerTitleStyle,
        }}
      ></Stack.Screen>
      <Button title="I want to check my depression level 😊" onPress={handleChatBotPress} />
      <Button title="Please Enter Your Age and Gender for the First Statement and only share your Feelings.."/>
      {/* <ChatBot /> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedFileText: {
    fontSize: 16,
    color: COLORS.yourTextColor,
    marginBottom: 20,
  },
});

export default Home;
