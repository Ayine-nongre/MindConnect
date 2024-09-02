import { View, Text, Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import colors from '../../constants/Themes.js'
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getBlogs } from '../../lib/blogQueries'

const Blog = () => {
  const { user } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // function to get blogs from db
    getBlogs()
    .then((res) => {
      setBlog(res)
      setLoading(false)
    })
    .catch(err => console.log(err))
  })

  const renderBlog = ({ item }) => {
    return (
      <TouchableOpacity style={{marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', width: '90%', borderRadius: 15, borderColor: 'grey',
        borderWidth: 1, gap: 10, marginTop: 10, marginBottom: 10
       }}
       onPress={() => {
        router.push({ pathname: 'blog-page', params: { id: item.id } })
       }}>
        <Image source={{ uri: item.img_url }} resizeMode='cover' style={{ width: '100%', height: 175, alignSelf: 'center', backgroundColor: 'lightblue', borderTopLeftRadius: 15, borderTopRightRadius: 15 }} />
        {item.img_url === null && <Text style={{ position: 'absolute', fontSize: 20, fontFamily: 'RobotoSerif_28pt-Regular', top: '30%', left: '37%' }}>No image</Text>}
        <View>
        <Text style={{ width: 200, fontSize: 12, fontFamily: 'RobotoSerif_28pt-SemiBold',
          marginTop: 10, marginLeft: '5%'
         }}>{ (item.title).length < 50 ? item.title : (item.title).slice(0, 46) + '...' }</Text>
        <Text style={{ width: '90%', fontSize: 12, fontFamily: 'RobotoSerif_28pt-Regular', marginBottom: 15,
          marginTop: 5, marginLeft: '5%'
         }}>{ (item.message).length < 180 ? item.message : (item.message).slice(0, 180) + '...'}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  // code to render loading effect
  if (loading) {
    return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      {/* header code */}
      <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Blog</Text>
              {user.user.user_metadata.role === 'professional' && (<TouchableOpacity style={{ marginTop: 10 }} onPress={() => router.push('new-blog')}>
                <Image source={ icons.add } resizeMode='contain' style={{ width: 20, height: 20 }}/>
              </TouchableOpacity>)}
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

      {/* code for list of blogs */}
      {blog.length > 0 ? (<FlatList
        data={blog}
        renderItem={renderBlog}
        keyExtractor={(blog) => blog.id}
        contentContainerStyle={{ marginTop: 10 }}
      />) : (
        <Text style={{ top: '35%',
          marginLeft: 'auto', marginRight: 'auto', fontSize: 20
        }}>No blogs to see here</Text>
      )}
        
      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Blog