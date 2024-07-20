import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import colors from '../../constants/Themes.js'
import icons from '../../constants/icons.js'
import { Link } from 'expo-router'
import images from '../../constants/images.js'
import FocusAwareStatusBar from '../../components/FocusedStatusBar.jsx'
import { getUserAppointment } from '../../lib/appointmentQueries.js'
import { useGlobalContext } from '../../context/GlobalProvider.js'

const Home = () => {
  const [search, setSearch] = useState('')
  const { user } = useGlobalContext()
  const [scheduleDay, setScheduleDay] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  const categories = [
    { 'title': 'BIPOLAR DISORDER', 'image': images.bipolar },
    { 'title': 'STRESS', 'image': images.stress },
    { 'title': "DEMENTIA", 'image': images.dementia },
    { 'title': "INSOMNIA", 'image': images.insomnia },
    { 'title': "ANXIETY", 'image': images.anxiety },
    { 'title': "SCHIZOPHRENIA", 'image': images.schizo }
  ]

  const professionals = [
    { 'name': 'Dr Maram Ahmed', 'rating': '4.99', 'specialty': 'Cognitive psychologist', 'image': images.pfp1, 'id': '1' },
    { 'name': 'Dr Hanan Alatas', 'rating': '4.80', 'specialty': 'Cognitive psychologist', 'image': images.pfp2, 'id': '2' }
  ]

  useEffect(() => {
    getUserAppointment(user.user.id)
    .then(res => {
      console.log(res)
      let closestDay = ''
      let closestTime = ''
      let least = Number.MAX_SAFE_INTEGER
      let leastTime = Number.MAX_SAFE_INTEGER
      res.map(data => {
        const date = new Date(data.day)
        if (date.getTime() < least) {
          least = date.getTime()
          closestDay = data.day
        }
      })

      res.map(data => {
        const date = new Date(data.day)
        if (data.day === closestDay) {
          if (leastTime > Number((data.time).split(':')[0]) && Number((data.time).split(':')[0]) > 5) {
            closestTime = (data.time).split('-')[0]
            leastTime = Number((data.time).split(':')[0])
          } else if (leastTime > (Number((data.time).split(':')[0]) + 12)) {
            closestTime = (data.time).split('-')[0]
            leastTime = Number((data.time).split(':')[0])
          }
        }
      })
      setScheduleDay(closestDay.slice(3, 10))
      setScheduleTime(closestTime)
    })
    .catch(err => console.log(err))
  },[])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 110 }}>
        <View style={{ padding: 10, backgroundColor: '#f3d6d6', borderRadius: 10, justifyContent: 'center', width: 100, marginLeft: 20  }}>
          <Image source={ item.image } resizeMode='contain' style={{ width: 80, height: 70 }}/>
        </View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 9, marginLeft: 20 }}>{ item.title }</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      <ScrollView >
        <View style={{ width: '100%', minHeight: '90%'}}>
          {/* code for header */}
          <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
            <View style={{ flexDirection: 'row', gap: 150}}>
              <Text style={{ color: `${colors.TEXT}`, fontFamily: 'RobotoSerif_28pt-Regular', marginLeft: 5 }}>How are you today?</Text>
              <Image source={icons.bell} resizeMode='contain' style={{ width: 20, height: 20 }}/>
            </View>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20, marginTop: 10, marginLeft: 5 }}>Hi, Welcome</Text>
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

          {/* code for upcoming sessions */}
          <View style={{
              backgroundColor: `${colors.SECONDARY}`, padding: 15, justifyContent: 'center', marginTop: 20,
              borderRadius: 10, width: '85%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
              gap: 20
            }}>
            <Image source={ icons.calendar } resizeMode='contain' style={{ width: 30, height: 30 }} tintColor='#3fb779'/>
            <View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>Upcoming session</Text>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7 }}>Your session at {' '}</Text>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7, color: '#3fb779'}} >{ scheduleDay + ', ' + scheduleTime }</Text>
              </View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>Let's get ready for that on time</Text>
            </View>
          </View>

          {/* code for categories */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            gap: 70, marginTop: 15
          }}>
            <View>
              <Text style={{ fontFamily: "RobotoSerif_28pt-Bold", fontSize: 20 }}>Categories</Text>
              <Text style={{ fontFamily: "RobotoSerif_28pt-Regular", fontSize: 12, marginTop: 4 }}>Find your professional quickly</Text>
            </View>
            <Link href='professionals-page' style={{ fontFamily: "RobotoSerif_28pt-Regular", fontSize: 12, color: '#3fb779' }}>View all</Link>
          </View>

          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={categories => categories.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 7, marginTop: 20, marginRight: 10, flexGrow: 0 }}
          />

          {/* code for suggested professionals */}
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 20, marginLeft: 25, marginTop: 7}}>Professionals for you</Text>

          {
              professionals.map((item) => <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 'auto', marginRight: 'auto' }} key={item.id}>
                <Image source={ item.image } resizeMode='fill' style={{ borderRadius: 100, width: 60, height: 60, borderWidth: 1, borderColor: 'grey' }}/>
                <View style={{ marginLeft: 10}}>
                  <Text>{ item.name }</Text>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 10 }}>
                    <Image source={icons.star} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#f3e208' }}>{ item.rating }</Text>
                    <Text>|</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: `${colors.PRIMARY}`, fontSize: 12 }}>{ item.specialty }</Text>
                  </View>
                </View>
                <Link href='home' style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#3fb779', marginLeft: 10 }}>View</Link>
              </View>)
          }

          {/* most preferred blog */}
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 20, marginLeft: 25, marginTop: 15}}>Most preferred blog</Text>
          <View style={{ marginLeft: 25, flexDirection: 'row', width: '90%', borderRadius: 15, borderColor: 'grey',
            borderWidth: 1, gap: 10, marginTop: 10
           }}>
            <Image source={images.depression} resizeMode='fill' style={{ width: 80, height: 155, alignSelf: 'center', backgroundColor: 'lightblue', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} />
            <View>
            <Text style={{ width: '10%', fontSize: 12, fontFamily: 'RobotoSerif_28pt-SemiBold',
              marginTop: 10
             }}>Cope With Anxiety and Depression</Text>
            <Text style={{ width: '20%', fontSize: 12, fontFamily: 'RobotoSerif_28pt-Regular', marginBottom: 15,
              marginTop: 5
             }}>Do you sometimes worry so much that it interferes with your everyday activities? Or feel so blue that it completely clouds your outlook? Do you often experience these or similar feelings together?...</Text>
            </View>
          </View>

          {/* Have a conversation section */}
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: `${colors.SECONDARY}`}}>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 25, marginLeft: 25, marginTop: 25, textAlign: 'center'}}>Contact a personal therapist</Text>
            <TouchableOpacity style={{ backgroundColor: '#3fb779', height: 40, justifyContent: 'center',
              alignItems: 'center', borderRadius: 20, width: '80%', marginTop: 20
            }}>
              <Text  style={{ fontFamily: 'RobotoSerif_28pt-Regular',  fontSize: 15, color: 'white' }}>Start a conversation</Text>
            </TouchableOpacity>
            <Image source={images.lady} resizeMode='contain' style={{ width: 200, height: 200}} />
          </View>
        </View>
      </ScrollView>

      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Home