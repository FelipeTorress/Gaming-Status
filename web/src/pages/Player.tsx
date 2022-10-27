import '../styles/main.css';

import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { CardTier } from '../components/cardTier';

import { champions } from '../components/championsId';

interface PlayerProps {
    id: string,
    accountId: string,
    name: string,
    profileIconId: number,
    summonerLevel: number,
    top3_mastery_champions: Array<ChampionProps>,
    elo: Array<any>
}

interface ChampionProps {
    championId: number,
    championLevel: number,
    championPoints: number,
    championPointsSinceLastLevel: number,
    championPointsUntilNextLevel: number,
    chestGranted: boolean,
    lastPlayTime: BigInt,
    summonerId: string,
    tokensEarned: number
}

function Player(){
    const [player, setPlayer] = useState<PlayerProps>();
    const location = useLocation();
    useEffect(() => {
        const player = location.pathname.split('/')[2];
        axios(`http://localhost:3333/summoner/${player}`)
            .then(data => {
                setPlayer(data.data);
                console.log(data.data);
                console.log(data.data.elo.length)
            });
    }, []);

    return (
        player?.name ?
            <div className='max-w-[1344px] mx-auto flex flex-col items-center'>
                <div className='mx-auto grid grid-cols-3 gap-20 items-center'>
                    {player.elo[0]?.queueType.indexOf("5x5") != -1 ?
                            <CardTier fila={0} player={player}/>
                        :
                            <CardTier fila={1} player={player}/>
                    }
                    <div className='mx-auto flex flex-col items-center mt-20'>
                        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${player.profileIconId}.png`} alt="" className='w-60 rounded-full pointer-events-none outline-double outline-3 outline-offset-2 outline-yellow-400'/>
                        <h1 className='text-4xl text-white font-black my-10'>{player.name}</h1>
                        <h1 className='text-2xl text-white font-black'>{"Level: "+ player.summonerLevel}</h1>
                    </div>

                    {(player.elo[1]?.queueType.indexOf("5x5") != -1) && player.elo.length > 1 ?
                            <CardTier fila={0} player={player}/>
                        :
                            <CardTier fila={1} player={player}/>
                    }
                </div>
                <div  className="mx-auto grid grid-cols-3 gap-10 items-center w-full bg-slate-900 mt-10 rounded-xl outline-double outline-3 outline-offset-2 outline-gray-400">
                    {
                        player.top3_mastery_champions.map(champ =>{
                            return(
                                <div key={champ.championId} className='mx-auto py-10 flex flex-col items-center'>
                                    <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/champion/${champions[champ.championId]}.png`} alt="" className='w-32 outline-double outline-3 outline-offset-2 outline-gray-400 rounded-full' />
                                    <h1 className='text-2xl text-white font-black mt-4'>{champions[champ.championId]}</h1>
                                    <p className='text-1xl text-white font-black mt-2'>{'Nível de Maestria: ' + champ.championLevel}</p>
                                    <p className='text-1xl text-white font-black mt-2'>{'Pontos de Maestria: ' + champ.championPoints}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        :
            <div className='max-w-[1344px] mx-auto flex flex-col items-center my-10'>
                <h1 className='text-5xl text-white font-black mt-20'>Carregando....</h1>
            </div>
    );
}

export default Player