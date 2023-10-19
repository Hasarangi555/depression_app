import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./popularjobcard.style";
import { checkImageUrl } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{ uri: checkImageUrl(item.employer_logo) ? item.employer_logo : "https://t3.ftcdn.net/jpg/05/56/23/24/360_F_556232429_rEzqcNG3dwJlhlxlShtfPYOJ4BcZBSlW.jpg"}}
          resizeMode="contain"
          style={styles.logoImage}
        ></Image>
      </TouchableOpacity>
      <Text style={styles.companyName(selectedJob, item)} numberOfLines={1}>{item.employer_name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)}>{item.job_title}</Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
    // <View>
    //   <Text>pp job</Text>
    // </View>
  );
};

export default PopularJobCard;
