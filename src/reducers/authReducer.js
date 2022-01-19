const INITIAL_STATE = {
    idusers: null,
    email: "",
    role: ""
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("REDUCER ==> Data dari authAction :", action.payload)
            // proses penyimpanan ke globalStorage, menggunakan concatination
            return { ...state, ...action.payload }
        case "LOGOUT":
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}