import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'
import FocusAwareStatusBar from '../components/FocusedStatusBar'
import { createPost } from '../lib/postQueries'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '../lib/supabase.ts'
import { decode } from 'base64-arraybuffer'
import { useGlobalContext } from '../context/GlobalProvider'
import { router } from 'expo-router'

const NewPost = () => {
    const { user } = useGlobalContext()
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({
        message: '',
        img_url: ''
    })

    const validateForm = (form) => {
        if (!form.message) throw new Error('Post must have a message')
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });

        setStatus('Submitting')
    
        if (!result.canceled) {
          const img = result.assets[0]
          const fileExt = (img.uri).split('.').pop()
          const fileName = `${Date.now()}.${fileExt}`
          const filePath = `post/${fileName}`
    
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
            
            setForm({...form, img_url: url.data.publicUrl});
            setStatus('done')
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
            <ScrollView>
                {/* header code */}
                <View style={{ backgroundColor: `${colors.SECONDARY}`, flexDirection: 'row', alignItems: 'center', gap: 250, padding: 20, marginTop: 40 }}>
                    <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => router.back()}
                    >
                        <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        try {
                            validateForm(form)
                            createPost(form, user)
                            router.back()
                        } catch (err) {
                            Alert.alert(err.message)
                        }
                        
                    }}>
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 15 }}>Post</Text>
                    </TouchableOpacity>
                </View>

                {/* Blog content */}
                <Text  style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginTop: 20, marginLeft: '10%' }}>What's on your mind?</Text>
                <View style={{ width: '85%', borderWidth: 1, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, marginTop: 5, height: 250,
                    padding: 10, borderColor: '#dcdcdc'
                 }}>
                    <TextInput
                        placeholder='Today was a beautiful day'
                        multiline={true}
                        value={form.message}
                        onChangeText={(e) => setForm({...form, message: e})}
                    />
                </View>
                <Text  style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginTop: 20, marginLeft: '10%' }}>Attach image</Text>
                <TouchableOpacity
                    style={{ marginLeft: 'auto', backgroundColor: '#dcdcdc', width: '85%', padding: 10, height: 50, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 5, marginTop: 10, marginRight: 'auto', flexDirection: 'row', gap: 10
                     }}
                     onPress={pickImage}
                >
                    <Image source={icons.upload} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>Upload image</Text>
                </TouchableOpacity>
                {(form.img_url && status === 'done') && (<Image source={{ uri: form.img_url }} resizeMode='contain' style={{ width: '80%', height: 200, marginTop: 20, marginLeft: '10%', marginBottom: 30 }} />)}
                {status === 'submitting' && (<ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>)}
            </ScrollView>

            <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
        </SafeAreaView>
    )
}

export default NewPost