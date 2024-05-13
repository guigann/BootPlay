import Card from '@/components/Card';
import InfoCard from '@/components/InfoCard';
import NavBar from '@/components/NavBar'
import { integration_api, user_api } from '@/services/ApiService';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import file_video from '../../assets/icons/file-video.svg'
import dollar_sign from '../../assets/icons/dollar-sign.svg'
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/UseAuth';
import { Album } from '@/model/Album';
import { Wallet } from '@/model/Wallet';

export default function Albums() {
    const { isAuthenticated, token } = useAuth();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [wallet, setWallet] = useState<Wallet>()

    useEffect(() => {
        if (isAuthenticated) {
            const toastId = toast.loading("Carregando...");

            integration_api.defaults.headers.common.Authorization = token;
            integration_api.get('/albums/my-collection').then((result) => {
                setAlbums(result.data);
                toast.dismiss(toastId);
            })
        }
    }, [isAuthenticated])

    useEffect(() => {
        user_api.defaults.headers.common.Authorization = token;
        user_api.get('/wallet').then((result) => {
            setWallet(result.data);
        })
    }, [albums])


    const calculateTotalValue = () => {
        return albums.reduce((total, album) => total + (album.value || 0), 0);
    }

    return (
        <div className='flex flex-col-reverse min-h-screen max-h-fit'>
            <NavBar auth wallet={wallet} />
            <main className='grow w-full mb-10'>
                <div id="content" className="flex flex-col justify-center m-20 gap-4" >
                    <div id="info" className='flex flex-col justify-start items-start gap-4'>
                        <h1 className="text-white font-bold text-4xl text-center sm:text-left">Meus Discos</h1>
                        <div id="infoCards" className='flex flex-row flex-wrap gap-4'>
                            <InfoCard icon={file_video} title='Total de Albums' info={`${albums.length}`} />
                            <InfoCard icon={dollar_sign} title='Valor Investido' info={`R$ ${(calculateTotalValue().toFixed(2)).toString().replace('.', ',')}`} />
                        </div>
                    </div>

                    <div id="cards" className="m-auto max-w-screen-lg w-full overflow-hidden">
                        <div id="albums" className="flex flex-wrap mt-4 gap-4">
                            {(albums.length) ?
                                albums?.map((album, i) => (
                                    <Card key={i} name={album.name || ''} price={album.value || 0} backgroundImage={album.imageUrl || ''} />
                                )) :
                                <h1 className="text-white font-bold text-2xl text-center sm:text-left">Você ainda não possui nenhum album!</h1>}
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
