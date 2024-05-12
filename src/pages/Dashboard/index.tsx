import React, { FormEvent, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import banner from '../../assets/imgs/banner.jpeg'
import SearchBar from '../../components/SearchBar'
import Card from '../../components/Card'
import { integration_api } from '../../services/ApiService'
import { AlbumModel } from '../../model/AlbumModel'
import toast from 'react-hot-toast'
import './carousel.css'
import Modal from '@/components/Modal'
import { useAuth } from '@/hooks/UseAuth'
import { Album } from '@/model/Album'

export default function Dashboard() {
    const { token, id, email, password } = useAuth();

    const [albums, setAlbums] = useState<AlbumModel[]>([]);
    const [myAlbums, setMyAlbums] = useState<Album[]>([]);

    const [search, setSearch] = useState<string>();
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        const toastId = toast.loading("Carregando...");

        integration_api.defaults.headers.common.Authorization = token;
        integration_api.get('/albums/all?searchText=Rock').then((result) => {
            setAlbums(result.data);
            toast.dismiss(toastId);
            console.log(result.data);
        })
    }, [])

    useEffect(() => {
        const toastId = toast.loading("Carregando...");

        integration_api.defaults.headers.common.Authorization = token;
        integration_api.get('/albums/my-collection').then((result) => {
            setMyAlbums(result.data);
            toast.dismiss(toastId);
            console.log(result.data);
        })
    }, [])

    async function handleSearch(event: FormEvent) {
        event.preventDefault();
        const toastId = toast.loading("Carregando...");

        if (!search) {
            setIsSearching(false);
            return;
        }

        integration_api.defaults.headers.common.Authorization = token;
        await integration_api.get(`/albums/all?searchText=${search}`)
            .then(result => {
                setAlbums(result.data);
                console.log(result.data);
                setIsSearching(true);
                toast.dismiss(toastId);
            }).catch(error => {
                console.log(error);
            });
    }

    async function handleSale(event: React.MouseEvent<HTMLElement, MouseEvent>, album: AlbumModel) {
        event.preventDefault();
        const toastId = toast.loading("Realizando compra...");

        const data = {
            name: album.name,
            idSpotify: album.id,
            artistName: album.artists?.[0].name,
            imageUrl: album.images?.[0].url,
            value: album.value,
            users: {
                id: id,
                email: email,
                password: password
            }
        };

        integration_api.defaults.headers.common.Authorization = token;
        await integration_api.post('/albums/sale', data)
            .then(result => {
                console.log(result.data);
                toast.dismiss(toastId);
                toast.success("Compra realizada com sucesso!");

                setMyAlbums([...myAlbums, result.data]);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="relative flex flex-col">
                <NavBar auth />
                <header className="fixed flex flex-col justify-center items-center h-screen w-screen bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${banner})` }}>
                    <div className='h-screen w-screen backdrop-brightness-50'></div>
                </header>

                <div className="relative h-[50vh]">
                    <div className="relative flex flex-col justify-center text-white h-full sm:max-w-[50%] mt-20">
                        <div className="ml-16">
                            <h1 className='font-black text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl'>A história da música não pode ser esquecida!</h1>
                            <p className="mt-4 text-base sm:text-sm md:text-md lg:text-lg xl:text-xl">Sucessos que marcaram o tempo.</p>
                        </div>
                    </div>
                </div>

                <main className="relative h-fit bg-gradient-to-b from-transparent from-0 to-[rgba(25,24,31,1)] to-[30px]">
                    <div id="content" className="flex flex-col justify-center items-center inset-0 py-16" >

                        <SearchBar onClick={handleSearch} onChange={e => setSearch(e.target.value)} />

                        <div id="cards" className="my-2 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 max-w-screen-lg w-full overflow-hidden">
                            {isSearching ?
                                <>
                                    <h1 className="text-white font-bold text-4xl text-center sm:text-left">Resultado da busca:</h1>
                                    <div id="albums" className="flex flex-wrap justify-center mt-4 gap-4">
                                        {albums?.map((album, i) => {
                                            const alreadyHave = myAlbums.some(myAlbum => myAlbum.idSpotify === album.id);

                                            return (
                                                <Modal onClick={(e) => handleSale(e, album)} album={album} key={i} disabled={alreadyHave}>
                                                    <Card name={album.name || ''} price={album.value || 0} backgroundImage={album.images?.[0].url} />
                                                </Modal>
                                            );
                                        })}

                                    </div>

                                </>
                                :
                                <>
                                    <h1 className="text-white font-bold text-4xl text-center sm:text-left">Trends</h1>
                                    <div id="albums" className="carousel left-0 flex items-center mt-4 gap-4">
                                        {albums?.map((album, i) => {
                                            const alreadyHave = myAlbums.some(myAlbum => myAlbum.idSpotify === album.id);

                                            return (
                                                <Modal onClick={(e) => handleSale(e, album)} album={album} key={i} disabled={alreadyHave}>
                                                    <div style={{ width: `${100 / albums.length}%` }}>
                                                        <Card name={album.name || ''} price={album.value || 0} backgroundImage={album.images?.[0].url} />
                                                    </div>
                                                </Modal>
                                            );
                                        })}
                                    </div>
                                </>
                            }


                        </div>
                    </div>
                </main >

            </div >
            <Footer />
        </>
    )
}