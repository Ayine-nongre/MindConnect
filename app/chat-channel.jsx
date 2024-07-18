// import { View, Text, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useLocalSearchParams } from 'expo-router'
// import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'

// const ChatChannel = () => {
//     const { cid } = useLocalSearchParams()
//     const [channel, setChannel] = useState(null)
//     const { client } = useChatContext()

//     useEffect(() => {
//         const fetchChannel = async () => {
//             const channels = await client.queryChannels({ type: 'messaging', id: cid })
//             setChannel(channels[0])
//         }

//         fetchChannel()
//     }, [cid])

//     if (!channel) {
//         return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
//     }

//     return (
//         <Channel channel={channel}>
//             <MessageList />
//             <MessageInput />
//         </Channel>
//     )
// }

// export default ChatChannel