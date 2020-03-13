
const initState={
    lists:[]
}

export default function ConfigReducer( state=initState, action ) {
    switch(action.type){
        case 'fetch_user_list_success':
            return{
                ...state,
            }
        default :
            return state
    }
}