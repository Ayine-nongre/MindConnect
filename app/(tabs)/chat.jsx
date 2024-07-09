import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import icons from '../../constants/icons'
import FocusAwareStatusBar from '../../components/FocusedStatusBar'
import { router } from 'expo-router'

const Chat = () => {

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
        <ScrollView>
          {/* header code */}
          <View style={{ backgroundColor: '#fdee82', padding: 20, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', gap: 150}}>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 25, marginLeft: 5 }}>Messages</Text>
                  <TouchableOpacity style={{ borderWidth: 1, borderRadius: 50, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: '#f5f5f5' }}
                    onPress={() => router.push('professionals-page')}
                  >
                    <Image source={icons.add} resizeMode='contain' style={{ width: 20, height: 20 }}/>
                  </TouchableOpacity>
                </View>
          </View>
        </ScrollView>
        <FocusAwareStatusBar backgroundColor='#fdee82' style='light'/>
      </SafeAreaView>
    )
}

export default Chat