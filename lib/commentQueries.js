import {v4 as uuidv4} from 'uuid';
import { supabase } from './supabase';

// create a new comment
export const createComment = async (comment, user, postID) => {
    const { data, error } = await supabase
    .from('comments')
    .upsert({ 
        id: uuidv4(), comment: comment, user_id: user.user.id, post_id: postID
    })
    .select()

    if (error) {
        console.log(error)
        return error
    }
}

// get comments using post id
export const getComments = async (postID) => {
    const { data, error } = await supabase
    .from('comments')
    .select('id, comment, patients(name, avatar_url)')
    .eq('post_id', postID)

    if (error) {
        console.log(error)
        return error
    }

    return data
}