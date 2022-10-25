import '../styles/main.css';
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from '../components/formInput';
import { CreateAdModal } from '../components/createAdModal';

import roundLogo from '../assets/lol-logo.png'; 
import { ArrowRight, Handshake } from 'phosphor-react';

function LolStatus(){
    return (
        <div className='max-w-[1344px] mx-auto flex flex-col items-center my-10'>
            <img src={roundLogo} alt="" className='w-96' />
            <div className="flex flex-col gap-6 flex-1 text-white">
                <h2 className='text-3xl text-white font-black mt-10'>Digite o nome do player que você busca</h2>
                <Input name="NickName" id="NickName" placeholder="Digite o NickName do usuário" />
                <button
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center mx-48 gap-2 hover:bg-violet-600 text-black"
                >
                    Procurar Jogador
                    <ArrowRight className="w-6 h-6" />
                </button>
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