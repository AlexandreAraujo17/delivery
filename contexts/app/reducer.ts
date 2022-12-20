import { DataType, ActionType, Actions} from "./types";

export const reducer = (state: DataType, action: ActionType) => {
    switch (action.type) {
        case Actions.SET_TENANT:
            return { ...state, tenent: action.payload.tenent }
            break;
    
        default:
            return state;
    }
}