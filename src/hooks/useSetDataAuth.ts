import {resetFieldRegistration, setAuth} from "../Redux/slice/authSlice";
import {START_ROUTE} from "../provider/constants-route";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "./redux-hooks";
import {useOneSignal} from "./useOneSignal";
import {IAuthResponse} from "../models/IAuth";
import {showToast} from "../utils/common-functions";


export const useSetDataAuth = () => {
    let navigate = useNavigate()
    const {oneSignalInit} = useOneSignal()
    const dispatch = useAppDispatch()

    const setDataAuth = async (response:IAuthResponse) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id.toString())
        dispatch(setAuth())
        dispatch(resetFieldRegistration())
        oneSignalInit()
        navigate(START_ROUTE)
    }

    return {setDataAuth}
}