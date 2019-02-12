import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPLOAD_ITEM, ITEMS_LOADING, TOGGLE_EDIT } from './../actions/types';

const initialState = {
    items: [],
    loading: false,
    name: ''
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
        return {
            ...state,
            items: action.payload,
            loading: false
        }
        case DELETE_ITEM:
        return {
            ...state,
            items: state.items.filter(item => item._id !== action.payload)
        }
        case ADD_ITEM:
        return {
            ...state,
            items: [action.payload, ...state.items]
        }
        case UPLOAD_ITEM:
        const teste = state.items.map((item) => {
            if(item._id === action.id){
                return {
                    ...item,
                    name: action.payload.name
                }
            }
            else{
                return item
            }
        })
        return {
            ...state,
            items: teste
        }
        case ITEMS_LOADING:
        return {
            ...state,
            loading: true
        }
        case TOGGLE_EDIT:
        const items = state.items.map((item) => {
            if(item._id === action.payload){
                return {
                    ...item,
                    edit: !item.edit
                }
            }else{
                return item
            }
        })
        return {
            ...state,
            items: items
        }
        default:
          return state
    }
}