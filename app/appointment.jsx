import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import icons from '../constants/icons'
import CustomButton from '../components/CustomButton'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import { createAppointment, getDoctorAppointments } from '../lib/appointmentQueries'
import { useGlobalContext } from '../context/GlobalProvider'

const Appointment = () => {
    const { doctor_id } = useLocalSearchParams()
    const { user } = useGlobalContext()
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('')
    const [booking, setBooking] = useState({
        '8': false, '9': false, '10': false, '11': false,
        '1': false, '2': false, '3': false, '4': false
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
        value: date,
        onChange,
        mode: currentMode,
        is24Hour: true,
        minimumDate: (new Date()),
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {
        // Logic to get appointments for a particular day and grey out booked or past hours
        getDoctorAppointments(doctor_id, date.toString().slice(0, 15))
        .then(res => {
            const schedule = {
                '8': false, '9': false, '10': false, '11': false,
                '1': false, '2': false, '3': false, '4': false
            }
            res.map((data) => {
                const index = (data.time).split(':')[0]
                schedule[index] = true
            })
            if (date.toString().slice(0, 15) === (new Date()).toString().slice(0, 15)) {
                for (const prop in schedule) {
                    if (5 < Number(prop) && Number(prop)  <= Number(date.toString().slice(15, 18))) {
                        schedule[prop] = true
                    }

                    if (Number(prop) < 5 && (Number(prop) + 12) <= Number(date.toString().slice(15, 18))) {
                        schedule[prop] = true
                    }
                }
            }

            setBooking({...schedule})
        })
        .catch(err => console.log(err))
    }, [date])

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
                    <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 15 }}>Set a date and time</Text>
                </View>

                {/* code for picking date and time */}
                <View>
                    <View style={{ minHeight: 55, justifyContent: 'center', alignItems: 'center', borderRadius: 8, width: '90%', marginTop: 20,
                        alignSelf: 'center', borderWidth: 1, flexDirection: 'row', gap: 10, backgroundColor: '#e4e5e6' }}>
                        <Image source={icons.calendar} style={{ width: 30, height: 30 }} />
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 20 }}>{ date.toString().slice(0, 15) }</Text>
                    </View>

                    <CustomButton
                        title='Select a day'
                        handlePress={ showDatepicker }
                        style={{ minHeight: 55, backgroundColor: '#647bb5',
                        justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                        width: '90%', marginTop: 20, alignSelf: 'center' }}
                        color='white'
                    />

                    <View style={{ minHeight: 55, justifyContent: 'center', alignItems: 'center', borderRadius: 8, width: '90%', marginTop: 20,
                        alignSelf: 'center', borderWidth: 1, flexDirection: 'row', gap: 10, backgroundColor: '#e4e5e6' }}>
                        <Image source={icons.clock} style={{ width: 30, height: 30 }} />
                        <Text style={{ fontFamily: 'RobotoSerif_28pt-Regular', fontSize: 20 }}>{ time ? time : '---' }</Text>
                    </View>

                    <View style={{ flexDirection: 'row', width: '95%', gap: 20, justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                        <View style={{ width: '45%' }}>
                            <CustomButton
                                title='8:00am - 8:55am'
                                handlePress={() => booking['8'] ? null : setTime('8:00am - 8:55am') }
                                style={{ minHeight: 55, backgroundColor: `${booking['8'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['8'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='9:00am - 9:55am'
                                handlePress={() => booking['9'] ? null : setTime('9:00am - 9:55am') }
                                style={{ minHeight: 55, backgroundColor: `${booking['9'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['9'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='10:00am - 10:55am'
                                handlePress={() => booking['10'] ? null : setTime('10:00am - 10:55am') }
                                style={{ minHeight: 55, backgroundColor: `${booking['10'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['10'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='11:00am - 11:55am'
                                handlePress={() => booking['11'] ? null : setTime('11:00am - 11:55am') }
                                style={{ minHeight: 55, backgroundColor: `${booking['11'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['11'] ? 'black' : 'white'}
                            />
                        </View>
                        <View style={{ width: '45%' }}>
                            <CustomButton
                                title='1:00pm - 1:55pm'
                                handlePress={() => booking['1'] ? null : setTime('1:00pm - 1:55pm') }
                                style={{ minHeight: 55, backgroundColor: `${booking['1'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['1'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='2:00pm - 2:55pm'
                                handlePress={() => booking['2'] ? null : setTime('2:00pm - 2:55pm') }
                                style={{ minHeight: 55, backgroundColor: `${booking['2'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['2'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='3:00pm - 3:55pm'
                                handlePress={() => booking['3'] ? null : setTime('3:00pm - 3:55pm') }
                                style={{ minHeight: 55, backgroundColor: `${booking['3'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['3'] ? 'black' : 'white'}
                            />
                            <CustomButton
                                title='4:00pm - 4:55pm'
                                handlePress={() => booking['4'] ? null : setTime('4:00pm - 4:55pm') }
                                style={{ minHeight: 55, backgroundColor: `${booking['4'] ? '#e4e5e6' : '#647bb5'}`,
                                justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                                width: '100%', marginTop: 20, alignSelf: 'center' }}
                                color={booking['4'] ? 'black' : 'white'}
                            />
                        </View>
                    </View>
                    <CustomButton
                        title='Schedule appointment'
                        handlePress={() => {
                            createAppointment(date.toString().slice(0, 15), time, user.user.id, doctor_id)
                            router.push('home')
                        }}
                        style={{ minHeight: 55, backgroundColor: '#647bb5',
                        justifyContent: 'center', alignItems: 'center', borderRadius: 8,
                        width: '90%', marginTop: 30, alignSelf: 'center' }}
                        color='white'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Appointment