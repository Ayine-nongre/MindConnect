import {v4 as uuidv4} from 'uuid';
import { supabase } from './supabase';

// create a new blog
export const createBlog = async (blog, user) => {
    const { data, error } = await supabase
    .from('blogs')
    .upsert({ 
        id: uuidv4(), title: blog.title, message: blog.message, img_url: blog.img_url, category: blog.category, user_id: user.user.id
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

// get all blogs from database
export const getBlogs = async () => {
    const { data, error } = await supabase
    .from('blogs')
    .select()

    if (error) {
        console.log(error)
        return error
    }

    return data
}

// get a blog using it's id from database
export const getBlog = async (id) => {
    const { data, error } = await supabase
    .from('blogs')
    .select()
    .eq('id', id)

    if (error) {
        console.log(error)
        return error
    }

    return data
}