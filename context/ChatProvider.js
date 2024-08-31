import React, { useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider } from 'stream-chat-expo'
import { EXPO_PUBLIC_STREAM_API_KEY } from '@env'
import { useGlobalContext } from './GlobalProvider'
import { supabase } from '../lib/supabase'

export const ChatProvider = ({ children }) => {
    const client = StreamChat.getInstance(EXPO_PUBLIC_STREAM_API_KEY)
    const [loading, setLoading] = useState(true)
    const { user } = useGlobalContext()

    useEffect(() => {
        if (user) {
            const getDetails = async (user) => {
                const { data, error } = await supabase
                .from(user?.user?.user_metadata?.role + 's')
                .select('name, avatar_url, id')
                .eq('id', user?.user?.id)
            
                if (error) {
                    console.log(error)
                    return error
                }

                if (data && data.length > 0) {
                    await client.connectUser(
                        {
                            id: user?.user?.id,
                            name: data[0].name,
                            image: data[0].avatar_url,
                        },
                            client.devToken(user?.user?.id),
                    );
                }
            }

            getDetails(user)
            setLoading(false)
        }

            

        return () => {
            client.disconnectUser()
            setLoading(true)
        }
    }, [user])

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    )
}
