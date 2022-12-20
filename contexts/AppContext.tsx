import { createContext, ReactNode, useContext, useState } from "react"
import { Tenent } from "../types/Tenent"

type appContextType = {
    tenent: Tenent | null
    setTenent: (newTenent: Tenent) => void
}

const defaultValues: appContextType = {
    tenent: null,
    setTenent: () => {}
}

const appContext = createContext<appContextType>(defaultValues)
export const useAppContext = () => useContext(appContext) 

type Props = {
    children: ReactNode
}
export const AppContextProvider = ({ children }: Props) => {
    const [tenent, setTenent] = useState<Tenent | null>(null)

    return (
        <appContext.Provider value={{tenent, setTenent}}>
            {children}
        </appContext.Provider>
    )
}