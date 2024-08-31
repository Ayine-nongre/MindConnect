import { View, Text, Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import colors from '../../constants/Themes.js'
import { AntDesign } from '@expo/vector-icons';
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import { router } from 'expo-router'
import { getPosts } from '../../lib/postQueries'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getDoctorAndUserAppointment } from '../../lib/appointmentQueries'

const Post = () => {
  const { user } = useGlobalContext()
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState({})
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [schedule, setSchedule] = useState(null)

  // function to parse date and time to ease sorting
  function parseDateTime(day, time) {
    let date = new Date(day)
    date = Number(date.getTime())
    let parseTime = time.split(':')[0]
    parseTime = Number(parseTime)
    if (parseTime < 5) parseTime += 12
    return date + parseTime
  }

  useEffect(() => {
    // code to fetch posts from db
    if (user.user.user_metadata.role !== 'professional') {
      getPosts()
      .then((res) => {
        setPost(res)
        setLoading(false)
      })
      .catch(err => console.log(err))
    } else {
      getDoctorAndUserAppointment(user.user.id)
      .then((res) => {
        res.sort((a, b) => {
          const dateA = parseDateTime(a.day, a.time);
          const dateB = parseDateTime(b.day, b.time);
          return dateA - dateB;
        });
        setSchedule(res)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
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

  const renderSchedule = ({ item }) => {
    return (
      <View style={{
        backgroundColor: `${colors.SECONDARY}`, padding: 15, justifyContent: 'center', marginTop: 20,
        borderRadius: 10, width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
        gap: 20
      }}>
      <Image source={ icons.calendar } resizeMode='contain' style={{ width: 35, height: 35 }} tintColor='#3fb779'/>
      <View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12 }}>UPCOMING SESSION</Text>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 13 }}>WITH {(item.patients.name).toUpperCase()}</Text>
        <View style={{ flexDirection: 'row'}}>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7 }}>Your session at {' '}</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7, color: '#3fb779'}} >{(item.day).slice(3, 10)}, at {(item.time).split('-')[0]}</Text>
        </View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>Let's get ready for that on time</Text>
      </View>
    </View>
    )
  }

  // code to render loading effect
  if (loading) {
    return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      {/* header code */}
      {user.user.user_metadata.role !== 'professional' ? (<View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
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
      </View>) : (
      <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 40 }}>
            <View style={{ alignItems: 'center'  }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 16, marginLeft: 5 }}>UPCOMING SESSIONS</Text>
            </View>
      </View>)}

      {(schedule?.length < 1 && user.user.user_metadata.role === 'professional') && (<Text style={{ top: '35%',
        marginLeft: 'auto', marginRight: 'auto', fontSize: 20
      }}>No upcoming sessions</Text>)}

      {/* code for loaded posts */}
      {user.user.user_metadata.role !== 'professional' ? (<FlatList
        data={post}
        renderItem={renderPost}
        keyExtractor={(post) => post.id}
        style={{ marginBottom: 20}}
      />) : (
      <FlatList
        data={schedule}
        renderItem={renderSchedule}
        keyExtractor={(schedule) => schedule.id}
        style={{ marginBottom: 20}}
      />)}    
      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Post