import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "RobotoSerif_28pt-Regular": require('../assets/fonts/RobotoSerif_28pt-Regular.ttf'),
    "RobotoSerif_28pt-SemiBold": require('../assets/fonts/RobotoSerif_28pt-SemiBold.ttf'),
    "RobotoSerif_28pt-Bold": require('../assets/fonts/RobotoSerif_28pt-Bold.ttf')

  })

  useEffect(() => {
    if (error) throw error;
  
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);
  
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
        <Stack.Screen name='index' options={{ headerShown: false}}/>
        <Stack.Screen name='(auth)' options={{ headerShown: false}}/>
        <Stack.Screen name='(tabs)' options={{ headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})