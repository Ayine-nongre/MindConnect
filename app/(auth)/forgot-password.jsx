import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import colors from '../../constants/Themes.js'
import Formfield from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setloading] = useState(false)

  return (
    <SafeAreaView>
        <View style={{ width: '100%', minHeight: '90%', justifyContent: 'center', padding: '5%'}}>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 23}}>Recover Password</Text>
            <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: `${colors.TEXT}`}}>Enter your registered password below to receive the reset code</Text>
            <Formfield
                value={email}
                handleTextChange={(e) => setEmail(e)}
                placeholder='Enter your email'
            />
            <CustomButton
                title="Next"
                //handlePress={() => router.push('/sign-in')}
                isLoading={loading}
                style={{ minHeight: 55, backgroundColor: `${colors.SECONDARY}`,
                  justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                  width: '100%', marginTop: 20 }}
            />
            <Link href='/sign-in' style={{ marginTop: 20, fontFamily: 'RobotoSerif_28pt-Regular', alignSelf: 'center'}}>Back</Link>
        </View>

        <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default ForgotPassword