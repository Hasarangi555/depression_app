import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./noData.style";
import NoDataImage from "../../../assets/noData.jpg";

const NoData = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.headText}>No Data</Text> */}
      <Image style={styles.contextImage} source={NoDataImage} />
    </View>
  );
};

export default NoData;
