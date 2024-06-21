import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../constants/Themes'

const CustomButton = ({ title, handlePress, isLoading, style, image, color }) => {
  return (
    <TouchableOpacity style={ style }
        activeOpacity={0.7}
        onPress={handlePress}
        disabled={isLoading}
    >
      { image && (
        <Image source={ image } resizeMode='contain' style={{ width: 25, height: 25, position: 'absolute', left: '7%' }}/>
      )}
      <Text style={{ color: `${color ? color : 'black'}`, fontFamily: 'RobotoSerif_28pt-Regular' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton