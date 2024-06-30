import { View, Text, ActivityIndicator, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getBlog } from '../lib/blogQueries'
import FocusAwareStatusBar from '../components/FocusedStatusBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import icons from '../constants/icons'
import { getUserByID } from '../lib/userQueries'

const BlogPage = () => {
    const params = useLocalSearchParams()
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState(null)
    const [author, setAuthor] = useState(null)

    useEffect(() => {
        getBlog(params.id)
        .then((res) => {
            setBlog(res)
            getUserByID(res[0].user_id)
            .then((res) => {
                setAuthor(res)
                console.log(res)
                setLoading(false)
            })
        })
        .catch(err => console.log(err))
    }, [])

    if (loading) {
        return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
        <ScrollView>
            {/* header code */}
            <ImageBackground source={{ uri: blog[0].img_url }} resizeMethod='cover' style={{ width: '100%', height: 220, justifyContent: 'center', backgroundColor: 'lightblue' }}>
                <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}
                            onPress={() => router.back()}
                >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
            </ImageBackground>

            {/* author */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 15, marginTop: 15}}>
                <Image source={{ uri: author[0].avatar_url }} resizeMethod='contain' style={{ width: 50, height: 50, borderRadius: 100 }} />
                <View>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10, color: '#480552' }}>Written by {author[0].name}</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10, color: '#480552' }}>Lorem ipsum</Text>
                </View>
            </View>

            {/* blog details */}
            <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 20, width: 300, marginLeft: 15, marginTop: 30, color: '#480552' }}>{ blog[0].title }</Text>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, width: 330, marginLeft: 15, marginTop: 10, color: '#480552' }}>{ blog[0].message }</Text>
        </ScrollView>
        {/* <FocusAwareStatusBar style='light'/> */}
        </SafeAreaView>
    )
}

export default BlogPage