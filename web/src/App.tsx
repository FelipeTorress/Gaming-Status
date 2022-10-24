import './styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { CardGame } from './components/cardGame';
import { useEffect, useState } from 'react';

import roundLogo from './assets/round-logo.svg'; 
import overwatch from './assets/ow.jpg';
import lol from './assets/lol.jpg';
import pubg from './assets/pubg.jpg';
import valorant from './assets/valora.jpg';
import { CreateAdModal } from './components/createAdModal';

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number;
  }
  activated: boolean
}

function App() {
  const[games, setGames] = useState<Game[]>([]);
  var [gamesIfNoBd,setGamesIfNoBd] = useState<any[]>([]);

  useEffect(()=>{
    fetch("http://localhost:3333/games")
      .then(response => response.json())
        .then(data => {
          setGames(data);
        });
    
    setGamesIfNoBd([{id: 1, title:'Overwatch', bannerUrl:overwatch, activated: false}]);
    setGamesIfNoBd(oldState => [...oldState, {id: 2, title:'League Of Legends', bannerUrl:lol, activated: true}]);
    setGamesIfNoBd(oldState => [...oldState, {id: 3, title:'PUBG Battlegrounds', bannerUrl:pubg, activated: false}]);
    setGamesIfNoBd(oldState => [...oldState, {id: 4, title:'Valorant', bannerUrl:valorant, activated: false}]);
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={roundLogo} alt="" />
      <h1 className='text-5xl text-white font-black mt-20'>Veja o status de players dos seus jogos favoritos!</h1>
      <div className='grid grid-cols-4 gap-4 mt-20'>
        {
        games.length > 0 ?
          games.map(game =>{
            return(
              <CardGame key={game.id} image={game.bannerUrl} gameName={game.title} activated={game.activated} />
            )
          })
        :
          gamesIfNoBd.map(game =>{
            return(
              <CardGame key={game.id} image={game.bannerUrl} gameName={game.title} activated={game.activated} />
            )
          })
        }
      </div>
      <Dialog.Root>
        <Dialog.Trigger className='mt-5 bg-white hover:bg-yellow-200'>
          CriarAnuncio
        </Dialog.Trigger>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
