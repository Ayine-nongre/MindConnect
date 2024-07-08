import {v4 as uuidv4} from 'uuid';
import { supabase } from './supabase';

// create a new post
export const createPost = async (post, user) => {
    const { data, error } = await supabase
    .from('posts')
    .upsert({ 
        id: uuidv4(), message: post.message, img_url: post.img_url, user_id: user.user.id
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

// get all posts from database
export const getPosts = async () => {
    const { data, error } = await supabase
    .from('posts')
    .select('id, message, img_url, user_id, patients(name, avatar_url)')

    if (error) {
        console.log(error)
        return error
    }

    return data
}

// get post from database using id
export const getPost = async (id) => {
    const { data, error } = await supabase
    .from('posts')
    .select('id, message, img_url, user_id, patients(name, avatar_url)')
    .eq('id', id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}