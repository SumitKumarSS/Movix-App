import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/theme";
import MovieList from "../component/MovieList";
import Loading from "../component/Loading";
import { useNavigation } from "@react-navigation/native";
import { fetchPerson, fetchPmovies } from "../util/request";
import { image342 } from "../util/request";

const dim = Dimensions.get("window");
export default function PersonScreen({route}) {
  const [isMovies,setMovies]=useState()
  const [isFavourite, setFavourite] = useState();
  const [isLoading,setLoading]=useState(false)
  const Navigation=useNavigation()
  const [isData,setData]=useState()
  const id=route?.params?.id
  useEffect(()=>{
    fetchHandler()
  },[])

  const fetchHandler=async()=>{
    const data =await fetchPerson(id)
    if(data)
    {
      setData(data)
    }
    const personMovie=await fetchPmovies(id)
    if(personMovie){
      setMovies(personMovie?.cast)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <SafeAreaView
        className={" z-20 w-full flex-row justify-between items-center my-5"}
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
            color={isFavourite ? "red" : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading?<Loading/>:
      <View>
      <View
        className="flex-row justify-center"
      >
        <View style={{
          shadowColor: '#C8BF0EFD',
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 5},
          shadowRadius: 40,
          elevation: 50,
        }}className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
          <Image
            style={{ height: dim.height * 0.43, width: dim.width * 0.74 }}
            source={{uri: image342(isData?.profile_path)}}

          />
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-white text-3xl text-center font-bold">
          {isData?.name}
        </Text>
        <Text className="text-neutral-500  text-center text-base">
          {isData?.place_of_birth}
        </Text>
      </View>
      <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold ">Gender</Text>
          <Text className="text-neutral-300 text-sm">{isData?.gender==='1'?'Female':'Male'}</Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Birthday</Text>
          <Text className="text-neutral-300 text-sm">{isData?.birthday}</Text>
        </View>
        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Known For</Text>
          <Text className="text-neutral-300 text-sm">{isData?.known_for_department}</Text>
        </View>
        <View className="border-r-neutral-400 px-2 items-center">
          <Text className="text-white font-semibold">Popularity</Text>
          <Text className="text-neutral-300 text-sm">{isData?.popularity}</Text>
        </View>
      </View>
      <View className="my-6 mx-4 space-y-2">
        <Text className="text-white text-lg">Biography</Text>
        <Text className='text-neutral-500 tracking-wide'>{isData?.biography}</Text>
          
      </View>
      <MovieList title='Movies' hideSeeAll={true}data={isMovies}/>
    </View>
      }
    </ScrollView>
  );
}
