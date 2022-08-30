import React from 'react';
import {privateRoutes, publicRoutes} from "./routes";
import {Routes, Route,} from "react-router-dom";
import {AuthPage} from "../pages/Authorization/Auth-page";
import {ActivityPage} from "../pages/Activity-page/Activity-page";


const AppRouter = () => {

    const user = true

    return user ?
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
