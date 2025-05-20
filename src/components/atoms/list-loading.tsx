import { Skeleton } from "../ui/skeleton";

export default function ListLoading() {
    return <div className="grid grid-cols-1 gap-2">
        <Skeleton className="w-[300px] pr-8 h-[20px] rounded-lg" />
        <Skeleton className="w-[300px] pr-8 h-[20px] rounded-lg" />
        <Skeleton className="w-[300px] pr-8 h-[20px] rounded-lg" />
    </div>
}