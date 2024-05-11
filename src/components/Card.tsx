import React from 'react';

interface Props {
    name: string;
    price: number;
    backgroundImage: string | undefined;
}

export default function Card({ name, price, backgroundImage }: Props) {
    const name_str: string = (name.length > 18 ? name.substring(0, 18 - 3) + "..." : name.substring(0, 18)).toUpperCase();
    const price_str: string = price.toFixed(2).toString().replace('.', ',');
    return (
        <section>
            <div style={{ '--bg-card': `url(${backgroundImage}` } as React.CSSProperties} className="bg-[image:var(--bg-card)] bg-cover bg-no-repeat rounded-md w-56 h-56 sm:w-56 sm:h-56 md:w-62 md:h-62 lg:w-60 lg:h-60 xl:w-70 xl:h-70 hover:scale-110 transition">
                <div className="relative flex h-full justify-center items-center backdrop-brightness-50">
                    <h1 className="text-white text-center text-2xl font-bold">{name_str}</h1>
                    <div className="absolute bottom-0 right-0 p-4">
                        <h3 className="text-white text-lg font-semibold">R$ {price_str}</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}
