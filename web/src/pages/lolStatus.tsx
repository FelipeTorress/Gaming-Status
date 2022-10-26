import '../styles/main.css';
import roundLogo from '../assets/lol-logo.png';
import * as Dialog from '@radix-ui/react-dialog';

import { Input } from '../components/formInput';
import { CreateAdModal } from '../components/createAdModal';
import { FormEvent, useState } from "react";
import { ArrowRight, Handshake } from 'phosphor-react';
import { useNavigate } from "react-router-dom";

function LolStatus(){
    const navigate = useNavigate();

    async function handleSearchPlayer(event:FormEvent) {
        event.preventDefault()
        const [player, setPlayer] = useState({});
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        navigate("/player", { NickName: data.NickName} as never );
    }

    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-10'>
            <img src={roundLogo} alt="" className='w-96' />
            <div className="flex flex-col gap-6 flex-1 text-white">
                <h2 className='text-3xl text-white font-black mt-10'>Digite o nome do player que você busca</h2>
                <form onSubmit={handleSearchPlayer} className="mt-8 flex flex-col gap-4">
                    <Input name="NickName" id="NickName" placeholder="Digite o NickName do usuário"/>
                    <button
                        type="submit"
                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center mx-48 gap-2 hover:bg-violet-600 text-black"
                    >
                        Procurar Jogador
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </form>
            </div>

            <h5 className='mt-12 mb-4 text-4xl text-white font-black'>Gostaria de <span className='text-violet-500'>amigos para jogar?</span></h5>
            <p className='mb-4 text-2xl text-white font-black'>Utilize nosso sistema de Fazer times!</p>
            <Dialog.Root>
                <Dialog.Trigger
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                    <Handshake className="w-6 h-6" />
                    Buscar Time 
                </Dialog.Trigger>

                <CreateAdModal/>
            </Dialog.Root>

        </div>
    )
}

export default LolStatus