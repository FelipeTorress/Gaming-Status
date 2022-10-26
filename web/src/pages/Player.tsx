import '../styles/main.css';

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Player(){
    const [player, setPlayer] = useState({});
    const location = useLocation();
    useEffect(() => {
        const player = location.pathname.split('/')[2];
        axios(`http://localhost:3333/summoner/${player}`)
            .then(data => {
                setPlayer(data.data);
                console.log(data.data);
            });
      }, []);

    return (
        <h1>Player</h1>
    )
}

export default Player