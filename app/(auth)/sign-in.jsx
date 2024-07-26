import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Link, Redirect, router } from 'expo-router'
import Formfield from '../../components/FormField.jsx'
import CustomButton from '../../components/CustomButton.jsx'
import { supabase } from '../../lib/supabase.ts'
import colors from '../../constants/Themes.js'
import icons from '../../constants/icons.js'
import FocusAwareStatusBar from '../../components/FocusedStatusBar.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js'

const Signin = () => {
  const { setIsLogged, setUser } = useGlobalContext()
  const [loading, setloading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  // code for signing a user in
  async function signInWithEmail() {
    setloading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      Alert.alert(error.message)
      return <Redirect href='sign-up'/>
    }
    
    setUser(data)
    setIsLogged(true)
    setloading(false)
    if (!error) router.replace('/home')
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: `${colors.BACKGROUND}` }}>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View style={{ width: '100%', minHeight: '90%', justifyContent: 'center', padding: '5%'}}>
          <Text style={{ color: 'Black', fontSize: 20, fontFamily: "RobotoSerif_28pt-Bold" }}>Login</Text>
          <Formfield 
            title='Email'
            value={form.email}
            handleTextChange={(e) => setForm({...form, email: e})}
            placeholder='Enter your email'
          />
          <Formfield 
            title='Password'
            value={form.password}
            handleTextChange={(e) => setForm({...form, password: e})}
            placeholder='Enter your password'
          />
          <Link href='/forgot-password' style={{ left: '60%', fontFamily: 'RobotoSerif_28pt-SemiBold', color: '#7FB77E' }}>Forgot password?</Link>
          <CustomButton
            title="Login to Account"
            handlePress={signInWithEmail}
            style={{ minHeight: 55, backgroundColor: `${colors.SECONDARY}`,
              justifyContent: 'center', alignItems: 'center', borderRadius: 8,
              width: '100%', marginTop: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 15}}>
            <View style={{ width: '40%', borderBottomWidth: 1 }}></View>
            <Text>Or</Text>
            <View style={{ width: '40%', borderBottomWidth: 1 }}></View>
          </View>
          <CustomButton
            title="Sign in with Google"
            //handlePress={signInWithEmail}
            isLoading={loading}
            color='black'
            style={{ minHeight: 55, backgroundColor: 'white',
              justifyContent: 'center', alignItems: 'center', borderRadius: 8,
              width: '100%', marginTop: 20, borderWidth: 1, flexDirection: 'row' }}
            image={ icons.google }
          />
        
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 5 }}>
            <Text style={{ color: 'Black', fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7 }}>Don't have an account? {' '}</Text>
            <Link href='/sign-up' style={{ color: '#7FB77E', fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7}}>Sign up</Link>
          </View>
        </View>
      </ScrollView>

      <FocusAwareStatusBar backgroundColor={colors.BACKGROUND} style='light'/>
    </SafeAreaView>
  )
}

export default Signin