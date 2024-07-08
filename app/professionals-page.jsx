import { router } from "expo-router"
import { Image } from "react-native"
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import icons from "../constants/icons"
import FocusAwareStatusBar from "../components/FocusedStatusBar"

const ProfessionalsPage = () => {
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

            <FocusAwareStatusBar backgroundColor={colors.SECONDARY} style='light'/>
        </SafeAreaView>
    )
}

export default ProfessionalsPage