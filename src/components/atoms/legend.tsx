

export default function Legend() {
    return (
        <div className="absolute z-20 right-2 top-10 flex flex-col gap-2">
            <div className="bg-background w-[150px] h-fit px-2 rounded-sm py-2 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <div className="w-[20px] h-[20px] bg-red-500"> </div>
                    <div className="font-semibold text-sm"> Jalan Provinsi</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-[20px] h-[20px] bg-blue-600"> </div>
                    <div className="font-semibold text-sm"> Jalan Kabupaten</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-[20px] h-[20px] bg-green-700"> </div>
                    <div className="font-semibold text-sm"> Jalan Desa</div>
                </div>
            </div>
            <div className="bg-background w-[150px] h-fit px-2 rounded-sm py-2 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                    <div className="w-[40px] h-[10px] bg-black rounded-lg"> </div>
                    <div className="font-semibold text-sm"> Baik</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex">
                        <div className="w-[20px] h-[10px] bg-black rounded-lg"> </div>
                        <div className="w-[20px] h-[10px] bg-black rounded-lg"> </div>
                    </div>
                    <div className="font-semibold text-sm"> Sedang</div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex">
                        <div className="w-[10px] h-[10px] bg-black rounded-lg"> </div>
                        <div className="w-[10px] h-[10px] bg-black rounded-lg"> </div>
                        <div className="w-[10px] h-[10px] bg-black rounded-lg"> </div>
                        <div className="w-[10px] h-[10px] bg-black rounded-lg"> </div>
                    </div>
                    <div className="font-semibold text-sm"> Rusak</div>
                </div>
            </div>
        </div>

    )
}