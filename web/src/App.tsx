import './styles/main.css';
import roundLogo from './assets/round-logo.svg'; 
import overwatch from './assets/ow.jpg';
import lol from './assets/lol.jpg';
import pubg from './assets/pubg.jpg';
import valorant from './assets/valora.jpg';

interface CardGameProps{
  image: string;
  gameName: string;
  activated: boolean;
}

function CardGame({image, gameName, activated}: CardGameProps){
  return(
    <a href={activated ? "/ads" : "#"} className={"relative" + (activated ? "" : " hover:blur-sm hover:sepia hover:duration-200 cursor-not-allowed")}>
      <div id="card-game">
        <div className='z-10' style={{margin: 2}}>
          <img src={image} alt={gameName} className={"rounded-lg"} />
        </div>
      </div>
    </a>
  );
}


function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={roundLogo} alt="" />
      <h1 className='text-5xl text-white font-black mt-20'>Veja o status de players dos seus jogos favoritos!</h1>
      <div className='grid grid-cols-4 gap-4 mt-20'>
        <CardGame image={overwatch} gameName={'Overwatch'} activated={false} />
        <CardGame image={lol} gameName={'League Of Legends'} activated={true} />
        <CardGame image={pubg} gameName={'PUBG Battlegrounds'} activated={false} />
        <CardGame image={valorant} gameName={'Valorant'} activated={false} />
      </div>
    </div>
  )
}

export default App
