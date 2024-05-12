import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AlbumModel } from '@/model/AlbumModel';
import Button from './Button';
import spotify_logo from '../assets/imgs/spotify_logo.png';

interface Props {
    children: React.ReactNode;
    album: AlbumModel;
    disabled: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
}

export default function Modal({ children, album, disabled, onClick }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>

            <DialogContent className="flex flex-row p-0 m-0 border-0 sm:max-w-[600px] bg-white" style={{ borderRadius: '0.75rem' }}>
                <div style={{ '--bg-card': `url(${album.images?.[0].url}` } as React.CSSProperties} className="bg-[image:var(--bg-card)] bg-no-repeat bg-center bg-cover rounded-xl w-[50%]" />

                <div className="flex flex-col w-[50%] h-full pt-2 pr-4 space-y-20" >
                    <DialogTitle className='flex flex-col items-center mt-2 text-2xl font-semibold'>{album.name}</DialogTitle>
                    <DialogDescription className='mt-4'>
                        <p>
                            <b>Artistas: </b>
                            {album.artists?.map((artist, i) => (
                                <a key={i} href={artist.externalUrls.externalUrls.spotify} target='_blank'>
                                    <span className='text-[#1DB954]'>{artist.name}</span>
                                    <span>{album.artists?.length && i !== album.artists.length - 1 && ","}{" "}</span>

                                </a>
                            ))}
                        </p>
                        {album.releaseDate && (
                            <p><b>Data de lançamento:</b> {new Date(album.releaseDate).toLocaleDateString('pt-BR')}</p>
                        )}
                        <p><b>Preço:</b> R$ {(album.value || 0).toFixed(2).toString().replace('.', ',')}</p>
                        <p className='flex mt-4 items-center'><a href={`${album.externalUrls?.externalUrls.spotify}`} target='_blank'>Ouça no <span className='text-[#1DB954] underline inline-flex items-center'>Spotify <img className='w-4 h-4 ml-1 inline' src={spotify_logo} /></span> </a></p>

                    </DialogDescription>

                    <DialogFooter className='w-full pb-2'>

                        {disabled ?
                            <Button disabled bg_color="bg-[#9c884f]" size="w-full sm:w-full h-[40px] sm:h-[40px] text-[2vw] sm:text-base" className="hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-[#fae29b] dark:focus:ring-[#FBBC05]" type="submit">Você já possui esse album!</Button>
                            :
                            <Button onClick={onClick} bg_color="bg-[#FBBC05]" size="w-full sm:w-full h-[40px] sm:h-[40px] text-[2vw] sm:text-base" className="hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-[#fae29b] dark:focus:ring-[#FBBC05]" type="submit">Comprar</Button>
                        }

                    </DialogFooter>

                </div>
            </DialogContent>

        </Dialog>
    )
}
