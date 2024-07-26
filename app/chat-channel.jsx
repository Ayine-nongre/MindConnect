import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'
import icons from '../constants/icons'

const ChatChannel = () => {
    const { cid } = useLocalSearchParams()
    const [channel, setChannel] = useState(null)
    const { client } = useChatContext()

    useEffect(() => {
        const fetchChannel = async () => {
            const channels = await client.queryChannels({ type: 'messaging', id: cid })
            setChannel(channels[0])
        }

        fetchChannel()
    }, [cid])

    if (!channel) {
        return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}`, marginTop: 35 }}>
            {/* header code */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50, padding: 10, marginTop: 0, position: 'absolute', zIndex: 99 }}>
                <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => router.back()}
                >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
            </View>
            <Channel channel={channel}>
                <MessageList />
                <MessageInput />
            </Channel>
        </SafeAreaView>
    )
}

export default ChatChannel