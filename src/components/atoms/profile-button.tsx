import { logout } from '@/services/logutService'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout()
            localStorage.removeItem('token') 
            toast.success(res.meta.message || 'Berhasil logout')
            navigate('/login')
        } catch (err: any) {
            toast.error(err.message ?? 'Gagal logout')
        }
    }

    return <Button onClick={handleLogout}>Keluar</Button>;
}

// export default function ProfileButton() {
//     // return <Avatar>
//     //     <AvatarFallback>CN</AvatarFallback>
//     // </Avatar>
// }