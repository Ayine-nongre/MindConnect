import { View, Text, Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import colors from '../../constants/Themes.js'
import { AntDesign } from '@expo/vector-icons';
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import { router } from 'expo-router'
import { getPosts } from '../../lib/postQueries'

const Post = () => {
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState({})
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
    .then((res) => {
      setPost(res)
      setLoading(false)
    })
    .catch(err => console.log(err))
  })

  const renderPost = ({ item }) => {
    return (
      <TouchableOpacity style={{ marginTop: 20 }}
        onPress={() => { router.push({ pathname: 'post-page', params: { id: item.id } }) }}
      >
        <View style={{ flexDirection: 'row', gap: 150, alignItems: 'center', marginLeft: 20 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <Image source={{ uri: item.patients.avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 50, height: 50, borderWidth: 1, borderColor: 'grey' }}/>
            <View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ item.patients.name }</Text>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: 'grey' }}>{ item.time }</Text>
            </View>
          </View>
          <Image source={icons.dots} resizeMode='contain' style={{ width: 20, height: 20 }}/>
        </View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginLeft: 25, width: '80%', marginTop: 10 }}>{ item.message }</Text>
        <Image source={{ uri: item.img_url }} resizeMode='cover' style={{ marginLeft: 25, marginTop: 5, borderRadius: 15, height: 180, width: 300 }} />
        <View style={{ flexDirection: 'row', gap: 10, marginLeft: 40, marginTop: 10, alignItems: 'center' }} >
          <TouchableOpacity
            onPress={() => {
              if (liked[item.id] === true) setLiked({...liked, [item.id]: !liked[item.id]})
              else setLiked({...liked, [item.id]: true})
            }}
          >
            {!liked[item.id] && (
              <AntDesign name="hearto" size={24} color='black'/>
            )}
            {liked[item.id] && (
              <AntDesign name="heart" size={24} color="red" />
            )}
          </TouchableOpacity>
          <Image source={icons.comment} resizeMode='contain' style={{ width: 27, height: 30 }} />
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      {/* header code */}
      <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
            <View style={{ flexDirection: 'row', gap: 230}}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Post</Text>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: '#f5f5f5' }}
                onPress={() => router.push('new-post')}
              >
                <Image source={icons.add} resizeMode='contain' style={{ width: 20, height: 20 }}/>
              </TouchableOpacity>
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
        data={post}
        renderItem={renderPost}
        keyExtractor={(post) => post.id}
      />
        
      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Post