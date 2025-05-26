import { Button } from "../ui/button";

type Props = {
    children: string;
    isSelected: boolean;
    onClick: () => void;
}


export default function FilterButton({
    children,
    isSelected,
    onClick,
}: Props
) {
    return <Button onClick={onClick} variant={isSelected ? 'default' : 'outline'} size={"sm"} className="rounded-lg">
        {children}
    </Button>
}