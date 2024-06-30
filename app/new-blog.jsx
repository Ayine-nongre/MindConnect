import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../constants/icons'
import { router } from 'expo-router'
import FocusAwareStatusBar from '../components/FocusedStatusBar'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '../lib/supabase.ts'
import { decode } from 'base64-arraybuffer'
import { createBlog } from '../lib/blogQueries'
import { useGlobalContext } from '../context/GlobalProvider'


const NewBlog = () => {
    const { user } = useGlobalContext()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [form, setForm] = useState({
        title: '',
        message: '',
        img_url: null,
        category: value
    })

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
          const filePath = `blog/${fileName}`
    
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
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
            <ScrollView>
                {/* header code */}
                <View style={{ backgroundColor: `${colors.TERTIARY}`, flexDirection: 'row', alignItems: 'center', gap: 250, padding: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => router.back()}
                    >
                        <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        createBlog(form, user)
                        router.back()
                    }}>
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 15 }}>Post</Text>
                    </TouchableOpacity>
                </View>

                {/* categories */}
                <View>
                    <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20, flexDirection: 'row', gap: 20,
                        justifyContent: 'center', alignContent: 'center', padding: 15, backgroundColor: `${colors.TERTIARY}`
                     }}>
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 13, minWidth: '60%' }}>{value ? value : 'CHOOSE THE BLOG CATEGORY'}</Text>
                        <TouchableOpacity
                            onPress={() => setOpen(!open)}
                        >
                            <Image source={icons.dropdown} resizeMode='contain' style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    {open && (<View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', gap: 20,
                        justifyContent: 'center', alignContent: 'center', padding: 15, backgroundColor: '#fbe9fb'
                     }}>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('BIPOLAR DISORDER')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>BIPOLAR DISORDER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('STRESS')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>STRESS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('DEMENTIA')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>DEMENTIA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('INSOMNIA')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>INSOMNIA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('ANXIETY')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>ANXIETY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setValue('SCHIZOPHRENIA')
                                setOpen(false)
                            }}
                        >
                            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 12 }}>SCHIZOPHRENIA</Text>
                        </TouchableOpacity>
                    </View>)}
                </View>

                {/* Blog content */}
                <Text  style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 15, marginTop: 20, marginLeft: '10%' }}>Blog title:</Text>
                <View style={{ width: '80%', borderWidth: 1, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, marginTop: 5, height: 40,
                    padding: 10, borderColor: '#dcdcdc'
                 }}>
                    <TextInput
                        placeholder='write a blog title'
                        value={form.title}
                        onChangeText={(e) => setForm({...form, title: e})}
                    />
                </View>
                <Text  style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 15, marginTop: 20, marginLeft: '10%' }}>Blog body:</Text>
                <View style={{ width: '80%', borderWidth: 1, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10, marginTop: 5, height: 350,
                    padding: 10, borderColor: '#dcdcdc'
                 }}>
                    <TextInput
                        placeholder='write your blog content'
                        multiline={true}
                        value={form.message}
                        onChangeText={(e) => setForm({...form, message: e})}
                    />
                </View>
                <Text  style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 15, marginTop: 20, marginLeft: '10%' }}>Add blog image:</Text>
                <TouchableOpacity
                    style={{ marginLeft: '10%', backgroundColor: '#dcdcdc', width: '35%', padding: 10, height: 50, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 15, marginTop: 10
                     }}
                     onPress={pickImage}
                >
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>Choose image</Text>
                </TouchableOpacity>
                {form.img_url && (<Image source={{ uri: form.img_url }} resizeMode='contain' style={{ width: '80%', height: 200, marginTop: 20, marginLeft: '10%', marginBottom: 30 }} />)}
            </ScrollView>

            <FocusAwareStatusBar backgroundColor={colors.TERTIARY} style='light'/>
        </SafeAreaView>
    )
}

export default NewBlog