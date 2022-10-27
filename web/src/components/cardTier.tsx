import { Question } from 'phosphor-react';
interface CardTierProps {
    fila: number;
    player : PlayerProps;
}

interface PlayerProps {
    id: string,
    accountId: string,
    name: string,
    profileIconId: number,
    summonerLevel: number,
    top3_mastery_champions: Array<any>,
    elo: Array<any>
}

export function CardTier({fila, player}: CardTierProps){
    const tiersProps:any = {PROVISIONAL: ['Sem Elo', 'text-white'],BRONZE: ['Bronze','text-amber-700'], SILVER: ['Prata','text-gray-400'], GOLD: ['Ouro', 'text-yellow-400'], PLATINUM :['Platina', 'text-green-300'], DIAMOND:['Diamante', 'text-blue-600'], MASTER:['Mestre', 'text-green-200'], CHALLENGER:['Desafiante', 'text-blue-100']}
    return(
        player.elo[fila] != undefined ?
            <div className='mx-auto flex flex-col items-center mt-20 bg-slate-900 p-10 rounded-xl outline-double outline-3 outline-offset-2 outline-gray-400'>
                <h1 className='text-2xl text-white font-black mb-4'>{player.elo[fila].queueType.indexOf("5x5") != -1 ? 'Ranqueada Solo/Duo' : 'Ranqueada Flexível'}</h1>
                <p className={'text-2xl text-green-600 font-black '+`${tiersProps[player.elo[fila].tier][1]}`}>{tiersProps[player.elo[fila].tier][0]}</p>
                <img src={`../../public/tiers/${player.elo[fila].tier.toLowerCase() + "_" + player?.elo[fila].rank.toLowerCase()}.png`} alt="" className='w-56 pointer-events-none'/>
                <p className='text-2xl text-green-600 font-black'>{"PdL's: " +player.elo[fila].leaguePoints}</p>
                <p className='text-2xl text-green-600 font-black'>{'Vitorias: ' +player.elo[fila].wins}</p>
                <p className='text-2xl text-red-500 font-black'>{'Derrotas: ' +player.elo[fila].losses}</p>
            </div>
        :
            player.elo.length > 0 ?
                <div className='mx-auto flex flex-col items-center mt-20 bg-slate-900 p-10 rounded-xl outline-double outline-3 outline-offset-2 outline-gray-400'>
                    <h1 className='text-3xl text-white font-black mb-4'>{player.elo[0].queueType.indexOf("5x5") != -1 ? 'Ranqueada Flexível' : 'Ranqueada Solo/Duo' }</h1>
                    <h1 className='text-2xl text-white font-black mb-4'>Não há jogos nessa fila</h1>
                </div>
            :
                <div className='mx-auto flex flex-col items-center mt-20 bg-slate-900 p-10 rounded-xl outline-double outline-3 outline-offset-2 outline-gray-400'>
                    <Question className="w-6 h-6 text-white" />
                    <h1 className='text-2xl text-white font-black mt-4'>Sem dados de Rankeada</h1>
                </div>
    );
}