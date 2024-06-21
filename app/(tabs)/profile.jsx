import { View, Text, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '../../lib/supabase.ts'
import { useGlobalContext } from '../../context/GlobalProvider.js'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import colors from '../../constants/Themes.js'
import images from '../../constants/images.js'
import CustomButton from '../../components/CustomButton.jsx'
import icons from '../../constants/icons.js'
import { fetchUser } from '../../lib/userQueries.js'

const Profile = () => {
  const { user, setUserData, setIsLogged } = useGlobalContext()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  async function signout() {
    const { error } = await supabase.auth.signOut()

    if (error) return Alert.alert('Failed to signout')
    setIsLogged(false)
    router.push('/sign-in')
  }

  useEffect(() => {
    fetchUser(user)
    .then((res) => {
      setData(res)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  })

  if (loading) {
    return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
      <ScrollView>
        <View style={{ height: '100%', padding: '5%' }}>
          {/* code for header */}
          <View style={{ marginTop: 5 }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', textAlign: 'center', marginTop: 10 }}>Your profile</Text>
              <TouchableOpacity
                style={{ backgroundColor: `${colors.FIELDBKG}`, width: 100, height: 40, justifyContent: 'center', alignItems: 'center',
                  borderRadius: 8, borderWidth: 1, position: 'absolute', right: 5
                }}
                onPress={() => signout()}
              >
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>Logout</Text>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Image source={{ uri: data[0].avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 130, height: 130, backgroundColor: 'grey' }} />
                <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 20, marginTop: 20 }}>{data[0].name}</Text>
                {user.user.user_metadata.role === 'professional' && (<Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10, color: `${colors.TERTIARY}` }}>{data[0].specialization_area}</Text>)}
              </View>
          </View>

          {/* edit profile button */}
          <CustomButton
            title='Edit profile'
            handlePress={() => {
              setUserData(data)
              router.push('profile/update-profile')
            }}
            style={{ minHeight: 55, backgroundColor: '#f5def5',
              justifyContent: 'center', alignItems: 'center', borderRadius: 8,
              width: '100%', marginTop: 20 }}
            color='#480552'
          />

          {/* code for professionals profile details  */}
          {
            user.user.user_metadata.role === 'professional' && (
              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10 }}>
                <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#ebf7a0', width: 100, padding: 10 }}>
                  <Image source={ icons.star } resizeMode='contain' style={{ width: 20, height: 20 }} />
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>4.99</Text>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Reviews</Text>
                </View>
                <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#caf5cd', width: 100, padding: 10 }}>
                  <Image source={ icons.user } resizeMode='contain' style={{ width: 20, height: 20 }} />
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>500</Text>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Patients</Text>
                </View>
                <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#a0f7a4', width: 100, padding: 10 }}>
                  <Image source={ icons.check } resizeMode='contain' style={{ width: 20, height: 20 }} />
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{data[0].experience} years</Text>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Experience</Text>
                </View>
              </View>
            )
          }

          

          {/* code for profile details section section */}
          <Text style={{ marginTop: 10, fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20}}>Email</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{user.user.email}</Text>
          <Text style={{ marginTop: 10, fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20}}>Phone</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{data[0].phone}</Text>
          <Text style={{ marginTop: 10, fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20}}>Gender</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{data[0].gender}</Text>
          <Text style={{ marginTop: 10, fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20}}>About</Text>
          <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{data[0].about}</Text>

          {/* License details */}
          {user.user.user_metadata.role === 'professional' && (<View style={{ backgroundColor: `${colors.FIELDBKG}`, width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10,
            borderRadius: 10, padding: 5, justifyContent: 'center', alignItems: 'center'    
          }}>
            <Image source={icons.license} resizeMode='contain' style={{ width: 25, height: 25 }} />
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>LPC</Text>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#b345b3' }}>{data[0].license}</Text>
            </View>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Registered in Ghana</Text>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 8 }}>Licenses</Text>
          </View>)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile