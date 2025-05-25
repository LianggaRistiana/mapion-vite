import { Button } from "../ui/button";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export default function ItemButton({ children, onClick }: Props) {

  return (
    <Button className='text-left w-full justify-start text-sm' variant='ghost' onClick={onClick}>
      {children}
    </Button>
  );
}
