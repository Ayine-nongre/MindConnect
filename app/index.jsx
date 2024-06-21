import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link, Redirect, router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../constants/images'
import CustomButton from '../components/CustomButton'

const Index = () => {
  const { isLoading, isLogged } = useGlobalContext()
  
  if (!isLoading && isLogged) return <Redirect href='home' />

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ padding: '5%', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto', width: '100%' }}>
          <Image source={ images.waving } resizeMode='contain' style={{ width: 350, height: 350 }} />
          <Text style={{ textAlign: 'center', fontFamily: 'RobotoSerif_28pt-Regular' }}>Looking to get some help? {'\n'} or {'\n'} Do you want to give out help?</Text>
          <CustomButton
            title="Get started"
            handlePress={() => router.push('sign-in')}
            style={{ minHeight: 55, backgroundColor: '#f5def5',
              justifyContent: 'center', alignItems: 'center', borderRadius: 8,
              width: '100%', marginTop: 100 }}
            color='#480552'
          />
        </View>
    </SafeAreaView>
  )
}

export default Index