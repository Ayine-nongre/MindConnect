import { supabase } from "./supabase.ts"

//create a new professional account
export const createNewProfessional = async (id, user, gender) => {
    const { data, error } = await supabase
    .from('professionals')
    .upsert({ 
        id: id, name: user.name, phone: user.phone, gender: gender,
        license: user.license_no, experience: user.experience, specialization_area: user.specialty 
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

//create a new patient account
export const createNewPatient = async (id, user, gender) => {
    const { data, error } = await supabase
    .from('patients')
    .upsert({ 
        id: id, name: user.name, phone: user.phone, gender: gender
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

// fetch user data from database
export const fetchUser = async (user) => {
    const { data, error } = await supabase
    .from(user.user.user_metadata.role + 's')
    .select()
    .eq('id', user.user.id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}

// update a professional's data in database
export const updateProfessional = async (user, data) => {
    const { error } = await supabase
    .from('professionals')
    .update({ name: data.name, phone: data.phone, gender: data.gender, about: data.about, license: data.license, experience: data.experience, specialty: data.specialty, avatar_url: data.pfp })
    .eq('id', user.user.id)

    if (error) {
        console.log(error)
        return error
    }
}

//update a patient's data in database
export const updatePatient = async (user, data) => {
    const { error } = await supabase
    .from('patients')
    .update({ name: data.name, phone: data.phone, gender: data.gender, about: data.about, avatar_url: data.pfp })
    .eq('id', user.user.id)

    if (error) {
        console.log(error)
        return error
    }
}

//get user by id
export const getUserByID = async (id) => {
    const { data, error } = await supabase
    .from('professionals')
    .select('name, avatar_url')
    .eq('id', id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}