import axios from "axios"
import { API_URL } from "../helper"

export const loginAction = (data) => {
    // console.log("ACTION ==> data dari sign in page :", data)
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const keepLogin = (token) => {
    return async (dispatch) => {
        try {
            // menjalankan axios
            let res = await axios.get(`${API_URL}/users/keep-login`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // cara menyimpan data kereducer
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: res.data.loginData
            })

            // conth pemanggilan fungsi action lain 
            // dispatch(getTransactionUser(res.data[0].id))

            // menyimpan data ke local storage
            localStorage.setItem("shopToken", res.data.loginData.token)
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}