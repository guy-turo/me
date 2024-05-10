import {
    ADD_ME_REQUEST,
    ADD_ME_SUCCESS,
    ADD_ME_FAILURE,

    FETCH_ME_SUCCESS,
    FETCH_ME_REQUEST,
    FETCH_ME_FAILURE,

    DELETE_ME_REQUEST,
    DELETE_ME_SUCCESS,
    DELETE_ME_FAILURE,

    UPDATE_ME_REQUEST,
    UPDATE_ME_SUCCESS,
    UPDATE_ME_FAILURE
} from "./me_action_types"

const initialState = {
    loading: false,
    data: [],
    error: ""
}
const meReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ME_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_ME_SUCCESS:
            return {
                ...state,
                data: action.payload,
            }
        case ADD_ME_FAILURE:
            return {
                ...state,
                error: action.payload,
            }

        case FETCH_ME_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ME_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case FETCH_ME_FAILURE:
            return {
                ...state,
                error: action.payload
            }

        case UPDATE_ME_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ME_SUCCESS:
            return {
                ...state,
                data: action.payload
            }
        case UPDATE_ME_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
export default meReducer