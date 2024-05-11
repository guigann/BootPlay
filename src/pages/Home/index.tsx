import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import background from '../../assets/imgs/background.jpeg'
import Button from '../../components/Button'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/UseAuth'

export default function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated && <Navigate to="/dashboard" />}
            <NavBar />
            <main className="flex flex-col justify-center items-center relative h-screen bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
                <div className="absolute inset-0 z-10 overflow-hidden backdrop-brightness-50">
                    <div className="relative text-white flex flex-col justify-center h-full max-w-[50%]">
                        <div className="ml-16">
                            <h1 className='font-black text-7xl'>A história da música não pode ser esquecida!</h1>
                            <p className="mt-4 text-lg">Crie já sua conta e curta os sucessos que marcaram os tempos do Vinil.</p>
                            <a href='/signup'>
                                <Button bg_color="bg-gradient-to-b from-cyan-200 to-cyan-300" text="zinc-900" size="w-full sm:w-44 h-12 sm:h-[55px] text-[2vw] sm:text-base" className="mt-4 hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:focus:ring-cyan-500">
                                    Inscrever-se
                                </Button>

                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}
