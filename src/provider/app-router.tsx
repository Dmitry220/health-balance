import React, { useEffect } from 'react';
import {privateRoutes, publicRoutes} from "./routes";
import {Routes, Route,} from "react-router-dom";
import {AuthPage} from "../pages/Authorization/Auth-page";
import {ActivityPage} from "../pages/Activity-page/Activity-page";
import { useAppDispatch, useAppSelector } from '../utils/hooks/redux-hooks';
import { checkAuth, isAuthSelector } from '../Redux/slice/authSlice';
import { setUserData } from '../Redux/slice/profileSlice';



const AppRouter = () => {

    const user = localStorage.getItem('token')
    const isAuth = useAppSelector(isAuthSelector)
    const dispatch= useAppDispatch()

    const idUser = Number(localStorage.getItem("id"))   

    useEffect(()=>{
       if(idUser){
            dispatch(checkAuth())                     
           // dispatch(setUserData(idUser))   
        }
           
    }, [])

console.log('app');


   

    return isAuth && user ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}, index) =>
                    <Route path={path} key={index} element={<Component />}/>
                )}
                <Route path={'*'}  element={<ActivityPage />}/>
            </Routes>
        ) :
        (
            <Routes>
                {publicRoutes.map(({path, Component}, index) =>
                    <Route path={path} key={index} element={<Component />}/>
                )}
                <Route path={'*'} element={<AuthPage />}/>
            </Routes>
        )
};

export default AppRouter;
