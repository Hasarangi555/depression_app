import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { load } from "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs-react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [botResponseIndex, setBotResponseIndex] = useState(0);
  const [depressionLevel, setDepressionLevel] = useState(null);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [useBotResponses1, setUseBotResponses1] = useState(true);

  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("C:\Users\DELL\Desktop\Final Project Finish Hasarangi\deppression\deppression.ipynb");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const generateDepressionLevel = async (userMessage) => {
    const prediction = await model.predict(tf.tensor([userMessage]));
    const accuracy = prediction.dataSync()[0];
    return accuracy.toFixed(2);
  };
  
  const onSend = async () => {
    if (userMessageCount >= 8) {
      setChatEnabled(false);
      return;
    }

    const userMessageText = inputText;

    const userMessage = {
      _id: messages.length + 1,
      text: userMessageText,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "User",
      },
    };

    setUserMessageCount((prevCount) => prevCount + 1);

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [userMessage])
    );

    setInputText("");

    if (model && userMessageCount === 3) {
      const userMessageForPrediction = messages
        .filter((message) => message.user._id === 1)
        .map((message) => message.text)
        .join(" ");

      const accuracy = await generateDepressionLevel(userMessageForPrediction);
      setDepressionLevel(accuracy);
    }

    const responseArray = useBotResponses1
      ? botResponses1[userMessageCount]
      : botResponses2[userMessageCount];

    const randomResponse =
      responseArray[Math.floor(Math.random() * responseArray.length)];
    const botMessage = {
      _id: messages.length + 2,
      text: randomResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot",
      },
    };

    setBotResponseIndex((prevIndex) =>
      prevIndex < (useBotResponses1 ? botResponses1 : botResponses2).length - 1
        ? prevIndex + 1
        : 0
    );

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [botMessage])
    );
  };

  useEffect(() => {
    if (
      botResponseIndex ===
      (useBotResponses1 ? botResponses1 : botResponses2).length - 1
    ) {
      const randomDepressionLevel = generateDepressionLevel();
      setDepressionLevel(randomDepressionLevel);
    }
  }, [botResponseIndex, useBotResponses1]);

  const clearChat = () => {
    setMessages([]);
    setUserMessageCount(0);
    setDepressionLevel(null);
    setChatEnabled(true);
    setUseBotResponses1((prevState) => {
      if (!prevState) {
        setDepressionLevel(generateDepressionLevel());
      }
      return !prevState;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={chatEnabled ? onSend : null}
        user={{
          _id: 1,
        }}
        text={inputText}
        onInputTextChanged={(text) => setInputText(text)}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
      {depressionLevel && (
        <View style={styles.depressionLevelContainer}>
          <Text style={styles.depressionLevelText}>
            Your Depression Level: {depressionLevel}
          </Text>
        </View>
      )}
      <Button title="Clear" onPress={clearChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  depressionLevelContainer: {
    padding: 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
  },
  depressionLevelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});

export default ChatScreen;
