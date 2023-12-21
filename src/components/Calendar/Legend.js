const Legend = () => {

    return (
        <div className="flex justify-end items-center mt-8 gap-6">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-[#6D788D]`}></div>
                <p className="">Concluído</p>
            </div>

            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-[#26C6F9]`}></div>
                <p className="">Dentro do prazo</p>
            </div>

            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-[#FDB528]`}></div>
                <p className="">Vence hoje</p>
            </div>

            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-[#FF4D49]`}></div>
                <p className="">Vencido</p>
            </div>
        </div>
    )
}

export default Legend