import {
  View,
  Image,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../component/Loading";
import { fetchSearch } from "../util/request";
import { debounce } from 'lodash'
import { image185 } from "../util/request";

const dim = Dimensions.get("window");
export default function SearchScreen() {
    let movieName='Avenders infinty war with endgame'
  const Navigation = useNavigation();
  const [isResults, setResults] = useState([]);
  const [isLoading,setLoading]=useState(false)
  const [isInput,setInput]=useState()

  const textHandler=(e)=>{
    setLoading(true)
    if(e&&e.length>2){
      fetchSearch({
        query: e,
        include_adult: false,
        language: 'en-US',
        page: '1'
      }).then((res)=>{
        setResults(res?.results)
      }
        )
    }
    setLoading(false)
  }

  const handleSearch=useCallback(debounce(textHandler,200),[])
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="my-2 mx-3 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleSearch}
          placeholder="Search your movies...."
          placeholderTextColor={"lightgrey"}
          className="pb-1 pl-6 text-base font-semibold text-white tracking-wider flex-1"
        />
        <TouchableOpacity
          className="rounded-full p-3 m-1 bg-neutral-500"
          onPress={() => Navigation.navigate("Home")}
        >
          <XMarkIcon color={"white"} size={30} />
        </TouchableOpacity>
      </View>
      {
        isLoading?<Loading/>:
            isResults.length>0?(
                <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            <Text className="text-white font-semibold ml-1">Results ({isResults.length})</Text>
            <View className='flex-row justify-between flex-wrap'>
              {isResults.map((item, index) => {
                return (
                    <TouchableWithoutFeedback key={index} onPress={()=>Navigation.push('Movie',item)}>
                        <View className='space-y-2 mb-4'>
    <Image source={{uri:(image185(item?.poster_path))}}
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
            ):(
                <View className='items-center mt-52'>
                <Image source={require('../assets/no-search.png')}
                style={{height:dim.height*0.2,width:dim.width*0.9}}
                />
                </View>
            )
          }
      
      
    </SafeAreaView>
  );
}
