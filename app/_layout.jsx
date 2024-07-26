import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import GlobalProvider, { useGlobalContext } from '../context/GlobalProvider'
import { ChatProvider } from '../context/ChatProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <GestureHandlerRootView>
    <GlobalProvider>
      <ChatProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false}}/>
          <Stack.Screen name='(tabs)' options={{ headerShown: false}}/>
          <Stack.Screen name='(auth)' options={{ headerShown: false}}/>
          <Stack.Screen name='professionals-page' options={{ headerShown: false}}/>
          <Stack.Screen name='professional' options={{ headerShown: false}}/>
          <Stack.Screen name='new-post' options={{ headerShown: false}}/>
          <Stack.Screen name='post-page' options={{ headerShown: false}}/>
          <Stack.Screen name='new-blog' options={{ headerShown: false}}/>
          <Stack.Screen name='blog-page' options={{ headerShown: false}}/>
          <Stack.Screen name='update-profile' options={{ headerShown: false}}/>
          <Stack.Screen name='appointment' options={{ headerShown: false}}/>
          <Stack.Screen name='chat-channel' options={{ headerShown: false}}/>
        </Stack>
      </ChatProvider>
    </GlobalProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout