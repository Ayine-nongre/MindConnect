import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import colors from '../../constants/Themes.js'
import { StatusBar } from 'expo-status-bar'
import images from '../../constants/images'
import { AntDesign } from '@expo/vector-icons';
import FocusAwareStatusBar from '../../components/FocusedStatusBar'

const Post = () => {
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState(false)

  const posts = [
    { "name": "Sung Jin Woo", "time": "just now", "message": "Today was beautiful", "image": images.pfp1, "id": "1" }
  ]

  const renderPost = ({ item }) => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', gap: 150, alignItems: 'center', marginLeft: 20 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image source={images.pfp1} resizeMode='fill' style={{ borderRadius: 100, width: 50, height: 50, borderWidth: 1, borderColor: 'grey' }}/>
            <View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ item.name }</Text>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: 'grey' }}>{ item.time }</Text>
            </View>
          </View>
          <Image source={icons.dots} resizeMode='contain' style={{ width: 20, height: 20 }}/>
        </View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginLeft: 25, width: '80%', marginTop: 10 }}>{ item.message }</Text>
        <Image source={images.imgPost} style={{ marginLeft: 25, marginTop: 5, borderRadius: 15 }} />
        <View style={{ flexDirection: 'row', gap: 10, marginLeft: 40, marginTop: 10 }} >
          <TouchableOpacity
            onPress={() => setLiked(!liked)}
          >
            {!liked && (
              <AntDesign name="hearto" size={24} color='black'/>
            )}
            {liked && (
              <AntDesign name="heart" size={24} color="red" />
            )}
          </TouchableOpacity>
          <Image source={icons.comment} resizeMode='contain' style={{ width: 30, height: 30 }} />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      {/* header code */}
      <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
            <View style={{ flexDirection: 'row', gap: 230}}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Post</Text>
              <View style={{ borderWidth: 1, borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: '#f5f5f5' }}>
                <Image source={icons.add} resizeMode='contain' style={{ width: 20, height: 20 }}/>
              </View>
            </View>
            <View style={{ 
              borderWidth: 1, borderRadius: 8, backgroundColor: '#f5f5f5',
              height: 45, marginTop: 20, marginBottom: 7, alignItems: 'center',
              justifyContent: 'center', flexDirection: 'row', padding: 6}}> 
              <TextInput 
                  onChangeText={(e) => setSearch(e)}
                  value={search}
                  placeholder='search'
                  placeholderTextColor='grey'
                  style={{ flex: 1, color: `${colors.TEXT}`, fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12}}
              />
            </View>
      </View>

      {/* code for loaded posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(posts) => posts.id}
      />
        
      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Post