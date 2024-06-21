import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const ProfileField = ({ tag, value, handleOnTap, enabled, handleTextChange }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, paddingLeft: '5%', paddingRight: '5%' }}>
        <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', marginTop: 10 }}>{tag}</Text>
        <TouchableOpacity
            style={{ borderRadius: 8, height: 40, marginTop: 10, alignItems: 'center',
                flexDirection: 'row', borderBottomWidth: 1, width: '80%' }}
            onPress={handleOnTap}
        >
            <TextInput 
                value={ value }
                editable={enabled}
                multiline={true}
                width='100%'
                scrollEnabled={true}
                style={{ fontFamily: 'RobotoSerif_28pt-Regular', width: '100%' }}
                onChangeText={handleTextChange}
            />
        </TouchableOpacity>
    </View>
  )
}

export default ProfileField