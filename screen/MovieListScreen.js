import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { ChevronLeftIcon } from "react-native-heroicons/outline";
  import { styles } from "../theme/theme";
  import { useNavigation } from "@react-navigation/native";
  import { fetchTopRated,fetchUpcoming} from "../util/request";
  import { image500,imageOG } from "../util/request";
  
  const dim = Dimensions.get("window");
  export default function MovieListScreen({route}) {
    const title=route.params
    const Navigation = useNavigation();
    const [isMovie,setMovie]=useState([1,2,3,4,5])
  
    
    useEffect(()=>{
        dataApi()
    },[])
    const dataApi=async()=>{
        const dataUpcoming=await fetchUpcoming()
        const dataTopRated=await fetchTopRated()
        if(title==='Upcoming Movies'){
            setMovie(dataUpcoming?.results)
        }else{
            setMovie(dataTopRated?.results)
        }
    }
    return (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        <View className="w-full">
          <SafeAreaView
            className={
              "z-20 w-full flex-row justify-between items-center my-3"
            }
          >
            <TouchableOpacity
              className="rounded-xl p-1 mx-4"
              style={styles.background}
              onPress={() => Navigation.goBack()}
            >
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
          </SafeAreaView>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            <Text className="text-white font-bold text-xl text-center mb-5 border-b-2 border-b-yellow-300 pb-3">{title}</Text>
            <View className='flex-row justify-between flex-wrap'>
              {isMovie?.map((item, index) => {
                return (
                    <TouchableWithoutFeedback key={index} onPress={()=>Navigation.push('Movie',item)}>
                        <View className='space-y-2 mb-4'>
    <Image source={{uri:(imageOG(item?.poster_path))}}
                  style={{width:dim.width*0.44,height:dim.height*0.3}}
                  className='rounded-3xl mb-1'
                  />
                  <Text className='text-neutral-300 ml-2 mb-2 text-center'>{item?.title?.length>22?item?.title.slice(0,22)+'...':item?.title}</Text>
                  </View>
                    </TouchableWithoutFeedback>
                  
                );
              })}
            </View>
          </ScrollView>
          </View>
        
      </ScrollView>
    );
  }
  