import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { HeartIcon } from "react-native-heroicons/solid";
import { theme } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../component/Cast";
import MovieList from "../component/MovieList";
import Loading from "../component/Loading";
import { fetchCredit, fetchDataFromApi, fetchSimilar, fetchTrending } from "../util/request";
import { useRoute } from "@react-navigation/native";
import { image500,imageOG } from "../util/request";

const dim = Dimensions.get("window");
export default function MovieScreen({route}) {
  const data=route?.params
  const Navigation = useNavigation();
  const [isFavourite, setFavourite] = useState(false);
  const [isLoading,setLoading]=useState(false)
  const [similar,setSimilar]=useState()
  const [isCast,setCast]=useState()

  
  useLayoutEffect(()=>{
    CastData()
  },[])

  const CastData=async()=>{
    const Cdata=await fetchCredit(data.id)
    if(Cdata){
      setCast(Cdata?.cast)
    }
    const Smovie=await fetchSimilar(data.id)
    if(Smovie){
      setSimilar(Smovie?.results)
    }
    setLoading(false)
  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "  absolute z-20 w-full flex-row justify-between items-center my-3"
          }
        >
          <TouchableOpacity
            className="rounded-xl p-1 mx-4"
            style={styles.background}
            onPress={() => Navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mr-3"
            onPress={() => setFavourite(!isFavourite)}
          >
            <HeartIcon
              className=""
              size="28"
              strokeWidth={2.5}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading?<Loading/>:
        <View>
        <Image
          source={{uri:imageOG(data?.poster_path)}}
          style={{ height: dim.height * 0.55, width: dim.width }}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.8)",
            "rgba(23, 23, 23, 1)",
          ]}
          style={{ width: dim.width, height: dim.height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>
        }
        
      </View>

      <View style={{ marginTop: -(dim.height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center font-bold text-3xl tracking-wider">
          {data?.title}
        </Text>
        <Text className="text-neutral-400 font-semibold text-center text-base">
         {data.release_date}
        </Text>
      </View>
      <View className='flex-row justify-center mx-4 space-x-2'>
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {data.overview}
        </Text>
      </View>
      <Cast data={isCast}/>
      <MovieList hideSeeAll={true} title='Similar Movies' data={similar}/>
    </ScrollView>
  );
}
