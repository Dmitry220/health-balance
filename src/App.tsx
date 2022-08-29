import React, {FC} from 'react';
import './assets/style/global.scss'
import AppRouter from "./provider/app-router";


function App() {

    return (
        <div className={'_container'}>
            <AppRouter />
        </div>

    );
}

export default App

