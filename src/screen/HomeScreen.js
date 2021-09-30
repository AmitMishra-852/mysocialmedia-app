import React from 'react';
import "./HomeScreen.css"
import Feed from "../component/Feed";
import Righthomepage from "../component/Righthomepage";
import Header from '../component/Header';

function HomeScreen({click }) {
    return (
        <>
            <Header  click={click} />
            <div className="homeScreen">
                <div className="home">
                    <Feed />
                    <Righthomepage />
                </div>
            </div>
        </>
    )
}

export default HomeScreen;

