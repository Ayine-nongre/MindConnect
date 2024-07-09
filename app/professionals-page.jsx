import { Link, router } from "expo-router"
import { ActivityIndicator, FlatList, Image } from "react-native"
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import icons from "../constants/icons"
import FocusAwareStatusBar from "../components/FocusedStatusBar"
import { useEffect, useState } from "react"
import { getProfessionals } from "../lib/userQueries"

const ProfessionalsPage = () => {
    const [doctors, setDoctors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProfessionals()
        .then((res) => {
            setDoctors(res)
            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])

    const renderDoctors = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }} key={item.id}>
                <Image source={{ uri: item.avatar_url }} resizeMode='fill' style={{ borderRadius: 100, width: 60, height: 60, borderWidth: 1, borderColor: 'grey' }}/>
                <View style={{ marginLeft: 10}}>
                  <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold' }}>{ item.name }</Text>
                  <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginTop: 10 }}>
                    <Image source={icons.star} resizeMode='contain' style={{ width: 20, height: 20 }} />
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#f3e208' }}>{ item.rating }</Text>
                    <Text>|</Text>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: `${colors.PRIMARY}`, fontSize: 12 }}>{ item.specialty }</Text>
                  </View>
                </View>
                <TouchableOpacity
                    onPress={() => { router.push({ pathname: 'professional', params: { id: item.id } }) }}
                >
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', color: '#3fb779', marginLeft: 10 }}>View</Text>
                </TouchableOpacity>
            </View>
        )
    }

    if (loading) {
        return <ActivityIndicator size='large' style={{ marginTop: 'auto', marginBottom: 'auto' }}/>
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: `${colors.BACKGROUND}` }}>
            {/* header code */}
            <View style={{ backgroundColor: `${colors.SECONDARY}`, flexDirection: 'row', alignItems: 'center', gap: 20, padding: 20, marginTop: 40 }}>
                <TouchableOpacity style={{ backgroundColor: `${colors.FIELDBKG}`, borderRadius: 100, width: 20, height: 20, padding: 15, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => router.back()}
                >
                    <Image source={icons.back} resizeMode='contain' style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 20 }}>Professionals</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontFamily: 'RobotoSerif_28pt-SemiBold', fontSize: 20, marginTop: 10, marginLeft: 20 }}>All professionals</Text>

            <FlatList
                data={doctors}
                renderItem={renderDoctors}
                keyExtractor={(doctors) => {doctors.id}}
                id={(doctors) => doctors.id}
            />

            <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
        </SafeAreaView>
    )
}

export default ProfessionalsPage