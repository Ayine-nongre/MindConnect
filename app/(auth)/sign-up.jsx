import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect, router } from 'expo-router'
import Formfield from '../../components/FormField.jsx'
import CustomButton from '../../components/CustomButton.jsx'
import { supabase } from '../../lib/supabase.ts'
import colors from '../../constants/Themes.js'
import icons from '../../constants/icons.js'
import { RadioButton } from 'react-native-paper'
import images from '../../constants/images.js'
import FocusAwareStatusBar from '../../components/FocusedStatusBar.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js'
import { createNewPatient, createNewProfessional } from '../../lib/userQueries.js'

const Signup = () => {
  const { setIsLogged, setUser } = useGlobalContext()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
    license_no: '',
    specialty: value,
    name: '',
    phone: '',
    experience: ''
  })

  const [selectedValue, setSelectedValue] = useState('male')
  const [role, setRole] = useState('patient')

  // function that creates a new user
  async function signUpWithEmail() {
    setLoading(true)
    const { data, error, } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,

      options: {
        data: {
          role: role
        }
      }
    })

    if (error) {
      Alert.alert(error.message)
      return <Redirect href='/sign-up'/>
    }
    
    if (data && data.user) {
      if (role === 'professional') await createNewProfessional(data.user.id, form, selectedValue).catch(err => console.log(err))
      else await createNewPatient(data.user.id, form, selectedValue).catch(err => console.log(err))
    }

    setUser(data)
    setIsLogged(true)
    setLoading(false)
    if (!error) router.replace('/home')
  }

  function resetFields(role) {
    setRole(role)
    setSelectedValue('male')
    setForm({
      email: '',
      password: '',
      license_no: '',
      specialty: '',
      experience: ''
    })
  }

  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: `${colors.BACKGROUND}` }}>
      <ScrollView>
        <View style={{ width: '100%', justifyContent: 'center', padding: '5%'}}>
          {/* header for patient or doctor */}
          <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 20, marginTop: 5, marginBottom: 10 }}>
            <TouchableOpacity
             onPress={() => resetFields('patient')}
             style={{ borderWidth: 1, padding: 30, borderRadius: 10, backgroundColor: `${colors.FIELDBKG}`,
             width: 140, height: 150, justifyContent: 'center', alignItems: 'center', borderColor: `${role === 'patient' ? '#7FB77E' : 'black' }` }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12, marginBottom: 10, color: `${role === 'patient' ? '#7FB77E' : 'black' }` }}>Patient</Text>
              <Image source={images.patient} resizeMode='contain' style={{ width: 60, height: 60 }}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => resetFields('professional')}
              style={{ borderWidth: 1, padding: 30, borderRadius: 10, backgroundColor: `${colors.FIELDBKG}`,
              width: 140, height: 150, justifyContent: 'center', alignItems: 'center', borderColor: `${role === 'patient' ? 'black' : '#7FB77E' }` }}>
              <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12, marginBottom: 10, color: `${role === 'patient' ? 'black' : '#7FB77E' }` }}>Professional</Text>
              <Image source={images.doctor} resizeMode='contain' style={{ width: 60, height: 60 }}/>
            </TouchableOpacity>
          </View>


          <Text style={{ color: 'Black', fontSize: 20, fontFamily: "RobotoSerif_28pt-Bold" }}>Sign up</Text>

          {/* code for patient sign up */}
          {role === 'patient' && (
            <View>
              <Formfield 
              title='Name'
              value={form.name}
              handleTextChange={(e) => setForm({...form, name: e})}
              placeholder='Enter your name'
              />
              <Formfield 
              title='Phone'
              value={form.phone}
              handleTextChange={(e) => setForm({...form, phone: e})}
              placeholder='Enter your phone no (Eg. 0200000000)'
              />
              <Formfield 
              title='Email'
              value={form.email}
              handleTextChange={(e) => setForm({...form, email: e})}
              placeholder='Enter your email'
              />
              <Text style={{ fontSize: 13, fontFamily: "RobotoSerif_28pt-Regular" }}>Gender</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, marginTop: 7 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: `${colors.FIELDBKG}`, borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                  <RadioButton.Android value='male'
                    status={selectedValue === 'male' ? 'checked' : 'unchecked'} 
                    onPress={() => setSelectedValue('male')}  
                  />
                  <Text>Male</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: `${colors.FIELDBKG}`, borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                  <RadioButton.Android value='female'
                    status={selectedValue === 'female' ? 'checked' : 'unchecked'} 
                    onPress={() => setSelectedValue('female')}  
                  />
                  <Text>Female</Text>
                </View>
              </View>
              <Formfield 
                title='Password'
                value={form.password}
                handleTextChange={(e) => setForm({...form, password: e})}
                placeholder='Enter your password'
              />
            </View>
          )}

          {/* code for professional sign up */}
          {role === 'professional' && (
            <View>
              <Formfield 
              title='Name'
              value={form.name}
              handleTextChange={(e) => setForm({...form, name: e})}
              placeholder='Enter your name'
              />
              <Formfield 
              title='Phone'
              value={form.phone}
              handleTextChange={(e) => setForm({...form, phone: e})}
              placeholder='Enter your phone no (Eg. 0200000000)'
              />
              <Formfield 
              title='Email'
              value={form.email}
              handleTextChange={(e) => setForm({...form, email: e})}
              placeholder='Enter your email'
              />
              <Text style={{ fontSize: 13, fontFamily: "RobotoSerif_28pt-Regular" }}>Gender</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 30, marginTop: 7 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: `${colors.FIELDBKG}`, borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                  <RadioButton.Android value='male'
                    status={selectedValue === 'male' ? 'checked' : 'unchecked'} 
                    onPress={() => setSelectedValue('male')}  
                  />
                  <Text>Male</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                  backgroundColor: `${colors.FIELDBKG}`, borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                  <RadioButton.Android value='female'
                    status={selectedValue === 'female' ? 'checked' : 'unchecked'} 
                    onPress={() => setSelectedValue('female')}  
                  />
                  <Text>Female</Text>
                </View>
              </View>
              <Formfield 
                title='License No'
                value={form.license_no}
                handleTextChange={(e) => setForm({...form, license_no: e})}
                placeholder='Enter your license number'
              />
              <Formfield 
              title='Experience'
              value={form.experience}
              handleTextChange={(e) => setForm({...form, experience: e})}
              placeholder='How many years experience do you have?'
              />
              {/* categories */}
              <View>
                    <View style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, flexDirection: 'row', gap: 60,
                        justifyContent: 'center', alignContent: 'center', padding: 15, backgroundColor: `${colors.FIELDBKG}`
                     }}>
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, minWidth: '60%' }}>{form.specialty ? form.specialty : 'Select your area of speciality'}</Text>
                        <TouchableOpacity
                            onPress={() => setOpen(!open)}
                        >
                            <Image source={icons.dropdown} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    {open && (<View style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', gap: 20, fontSize: 15,
                        justifyContent: 'center', alignContent: 'center', padding: 15, backgroundColor: '#f1f1ed'
                     }}>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'BIPOLAR DISORDER'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>BIPOLAR DISORDER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'STRESS'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>STRESS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'DEMENTIA'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>DEMENTIA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'INSOMNIA'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>INSOMNIA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'ANXIETY'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>ANXIETY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setForm({...form, specialty: 'SCHIZOPHRENIA'})
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>SCHIZOPHRENIA</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>
              <Formfield 
                title='Password'
                value={form.password}
                handleTextChange={(e) => setForm({...form, password: e})}
                placeholder='Enter your password'
              />
            </View>
          )}

          {/* code for sign up button and sign in with google button */}
          <CustomButton
            title="Sign up"
            handlePress={signUpWithEmail}
            style={{ minHeight: 55, backgroundColor: `${colors.SECONDARY}`,
              justifyContent: 'center', alignItems: 'center', borderRadius: 8,
              width: '100%', marginTop: 20 }}
          />
          {/* <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 15}}>
            <View style={{ width: '40%', borderBottomWidth: 1 }}></View>
            <Text>Or</Text>
            <View style={{ width: '40%', borderBottomWidth: 1 }}></View>
          </View>
          <CustomButton
            title="Sign up with Google"
            //handlePress={signInWithEmail}
            isLoading={loading}
            style={{ minHeight: 55, backgroundColor: 'white',
            justifyContent: 'center', alignItems: 'center', borderRadius: 8,
            width: '100%', marginTop: 20, borderWidth: 1, flexDirection: 'row' }}
            image={ icons.google }
          /> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 5 }}>
            <Text style={{ color: 'Black', fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7 }}>Already have an account? {' '}</Text>
            <Link href='/sign-in' style={{ color: '#7FB77E', fontFamily: 'RobotoSerif_28pt-Regular', marginTop: 7}}>Login</Link>
          </View>
        </View>
      </ScrollView>

      <FocusAwareStatusBar backgroundColor={colors.BACKGROUND} style='dark'/>
    </SafeAreaView>
  )
}

export default Signup