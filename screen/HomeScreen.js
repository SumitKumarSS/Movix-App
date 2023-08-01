import { StatusBar } from "expo-status-bar"
import { Platform, ScrollView, Text,TouchableOpacity,View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

import { styles } from "../theme/theme"
import Trending from "../component/Trending"
import { useEffect, useState } from "react"
import MovieList from "../component/MovieList"
import { useNavigation } from "@react-navigation/native"
import Loading from "../component/Loading"
import { fetchDataFromApi, fetchTopRated, fetchTrending, fetchUpcoming } from "../util/request"

export const HomeScreen = () => {

    const Navigation=useNavigation()
    const [trending,setTrending]=useState()
    const [upcoming,setUpcoming]=useState()
    const [toprated,setToprated]=useState()
    const [isLoading,setLoading]=useState(false)
    const ios =Platform.OS==='ios'

    useEffect(()=>{
        dataApi()
    },[])

    const dataApi=async()=>{
        setLoading(true)
        const datTrending=await fetchTrending()
        if(datTrending)
        {
            setTrending(datTrending?.results)
        }
        const dataUpcoming=await fetchUpcoming()
        if(dataUpcoming)
        {
            setUpcoming(dataUpcoming?.results)
        }
        const dataTopRated=await fetchTopRated()
        if(dataTopRated){
            setToprated(dataTopRated?.results)
        }
        setLoading(false)
    }
  return (
    <View className="flex-1 bg-neutral-800">
        <StatusBar style="light"/>
        <SafeAreaView className={ios?'-mx-3':'mx-3' }>
            <View className='flex-row justify-between items-center mx-4 my-3'>
            <Bars3CenterLeftIcon size={30} strokeWidth={2}color={'white'}/>
        <Text className='text-white text-3xl font-bold'><Text style={styles.text}>M</Text>ovix</Text>
        <TouchableOpacity>
            <MagnifyingGlassIcon color={'white'} size={30} onPress={()=>Navigation.navigate('Search')} strokeWidth={2}/>
        </TouchableOpacity>
        </View>
        </SafeAreaView>
        {isLoading?<Loading/>:
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:10}}
        >
            <Trending data={trending}/>
            <MovieList title='Upcoming Movies'data={upcoming}/>
            <MovieList title='Top Rated'data={toprated}/>
        </ScrollView>
        }
        
    </View>
  )
}
