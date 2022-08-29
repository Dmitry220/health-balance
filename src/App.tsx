import React, {FC} from 'react';
import './assets/style/global.scss'
import AppRouter from "./provider/AppRouter";


function App() {

    return (
        <div className={'_container'}>
            <AppRouter />
        </div>

    );
}

export default App

