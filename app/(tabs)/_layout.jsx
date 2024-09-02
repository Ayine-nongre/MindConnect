import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Redirect, Tabs } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import AntDesign from '@expo/vector-icons/AntDesign'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const TabIcon = ({ name, icon, tintColor }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 2}}>
            <Image source={icon} resizeMode='contain' tintColor={tintColor} style={{ width: 20, height: 20 }} />
        </View>
    )
}

const TabLayout = () => {
  const { user } = useGlobalContext()

  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#F5F5F5',
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
          height: 60
        }
      }}
    >
        <Tabs.Screen name='home' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
                focused ? (<Entypo name="home" size={24} color='green' />) : (<AntDesign name="home" size={24} color="black" />)
            )
        }}/>
        <Tabs.Screen name='post' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                user.user.user_metadata.role !== 'patient' ? (
                    focused ? <FontAwesome5 name="calendar-day" size={24} color="green" /> : <AntDesign name="calendar" size={24} color="black" />
                ) : (
                    focused ? <MaterialIcons name="post-add" size={24} color="green" /> : <MaterialIcons name="post-add" size={24} color="black" />
                )
            )
        }}/>
        <Tabs.Screen name='blog' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                focused ? <Ionicons name="newspaper" size={24} color="green" /> : <FontAwesome6 name="newspaper" size={24} color="black" />
            )
        }}/>
        <Tabs.Screen name='chat' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                focused ? <Ionicons name="chatbubble-ellipses" size={24} color="green" /> : <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            )
        }}/>
        <Tabs.Screen name='profile' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                focused ? <FontAwesome name="user" size={24} color="green" /> : <AntDesign name="user" size={24} color="black" />
            )
        }}/>
    </Tabs>
  )
}

export default TabLayout