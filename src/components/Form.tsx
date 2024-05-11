import React from 'react'
import logo from "../assets/icons/logo.svg";
import close from "../assets/icons/close.svg";

interface Props {
    children: React.ReactNode,
    title: string,
    footer: string,
    link: string,
    href: string,
    onSubmit : React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ children, title, footer, link, href, onSubmit }: Props) {
    return (
        <>
            <div className='flex flex-col bg-white rounded-3xl max-w-[500px] mx-4 md:mx-auto md:max-h-[750px] items-center p-10'>
                <nav className='ml-auto'>
                    <a href="/">
                        <img className="w-8 h-8 transition-transform transform-gpu hover:-translate-y-1" src={close} />
                    </a>
                </nav>
                <header>
                    <div className='flex flex-col items-center space-y-2'>
                        <a href="/">
                            <img src={logo} />
                        </a>
                        <h1 className='text-2xl font-bold'>{title}</h1>
                    </div>
                </header>

                <form onSubmit={onSubmit} className='flex flex-col mt-8 gap-3 w-full md:w-[350px]'>
                    {children}
                </form>

                <footer className="mt-6">
                    <p>{footer} <a className='font-bold underline' href={href}>{link}</a></p>
                </footer>
            </div>
        </>
    )
}