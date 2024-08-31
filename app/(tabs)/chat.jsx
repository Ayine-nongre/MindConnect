import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../../constants/icons'
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import { router } from 'expo-router'
import { ChannelList } from 'stream-chat-expo'
import { useGlobalContext } from '../../context/GlobalProvider'

const Chat = () => {
    const { user } = useGlobalContext()

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
          {/* header code */}
          <View style={{ backgroundColor: `${colors.SECONDARY}`, padding: 20, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', gap: 150}}>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Messages</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: '#f5f5f5' }}
                    onPress={() => router.push('professionals-page')}
                  >
                    <Image source={icons.add} resizeMode='contain' style={{ width: 20, height: 20 }}/>
                  </TouchableOpacity>
                </View>
          </View>

          {/* code to render chat list */}
          <ChannelList 
          filters={{ members: {$in: [user.user.id]}}}
          onSelect={(channel) => router.push({ pathname: 'chat-channel', params: { cid: channel.id }})}/>
        <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
      </SafeAreaView>
    )
}

export default Chat