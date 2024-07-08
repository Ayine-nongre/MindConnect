import { View, Text, ActivityIndicator, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getPost } from '../lib/postQueries'
import icons from '../constants/icons'
import { createComment, getComments } from '../lib/commentQueries'
import { useGlobalContext } from '../context/GlobalProvider'

const PostPage = () => {
    const [loading, setLoading] = useState(true)
    const params = useLocalSearchParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')
    const { user } = useGlobalContext()
    const [postComments, setPostComments] = useState(null)

    useEffect(() => {
        getPost(params.id)
        .then((res) => {
            setPost(res)
            getComments(params.id)
            .then((res) => {
                setPostComments(res)
                setLoading(false)
            })
        })
        .catch(err => console.log(err))
    }, [postComments])

    const renderComments = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10, marginLeft: 20, marginTop: 10 }}>
                <Image source={{ uri: item.patients.avatar_url }} resizeMode='fill' style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: 'black' }} />
                <View>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ item.patients.name }</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', width: 300 }}>{ item.comment }</Text>
                </View>
            </View>
        )
    }

    if (loading) {
        return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
            {/* post code */}
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 20, marginTop: 60 }}>
                <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => router.back()}
                    >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Image source={{ uri: post[0].patients.avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 50, height: 50, borderWidth: 1, borderColor: 'grey' }}/>
                    <View>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ post[0].patients.name }</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: 'grey' }}>{ post[0].time }</Text>
                    </View>
                </View>
                </View>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginLeft: 25, width: '80%', marginTop: 10 }}>{ post[0].message }</Text>
                <Image source={{ uri: post[0].img_url }} resizeMode='cover' style={{ marginLeft: 25, marginTop: 5, borderRadius: 15, height: 180, width: 300 }} />
                <View style={{ flexDirection: 'row', gap: 10, marginLeft: 25, marginTop: 5 }}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>0 Likes</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{postComments.length} comments</Text>
                </View>
                {/* <View style={{ width: '100%', borderWidth: 1, marginTop: 10 }}></View> */}
            <View style={{ flexDirection: 'row', gap: 10, marginLeft: 40, marginTop: 10, alignItems: 'center' }} ></View>

            {/* No comments */}
            {!postComments && (<View style={{ flex: 1, top: '20%', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12, color: 'grey' }}>No comments</Text>
                </View>)}

            <FlatList
                data={postComments}
                renderItem={renderComments}
                keyExtractor={(postComments) => postComments.id}
            />

            {/* comment code */}
            <View
                style={{ 
                    borderRadius: 30, backgroundColor: 'white', width: '80%', shadowColor: 'black', shadowOffset: { width: -4, height: 8 },
                    height: 45, marginTop: 20, marginBottom: 7, shadowOpacity: 0.5, shadowRadius: 6, position: 'absolute',
                    paddingLeft: 20, flexDirection: 'row', padding: 6, right: '10%', bottom: 10 }}
            >
                <TextInput
                    placeholder="Leave a comment"
                    value={comment}
                    onChangeText={(e) => setComment(e)}
                    style={{ flex: 1, color: `${colors.TEXT}`, fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12}}
                />
                <TouchableOpacity
                    onPress={() => {
                        createComment(comment, user, params.id)
                        setComment('')
                        getComments(params.id)
                        .then((res) => {
                            setPostComments(res)
                        })
                        .catch(err => console.log(err))
                    }}
                >
                    <Image source={icons.submit} resizeMode='contain' style={{ width: 35, height: 35 }}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PostPage