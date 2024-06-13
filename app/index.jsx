import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Index</Text>
      <Link href='(auth)/sign-in'>Go to auth</Link>
    </View>
  )
}

export default Index