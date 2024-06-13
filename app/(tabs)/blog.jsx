import { View, Text, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import colors from '../../constants/Themes.js'
import { StatusBar } from 'expo-status-bar'
import images from '../../constants/images'
import { AntDesign } from '@expo/vector-icons';
import FocusAwareStatusBar from '../../components/FocusedStatusBar'

const Blog = () => {
  const [search, setSearch] = useState('')

  const blogs = [
    { "title": 'Cope With Anxiety and Depression', "image": images.depression, "id": "1",
      "message": 'Do you sometimes worry so much that it interferes with your everyday activities? Or feel so blue that it completely clouds your outlook? Do you often experience these or similar feelings together?...'
    },
    { "title": 'Cope With Anxiety and Depression', "image": images.depression, "id": "2",
      "message": 'Do you sometimes worry so much that it interferes with your everyday activities? Or feel so blue that it completely clouds your outlook? Do you often experience these or similar feelings together?...'
    },
    { "title": 'Cope With Anxiety and Depression', "image": images.depression, "id": "3",
      "message": 'Do you sometimes worry so much that it interferes with your everyday activities? Or feel so blue that it completely clouds your outlook? Do you often experience these or similar feelings together?...'
    },
    { "title": 'Cope With Anxiety and Depression', "image": images.depression, "id": "4",
      "message": 'Do you sometimes worry so much that it interferes with your everyday activities? Or feel so blue that it completely clouds your outlook? Do you often experience these or similar feelings together?...'
    }
  ]

  const renderBlog = ({ item }) => {
    return (
      <View style={{marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', width: '90%', borderRadius: 15, borderColor: 'grey',
        borderWidth: 1, gap: 10, marginTop: 10, marginBottom: 10
       }}>
        <Image source={item.image} resizeMode='fill' style={{ width: 80, height: 155, alignSelf: 'center', backgroundColor: 'lightblue', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} />
        <View>
        <Text style={{ width: '10%', fontSize: 12, fontFamily: 'RobotoSerif_28pt-SemiBold',
          marginTop: 10
         }}>{ item.title }</Text>
        <Text style={{ width: '20%', fontSize: 12, fontFamily: 'RobotoSerif_28pt-Regular', marginBottom: 15,
          marginTop: 5
         }}>{ item.message }</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      {/* header code */}
      <View style={{ backgroundColor: `${colors.TERTIARY}`, padding: 20 }}>
            <View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Blog</Text>
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
      <FlatList
        data={blogs}
        renderItem={renderBlog}
        keyExtractor={(blogs) => blogs.id}
        contentContainerStyle={{ marginTop: 10 }}
      />
        
      <FocusAwareStatusBar backgroundColor={colors.TERTIARY} style='light'/>
    </SafeAreaView>
  )
}

export default Blog