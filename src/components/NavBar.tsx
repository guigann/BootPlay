import logo from "../assets/icons/logo.svg"
import user from "../assets/imgs/user.png"
import Button from './Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '@/hooks/UseAuth';
import { useLocation } from 'react-router-dom';
import { Wallet } from "@/model/Wallet";

interface Props {
    auth?: boolean;
    wallet?: Wallet
}

export default function NavBar({ auth, wallet }: Props) {
    const { name, logout } = useAuth();

    const getNav = () => {
        if (auth) {
            return (
                <>
                    <a className='text-white text-lg sm:text-base hover:font-bold' href='/albums'>
                        {useLocation().pathname === '/albums' ? <b>Meus discos</b> : <p>Meus discos</p>}
                    </a>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <a className='text-white text-lg sm:text-base hover:font-bold' href='#'>
                                {useLocation().pathname === '/wallet' ? <b>Carteira</b> : <p>Carteira</p>}
                            </a>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="flex flex-col items-center bg-white backdrop-blur-lg border-0 rounded-xl text-zinc-900">
                            <DropdownMenuLabel>Carteira</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex flex-col items-start">
                                <span><b>Saldo:</b> R$ {(wallet?.balance || 0).toFixed(2).toString().replace('.', ',')}</span>
                                <span><b>Pontos:</b> {wallet?.points}</span>
                                {/* <span>{formatLastUpdate(wallet?.lastUpdate || '')}</span> */}
                                <span>Atualizada em {new Date(wallet?.lastUpdate || '').toLocaleDateString('pt-BR')}</span>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className='flex justify-start items-center space-x-2'>
                                <button className="flex items-center">
                                    <img className="w-8 h-8 sm:w-8 sm:h-8 rounded-2xl" src={user} alt="User" />
                                </button>
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="flex flex-col items-center bg-white backdrop-blur-lg border-0 rounded-xl text-zinc-900 w-16">
                            <DropdownMenuLabel>{name}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button onClick={logout}>Logout</button>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </>
            );
        } else
            return (
                <>
                    <a href='/login'>
                        <Button bg_color="bg-zinc-900" text="white" size="w-16 sm:w-36 h-4 sm:h-10 text-[2vw] sm:text-base" className="hover:bg-gradient-to-r from-zinc-800 to-zinc-900">
                            Entrar
                        </Button>
                    </a>
                    <a href='/signup'>
                        <Button bg_color="bg-gradient-to-b from-cyan-200 to-cyan-300" text="zinc-900" size="w-16 sm:w-36 h-4 sm:h-10 text-[2vw] sm:text-base" className="hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:focus:ring-cyan-500">
                            Inscrever-se
                        </Button>
                    </a>
                </>)
    }

    return (
        <nav className="flex justify-between items-center fixed top-0 left-0 w-full h-12 sm:h-8 md:h-10 lg:h-12 xl:h-14 bg-white bg-opacity-20 z-50 backdrop-blur-lg rounded-lg">
            <div className='flex justify-start items-center mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 space-x-2'>
                <a className="flex items-center" href='/'>
                    <img className="w-6 h-6 sm:w-8 sm:h-8" src={logo} alt="Logo" />
                    <span className="text-md sm:text-lg text-white font-bold">BootPlay</span>
                </a>
            </div>

            <div className='flex flex-row justify-end items-center mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 space-x-4'>
                {getNav()}
            </div>

        </nav>
    );

}
