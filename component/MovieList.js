import { View, Text,Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { image342 ,imageOG} from '../util/request'

const dim=Dimensions.get('window')
export default function MovieList({data,title,hideSeeAll}) {
    const Navigation=useNavigation()
    
  return (
    <View className='mb-8 space-y-4'>
    <View className='mx-4 flex-row justify-between items-center'>
      <Text className='text-white text-xl'>{title}</Text>
      {!hideSeeAll&&<TouchableOpacity onPress={()=>Navigation.navigate('MovieList',title)} >
        <Text style={styles.text} className='text-lg'>See all</Text>
      </TouchableOpacity>}
    </View>
    <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal:15}}
    >
        {data?.map((item,index)=>{
            return(
                <TouchableWithoutFeedback
                key={index}
                onPress={()=>Navigation.push('Movie',item)}
                >
                    <View className='space-y-1 mr-4'>
                    <Image
                className="rounded-3xl"
                // src={
                //   "https://4.bp.blogspot.com/-k3TEifg7L90/WuQ4Db4GuFI/AAAAAAAAC7k/1Ps9aMJ_0Ss9iw_IREEk5lZorCcxfQwQgCLcBGAs/s640/avenger%2Binfinity%2Bwar%2Bmovie%2Bdownload%2B2018.jpg"
                // }
                source={{uri:image342(item.poster_path)}}
                style={{ height: dim.height * 0.25, width: dim.width * 0.33 }}
              />
              <Text className="text-neutral-300 ml-4">{item?.title?.length>14?item.title.slice(0,14)+"...":item.title}</Text>
                    </View>
    
                </TouchableWithoutFeedback>
            )
        })}
    </ScrollView>
    </View>
  )
}