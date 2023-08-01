import { View, Text, ScrollView,Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../util/request";

export default function Cast({data}) {
  const Navigation=useNavigation()
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data &&
          data?.map((person, index) => {
            return (
              <TouchableOpacity key={index} className='mr-4 items-center' onPress={()=>Navigation.push('Person',person)}>
                <View className='overflow-hidden rounded-full h-20 w-20 border border-neutral-600 items-center ml-7'>
                <Image className='h-24 w-20' source={{uri:(image185(person?.profile_path))}}/>
                </View>
               
                <Text className="text-white text-xs mt-1 ml-7">
                  {person?.character.length > 15
                    ? person?.character.slice(0, 15) + "..."
                    :person?.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1 ml-7">
                  {person?.name.length > 15
                    ? person?.name.slice(0, 15) + "..."
                    : person?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
