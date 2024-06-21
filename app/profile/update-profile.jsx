import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import colors from '../../constants/Themes.js'
import icons from '../../constants/icons'
import { router } from 'expo-router'
import images from '../../constants/images'
import ProfileField from '../../components/ProfileField'
import { RadioButton } from 'react-native-paper'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { updatePatient, updateProfessional } from '../../lib/userQueries'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '../../lib/supabase.ts'
import { decode } from 'base64-arraybuffer'

const UpdateProfile = () => {
    const { user, userData } = useGlobalContext()
    const [enableName, setEnableName] = useState(false)
    const [enablePhone, setEnablePhone] = useState(false)
    const [enableEmail, setEnableEmail] = useState(false)
    const [selectedValue, setSelectedValue] = useState('male')
    const [enableAbout, setEnableAbout] = useState(false)
    const [enableLicense, setEnableLicense] = useState(false)
    const [enableExperience, setEnableExperience] = useState(false)
    const [enableSpecialty, setEnableSpecialty] = useState(false)
    const [form, setForm] = useState({
        email: user.user.email,
        phone: userData[0].phone,
        name: userData[0].name,
        gender: userData[0].gender,
        about: userData[0].about,
        license: userData[0].license,
        experience: userData[0].experience,
        specialty: userData[0].specialty,
        pfp: userData[0].avatar_url
    })
    const [image, setImage] = useState(null)
    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      const img = result.assets[0]
      const fileExt = (img.uri).split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `public/${fileName}` 

      let { data, error } = await supabase.storage
          .from('avatars')
          .upload(filePath, decode(img.base64), { 
            contentType: img.mimeType
           })

        if (error) {
            console.log(error)
            throw error
        }
    

        const url = supabase
        .storage
        .from('avatars')
        .getPublicUrl(filePath)
        
        setForm({...form, pfp: url.data.publicUrl});
        setImage(url.data.publicUrl)
    }
  };

    const updateProfile = async () => {
        if (user.user.user_metadata.role === 'professional') {
            await updateProfessional(user, form).catch(err => console.log(err))
        }
        else await updatePatient(user, form).catch(err => console.log(err))
        router.back()
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
        <ScrollView>
            {/* header code */}
            <View style={{ backgroundColor: `${colors.TERTIARY}`, flexDirection: 'row', alignItems: 'center', gap: 70, padding: 20 }}>
                <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => router.back()}
                >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 20 }}>Edit profile</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image source={{ uri: form.pfp }} resizeMode='fill' style={{ borderRadius: 100, width: 130, height: 130, backgroundColor: 'grey' }} />
                <TouchableOpacity
                onPress={pickImage}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12, marginTop: 5, color:'#480552' }}>Change profile photo</Text>
                    {image && <Image source={{ uri: image }} style={{width: 200, height: 200}} />}
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', borderBottomWidth: 1, marginTop: 10, borderColor: '#4a484a' }}></View>

            {/*  */}
            <View>
                <ProfileField
                    tag='Name'
                    handleOnTap={() => setEnableName(true)}
                    value={form.name}
                    enabled={enableName}
                    handleTextChange={(e) => setForm({...form, name: e})}
                />
                <ProfileField
                    tag='Phone'
                    handleOnTap={() => setEnablePhone(true)}
                    value={form.phone}
                    enabled={enablePhone}
                    handleTextChange={(e) => setForm({...form, phone: e})}
                />
                <ProfileField
                    tag='Email'
                    handleOnTap={() => setEnableEmail(true)}
                    value={form.email}
                    enabled={enableEmail}
                    handleTextChange={(e) => setForm({...form, email: e})}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginTop: 7 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                    <RadioButton.Android value='male'
                        status={form.gender === 'male' ? 'checked' : 'unchecked'} 
                        onPress={() => setForm({...form, gender: 'male'})}  
                    />
                    <Text>Male</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    borderRadius: 8, padding: 8, paddingRight: 15, width: '45%'}}>
                    <RadioButton.Android value='female'
                        status={form.gender === 'female' ? 'checked' : 'unchecked'} 
                        onPress={() => setForm({...form, gender: 'female'})}  
                    />
                    <Text>Female</Text>
                    </View>
              </View>
              
                <View style={{ flexDirection: 'row', gap: 15, paddingLeft: '5%', paddingRight: '5%' }}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', marginTop: 20 }}>About</Text>
                    <TouchableOpacity
                        style={{ borderRadius: 8, marginTop: 10, paddingBottom: 10,
                            flexDirection: 'row', width: '80%', flex: 1, flexGrow: 1, flexBasis: 0, borderBottomWidth: 1, width: '80%' }}
                        onPress={() => setEnableAbout(true)}
                    >
                        <TextInput 
                            value={ form.about }
                            editable={enableAbout}
                            multiline={true}
                            width='100%'
                            scrollEnabled={true}
                            style={{ fontFamily: 'RobotoSerif_28pt-Regular', width: '100%', flex: 1, flexGrow: 1, flexBasis: 0 }}
                            onChangeText={(e) => setForm({...form, about: e})}
                        />
                    </TouchableOpacity>
                </View>
                {user.user.user_metadata.role === 'professional' && (
                    <View>
                        <ProfileField
                            tag='License'
                            handleOnTap={() => setEnableLicense(true)}
                            value={form.license}
                            enabled={enableLicense}
                            handleTextChange={(e) => setForm({...form, license: e})}
                        />
                        <ProfileField
                            tag='Experience'
                            handleOnTap={() => setEnableExperience(true)}
                            value={form.experience}
                            enabled={enableExperience}
                            handleTextChange={(e) => setForm({...form, experience: e})}
                        />
                        <ProfileField
                            tag='Specialty'
                            handleOnTap={() => setEnableSpecialty(true)}
                            value={form.specialty}
                            enabled={enableSpecialty}
                            handleTextChange={(e) => setForm({...form, specialty: e})}
                        />
                    </View>    
                )}
                <CustomButton
                    title='Update profile'
                    handlePress={updateProfile}
                    //isLoading={loading}
                    style={{ minHeight: 55, backgroundColor: `${colors.TERTIARY}`,
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                    width: '90%', marginTop: 20, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
                    color='#480552'
                />
            </View>
        </ScrollView>

        <FocusAwareStatusBar backgroundColor={colors.TERTIARY} style='light'/>
    </SafeAreaView>
  )
}

export default UpdateProfile