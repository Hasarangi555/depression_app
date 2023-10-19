import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "../../../constants";
import styles from "./company.style";
import { checkImageUrl } from "../../../utils";

const Company = ({ companyLogo, companyName, jobTitle, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageUrl(companyLogo)
              ? companyLogo
              : "https://t3.ftcdn.net/jpg/05/56/23/24/360_F_556232429_rEzqcNG3dwJlhlxlShtfPYOJ4BcZBSlW.jpg",
          }}
          style={styles.logoImage}
        ></Image>
      </View>
      <Text style={styles.jobTitleBox}>{jobTitle}</Text>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Image
          source={icons.location}
          resizeMode="contain"
          style={styles.locationImage}
        />
        <Text style={styles.locationName}>{location}</Text>
      </View>
    </View>
  );
};

export default Company;
