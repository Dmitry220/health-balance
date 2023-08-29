import {clearResults} from "../Redux/slice/authSlice";
import {persistor} from "../index";
import {LOGIN_ROUTE} from "../provider/constants-route";
import {useAppDispatch, useAppSelector} from "./redux-hooks";
import { Capacitor } from "@capacitor/core";
import Pedometer from "../plugins/pedometer";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import {isGoogleFitSelector} from "../Redux/slice/settingsSlice";
import { showToast } from "../utils/common-functions";
import { useDeleteTrackerMutation } from "../services/tracker.api";


export const useLogout = (isToken:boolean=false) => {

    const isGoogleFit = useAppSelector(isGoogleFitSelector)
    const dispatch = useAppDispatch()
    const [deleteTrackers] = useDeleteTrackerMutation()

    const clearData = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        await dispatch(clearResults())
        await persistor.purge()
        await window.location.replace(LOGIN_ROUTE)
    }

    const logout = async () => {
        try {
            if (Capacitor.getPlatform() === 'android') await GoogleAuth.signOut()

            if (Capacitor.getPlatform() === 'android' && isGoogleFit === 1) {
                await Pedometer.reset()
                await Pedometer.stop()
            }
            if(isToken){
                clearData()
                return
            }
            await deleteTrackers(null)
            clearData()

        } catch (error) {
            await showToast('Произошла ошибка удаления тркера')
        }
    }


    return [logout]
}