import '../styles/main.css';

import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function Player(){
    const [player, setPlayer] = useState({});
    useEffect(()=>{
        const location = useLocation();
        const nickName = location;

        console.log(nickName);
        // axios(`http://localhost:3333/summoner/${nickName}`)
        //   .then(response => response.json())
        //     .then(data => {
        //         setPlayer(data);
        //     });
        
      }, []);
    async function handleSearchPlayer() {
    }

    return (
        <h1>Player</h1>
    )
}

export default Player