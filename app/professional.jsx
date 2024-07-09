import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import icons from '../constants/icons'
import images from '../constants/images'
import { getProfessionalById } from '../lib/userQueries'
import CustomButton from '../components/CustomButton'

const Professional = () => {
    const params = useLocalSearchParams()
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProfessionalById(params.id)
        .then((res) => {
            setDoctor(res)
            setLoading(false)
        })
        .catch(err => console.log(err))
    },[])

    if (loading) {
        return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
            <ScrollView>
                {/* header code */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50, padding: 20, marginTop: 40 }}>
                    <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => router.back()}
                    >
                        <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15 }}>Professional's profile</Text>
                    </TouchableOpacity>
                </View>

                {/* professional's profile details */}
                <Image source={{ uri: doctor[0].avatar_url }} resizeMode='cover' style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center' }} />
                <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 25, marginTop: 10, textAlign: 'center' }}>{ doctor[0].name }</Text>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10, textAlign: 'center', color: `${colors.TERTIARY}` }}>{ doctor[0].specialization_area }</Text>

                <CustomButton
                    title='Message the professional'
                    // handlePress={() => {
                    // setUserData(data)
                    // router.push('update-profile')
                    // }}
                    style={{ minHeight: 55, backgroundColor: '#dcdcdc',
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                    width: '90%', marginTop: 20, alignSelf: 'center' }}
                    color='#480552'
                />

                {/* work experience and ratings */}
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 15 }}>
                    <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#ebf7a0', width: 100, padding: 10 }}>
                    <Image source={ icons.star } resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>4.99</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Reviews</Text>
                    </View>
                    <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#caf5cd', width: 100, padding: 10 }}>
                    <Image source={ icons.user } resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>500</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Patients</Text>
                    </View>
                    <View style={{ borderRadius: 10, alignItems: 'center', backgroundColor: '#a0f7a4', width: 100, padding: 10 }}>
                    <Image source={ icons.check } resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>{doctor[0].experience} years</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Experience</Text>
                    </View>
                </View>

                <Text style={{ fontFamily: 'RobotoSerif_28pt-Bold', fontSize: 20, marginTop: 15, marginLeft: 20 }}>About</Text>
                <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15, marginTop: 5, marginLeft: 20, width: 320 }}>{ doctor[0].about }</Text>
                    
                {/* License code */}
                <View style={{ backgroundColor: `${colors.FIELDBKG}`, width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10,
                    borderRadius: 10, padding: 5, justifyContent: 'center', alignItems: 'center'    
                }}>
                    <Image source={icons.license} resizeMode='contain' style={{ width: 25, height: 25 }} />
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular' }}>LPC</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#b345b3' }}>{doctor[0].license}</Text>
                    </View>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 10 }}>Registered in Ghana</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 8 }}>Licenses</Text>
                </View>

                <CustomButton
                    title='+ Book a date for consultation'
                    // handlePress={() => {
                    // setUserData(data)
                    // router.push('update-profile')
                    // }}
                    style={{ minHeight: 55, backgroundColor: '#00e04b',
                    justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                    width: '90%', marginTop: 20, alignSelf: 'center' }}
                    color='white'
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Professional