interface Props {
    icon: string;
    title: string;
    info: string;
}

export default function InfoCard({ icon, title, info }: Props) {
    return (
        <section>
            <div className="bg-white bg-cover bg-no-repeat rounded-xl shadow-white shadow-sm w-48 h-20 sm:w-48 sm:h-20 md:w-52 md:h-24 lg:w-54 lg:h-26 xl:w-60 xl:h-28">
                <div className="flex flex-row items-center h-full gap-4 p-4">
                    <div>
                        <img className="bg-black border-8 border-black rounded-full" src={icon} />
                    </div>

                    <div className="text-black font-semibold">
                        <span className="text-center text-base sm:text-lg">{title}</span>
                        <div>
                            <span className='text-xl sm:text-2xl'>{info}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
