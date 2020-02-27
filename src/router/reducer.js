const initState = {
    name: "交银康联监控管理系统",
    version: '0.0.1',
    location: "上海",
    time: "2020-1-1 14:19:06"
}

export default function AppReducer(state = initState, action) {
    switch (action.type) {
        case "TEST":
            console.log(action.type)
            return Object.assign({}, state, action.data);
        default:
            return state
    }
}
