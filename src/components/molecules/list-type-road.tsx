import { useEffect, useState } from "react"
import ListLoading from "../atoms/list-loading"
import ItemButton from "../atoms/item-button"
import { toast } from "sonner"

type JenisJalan = {
    id: number
    jenisjalan: string
}

type ApiResponse = {
    code: number
    status: string
    "token-expired": number
    eksisting: JenisJalan[]
}

export default function ListTypeRoad() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<JenisJalan[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await fetch(`${import.meta.env.VITE_API_URL}/mjenisjalan`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })

                const payload: ApiResponse = await res.json()

                if (res.ok && payload.code === 200) {
                    setData(payload.eksisting)
                } else {
                    //   throw new Error("Gagal memuat data jenis jalan.")
                    toast.error("Gagal memuat jenis jalan")
                }
            } catch (err: any) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    if (isLoading) return <ListLoading />;


    return (
        <div>
            {data.map((item) => (
                <ItemButton>{item.jenisjalan}</ItemButton>
            ))}
        </div>
    )
}
