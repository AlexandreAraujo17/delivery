import { Dispatch, ReactNode } from "react"
import { Tenent } from "../../types/Tenent"

export type DataType = {
    tenent: Tenent | null
}

export type ActionType = {
    type: Actions
    payload?: any
}

export type ContextType = {
    state: DataType
    dispatch: Dispatch<ActionType>
}

export type ProviderType = {
    children: ReactNode
}

export enum Actions {
    SET_TENANT
}