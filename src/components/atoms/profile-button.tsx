// import { Avatar,AvatarFallback } from "../ui/avatar";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();

            if (res.ok && json.meta?.code === 200) {
                toast.success(json.meta.message || "Berhasil logout");
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                toast.error(json.meta?.message || "Logout gagal");
            }
        } catch (err: any) {
            toast.error(err.message || "Terjadi kesalahan saat logout");
        }
    };

    return <Button onClick={handleLogOut}>Keluar</Button>;
}

// export default function ProfileButton() {
//     // return <Avatar>
//     //     <AvatarFallback>CN</AvatarFallback>
//     // </Avatar>
// }