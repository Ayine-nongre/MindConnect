import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '../../constants/icons'
import colors from '../../constants/Themes'

const TabIcon = ({ name, icon, tintColor }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 2}}>
            <Image source={icon} resizeMode='contain' tintColor={tintColor} style={{ width: 20, height: 20 }} />
        </View>
    )
}

const TabLayout = () => {
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
            tabBarIcon: ({ focused, color}) => (
                <TabIcon name='Home' icon={icons.home} color={focused ? 'white' : colors.PRIMARY} tintColor={colors.PRIMARY}/>
            )
        }}/>
        <Tabs.Screen name='post' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                <TabIcon name='Post' icon={icons.apps} focused={focused} tintColor={colors.SECONDARY} />
            )
        }}/>
        <Tabs.Screen name='blog' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                <TabIcon name='Blog' icon={icons.blog} focused={focused} tintColor={colors.TERTIARY} />
            )
        }}/>
        <Tabs.Screen name='chat' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                <TabIcon name='Messages' icon={icons.envelope} focused={focused} tintColor={colors.ACCENT} />
            )
        }}/>
        <Tabs.Screen name='profile' options={{
            headerShown: false,
            tabBarIcon: ({ focused, color}) => (
                <TabIcon name='Profile' icon={icons.user} focused={focused} tintColor={colors.TEXT} />
            )
        }}/>
    </Tabs>
  )
}

export default TabLayout