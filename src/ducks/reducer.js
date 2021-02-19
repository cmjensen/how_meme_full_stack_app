import axios from 'axios'

const initialState = {
    favorited: []
}

const ADD_FAVORITE = 'ADD_FAVORITE'
const DELETE_FAVORITE = "DELETE_FAVORITE"

export const favorited = (memeInfo) => {
    let favorites = axios.post('/api/favorites', memeInfo).then(res => res.data)
    return {
        type: ADD_FAVORITE,
        payload: favorites
    }
}

export const unfavorite = (id) => {
    let favorites = axios.delete(`/api/favorites/${id}`).then(res => res.data)
    return {
        type: DELETE_FAVORITE,
        payload: favorites
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case ADD_FAVORITE + '_FULFILLED':
            return {favorited: payload}
        case DELETE_FAVORITE:
            return {favorited: payload}
        default:
            return state
    }
}

