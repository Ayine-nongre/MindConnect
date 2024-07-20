import {v4 as uuidv4} from 'uuid';
import { supabase } from './supabase';

// fetch all doctor's appointments using schedule
export const getDoctorAppointments = async (id, day) => {
    const { data, error } = await supabase
    .from('appointments')
    .select()
    .eq('doctor_id', id)
    .eq('day', day)

    if (error) {
        console.log(error)
        return error
    }

    return data
}

// create a new appointment
export const createAppointment = async (day, time, user_id, doctor_id) => {
    const { data, error } = await supabase
    .from('appointments')
    .upsert({
        id: uuidv4(), day: day, time: time, user_id: user_id, doctor_id: doctor_id
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

// fetch user's appointment
export const getUserAppointment = async (id) => {
    const { data, error } = await supabase
    .from('appointments')
    .select()
    .eq('user_id', id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}

// fetch all doctor's appointments including user's data
export const getDoctorAndUserAppointment = async (id) => {
    const { data, error } = await supabase
    .from('appointments')
    .select('day, time, patients(name)')
    .eq('doctor_id', id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}