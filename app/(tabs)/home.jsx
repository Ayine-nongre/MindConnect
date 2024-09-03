import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/Themes.js'
import icons from '../../constants/icons.js'
import { Link, router } from 'expo-router'
import images from '../../constants/images.js'
import FocusAwareStatusBar from '../../components/FocusedStatusBar.jsx'
import { getDoctorAndUserAppointment, getUserAppointment } from '../../lib/appointmentQueries.js'
import { useGlobalContext } from '../../context/GlobalProvider.js'
import { getProfessionals } from '../../lib/userQueries.js'

const Home = () => {
  const [search, setSearch] = useState('')
  const { user } = useGlobalContext()
  const [scheduleDay, setScheduleDay] = useState(null)
  const [scheduleTime, setScheduleTime] = useState(null)
  const [schedule, setSchedule] = useState(null)
  const [doctors, setDoctors] = useState(null)
  const [loading, setLoading] = useState(true)

  const categories = [
    { 'title': 'BIPOLAR DISORDER', 'image': images.bipolar },
    { 'title': 'STRESS', 'image': images.stress },
    { 'title': "DEMENTIA", 'image': images.dementia },
    { 'title': "INSOMNIA", 'image': images.insomnia },
    { 'title': "ANXIETY", 'image': images.anxiety },
    { 'title': "SCHIZOPHRENIA", 'image': images.schizo }
  ]

  function parseDateTime(day, time) {
    let date = new Date(day)
    date = Number(date.getTime())
    let parseTime = time.split(':')[0]
    parseTime = Number(parseTime)
    if (parseTime < 5) parseTime += 12
    return date + parseTime
  }

  useEffect(() => {
    if (user.user.user_metadata.role !== 'professional') {
      getUserAppointment(user.user.id)
      .then(res => {
        if (res.length < 1) {
          setScheduleDay(null)
          setScheduleTime(null)
        } else {
            res.sort((a, b) => {
            const dateA = parseDateTime(a.day, a.time);
            const dateB = parseDateTime(b.day, b.time);
            return dateA - dateB;
          });
          setScheduleDay((res[0].day).slice(3, 10))
          setScheduleTime((res[0].time).split('-')[0])
        }
      })
      .catch(err => console.log(err))
    } else {
      getDoctorAndUserAppointment(user.user.id)
      .then((res) => {
        if (res.length < 1) {
          setSchedule(null)
        } else {
            res.sort((a, b) => {
            const dateA = parseDateTime(a.day, a.time);
            const dateB = parseDateTime(b.day, b.time);
            return dateA - dateB;
          });
          setSchedule([res[0], res[1]])
        }
      })
      .catch(err => console.log(err))
    
    getProfessionals()
      .then((res) => {  
        if (res.length > 0) setDoctors([res[0]])
      })
      .catch(err => console.log(err))
    }
    setLoading(false)
  },[])

  console.log(doctors, "Hi")

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 110 }} key={item.title}
        onPress={() => router.push({ pathname: 'professionals-page' , params: { category: item.title }})}
      >
        <View style={{ padding: 10, backgroundColor: '#f3d6d6', borderRadius: 10, justifyContent: 'center', width: 100, marginLeft: 20  }}>
          <Image source={ item.image } resizeMode='contain' style={{ width: 80, height: 70 }}/>
        </View>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 9, marginLeft: 20 }}>{ item.title }</Text>
      </TouchableOpacity>
    )
  }

  const renderSchedule = ({ item }) => {
    return (
      <View style={{
        backgroundColor: `${colors.SECONDARY}`, padding: 15, borderRadius: 10, flexDirection: 'row', gap: 20, marginTop: 20,
        justifyContent: 'center', alignItems: 'center', marginRight: 10
      }} key={item.id}>
        <Image source={ icons.calendar } resizeMode='contain' style={{ width: 35, height: 35 }} tintColor='#3fb779'/>
        <View>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12 }}>UPCOMING SESSION</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 13 }}>WITH {(item.patients.name).toUpperCase()}</Text>
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7, fontSize: 12 }}>Your session at {' '}</Text>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7, color: '#3fb779', fontSize: 12 }} >{(item.day).slice(3, 10)}, at {(item.time).split('-')[0]}</Text>
          </View>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>Let's get ready for that on time</Text>
        </View>
      </View>
    )
  }

  const renderDoctors = ({ item }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }} key={item.id}>
            <Image source={{ uri: item.avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 60, height: 60, borderWidth: 1, borderColor: 'grey' }}/>
            <View style={{ marginLeft: 10, width: 220 }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ item.name }</Text>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 10 }}>
                <Image source={icons.star} resizeMode='contain' style={{ width: 20, height: 20 }} />
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#f3e208' }}>{ item.rating }</Text>
                <Text>|</Text>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: `${colors.PRIMARY}`, fontSize: 12 }}>{ item.specialty }</Text>
              </View>
            </View>
            <TouchableOpacity
                onPress={() => { router.push({ pathname: 'professional', params: { id: item.id } }) }}
            >
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#3fb779', marginLeft: 10 }}>View</Text>
            </TouchableOpacity>
        </View>
    )
  }

  // code to render loading effect
  if (loading) {
    return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      <ScrollView >
        <View style={{ width: '100%', minHeight: '90%'}}>
          {/* code for header */}
          <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
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
          {(user.user.user_metadata.role !== 'professional' && scheduleDay != null) && (<View style={{
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
          </View>)} 
          {(user.user.user_metadata.role === 'professional' && schedule != null) && (
            <FlatList
              data={schedule}
              renderItem={renderSchedule}
              keyExtractor={(schedule) => schedule.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 5 }}
              style={{ marginLeft: 'auto', marginRight: 'auto', flexGrow: 0, width: '90%' }}
            />
          )} 
          {(schedule == null && scheduleDay == null) && (
            <View style={{
              backgroundColor: `${colors.SECONDARY}`, padding: 15, justifyContent: 'center', marginTop: 20,
              borderRadius: 10, width: '85%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
              gap: 20, height: 150
            }}>
            <Image source={ icons.calendar } resizeMode='contain' style={{ width: 30, height: 30 }} tintColor='#3fb779'/>
            <View>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>No upcoming sessions</Text>
            </View>
          </View>
          )}

          {/* code for categories */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            gap: 70, marginTop: 15
          }}>
            <View>
              <Text style={{ fontFamily: "RobotoSerif_28pt-Bold", fontSize: 20 }}>Categories</Text>
              <Text style={{ fontFamily: "RobotoSerif_28pt-Regular", fontSize: 12, marginTop: 4 }}>Find professionals quickly</Text>
            </View>
            <Link href='professionals-page' style={{ fontFamily: "RobotoSerif_28pt-Regular", fontSize: 12, color: '#3fb779' }}>View all</Link>
          </View>

        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={categories => categories.title}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: 'auto', marginRight: 'auto', flexGrow: 0, width: '90%' }}
        />

          {/* code for suggested professionals */}
          {user.user.user_metadata.role !== 'professional' && (<Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 20, marginLeft: 25, marginTop: 7}}>Professionals for you</Text>)}
          {/* {user.user.user_metadata.role !== 'patient' && (<Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 20, marginLeft: 25, marginTop: 7}}>Seek help from colleagues?</Text>)} */}

          {
              doctors && (user.user.user_metadata.role !== 'professional') && doctors.map((item) => <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 'auto', marginRight: 'auto' }} key={item.id}>
                <Image source={{ uri: item.avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 60, height: 60, borderWidth: 1, borderColor: 'grey' }}/>
                <View style={{ marginLeft: 10, width: 220 }}>
                  <Text>{ item.name }</Text>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 10 }}>
                    <Image source={icons.star} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#f3e208' }}>{ item.rating }</Text>
                    <Text>|</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: `${colors.PRIMARY}`, fontSize: 12 }}>{ item.specialty }</Text>
                  </View>
                </View>
                <TouchableOpacity
                    onPress={() => { router.push({ pathname: 'professional', params: { id: item.id } }) }}
                >
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#3fb779', marginLeft: 10 }}>View</Text>
                </TouchableOpacity>
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
          {user.user.user_metadata.role !== 'professional' && (<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: `${colors.SECONDARY}`}}>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold',  fontSize: 25, marginLeft: 25, marginTop: 25, textAlign: 'center'}}>Contact a personal therapist</Text>
            <TouchableOpacity style={{ backgroundColor: '#3fb779', height: 40, justifyContent: 'center',
              alignItems: 'center', borderRadius: 20, width: '80%', marginTop: 20
            }}
              onPress={() => router.push('/professionals-page')}
            >
              <Text  style={{ fontFamily: 'RobotoSerif_28pt-Regular',  fontSize: 15, color: 'white' }}>Start a conversation</Text>
            </TouchableOpacity>
            <Image source={images.lady} resizeMode='contain' style={{ width: 200, height: 200}} />
          </View>)}
        </View>
      </ScrollView>

      <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
    </SafeAreaView>
  )
}

export default Home