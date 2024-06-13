import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/Themes'
import icons from '../constants/icons'

const Formfield = ({ title, handleTextChange, value, placeholder }) => {
    const [focused, setfocused] = useState(false)
    const [showPassword, setshowPassword] = useState(true)

  return (
    <View style={{ marginTop: 7 }}>
      <Text style={{ color: 'Black', fontSize: 13, fontFamily: "RobotoSerif_28pt-Regular" }}>{ title }</Text>
      <View style={{ 
        borderWidth: 1, borderRadius: 8,
        backgroundColor: `${colors.FIELDBKG}`, height: 50, marginTop: 10, marginBottom: 10, alignItems: 'center',
        justifyContent: 'center', flexDirection: 'row', padding: 6}}> 
        <TextInput 
            onFocus={() => setfocused(true)}
            secureTextEntry={ title === 'Password' && !showPassword}
            onChangeText={handleTextChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor='grey'
            style={{ flex: 1, color: `${colors.TEXT}`, fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 12}}
        />
        { title === 'Password' && (
            <TouchableOpacity
                onPress={() => setshowPassword(!showPassword)}
            >
                <Image source={showPassword ? icons.eye : icons.eyeHide} resizeMode='contain' style={{ width: 25 }}/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Formfield

const styles = StyleSheet.create({})