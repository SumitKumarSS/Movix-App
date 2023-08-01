import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image342, image500 } from "../util/request";

const dim = Dimensions.get("window");
export default function Trending({ data }) {
  const Navigation = useNavigation();
  const pressHandler = (item) => {
    Navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-4">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => pressHandler(item)}
            >
              <Image
                className="rounded-3xl"
                source={{ uri: image500(item?.poster_path) }}
                style={{ height: dim.height * 0.4, width: dim.width * 0.6 }}
              />
            </TouchableWithoutFeedback>
          );
        }}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={dim.width}
        itemWidth={dim.width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
