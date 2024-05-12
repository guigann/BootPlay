import Card from '@/components/Card';
import InfoCard from '@/components/InfoCard';
import NavBar from '@/components/NavBar'
import { integration_api } from '@/services/ApiService';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import file_video from '../../assets/icons/file-video.svg'
import dollar_sign from '../../assets/icons/dollar-sign.svg'
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/UseAuth';
import { Album } from '@/model/Album';

export default function Albums() {
    const { isAuthenticated, token } = useAuth();
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        if (isAuthenticated) {
            const toastId = toast.loading("Carregando...");

            integration_api.defaults.headers.common.Authorization = token;
            integration_api.get('/albums/my-collection').then((result) => {
                setAlbums(result.data);
                toast.dismiss(toastId);
                console.log(result.data);
            })
        }
    }, [isAuthenticated])


    const calculateTotalValue = () => {
        return albums.reduce((total, album) => total + (album.value || 0), 0); // Somando os valores dos álbuns
    }

    return (
        <>
            <NavBar auth />
            <main className='h-fit w-full'>
                <div id="content" className="flex flex-col justify-center m-20 gap-4" >
                    <div id="info" className='flex flex-col justify-start items-start gap-4'>
                        <h1 className="text-white font-bold text-4xl text-center sm:text-left">Meus Discos</h1>
                        <div id="infoCards" className='flex flex-row gap-4'>
                            <InfoCard icon={file_video} title='Total de Albums' info={`${albums.length}`} />
                            <InfoCard icon={dollar_sign} title='Valor Investido' info={`R$ ${(calculateTotalValue().toFixed(2)).toString().replace('.', ',')}`} />
                        </div>
                    </div>

                    <div id="cards" className=" max-w-screen-lg w-full overflow-hidden">
                        <div id="albums" className="flex flex-wrap flexmt-8 gap-4">
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
        </>
    )
}
