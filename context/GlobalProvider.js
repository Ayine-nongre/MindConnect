import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState(null)

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
            console.log("Error: ", error)
            return null
        }
        return data
    }

    useEffect(() => {
        getUser()
        .then((res) => {
            if (res) {
                setUser(res)
                setIsLogged(true)
            } else {
                setUser(null)
                setIsLogged(false)
            }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLogged, setIsLogged, user, setUser, isLoading, userData, setUserData
            }}
        >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider