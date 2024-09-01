import React, { memo } from "react";
import Image from "next/image";
import { NavbarProps } from "@/types/type";
import ActiveUsers from "@/components/users/ActiveUsers";

const Navbar = ({ activeElement }: NavbarProps) => {
  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
      <Image src='/assets/logo.svg' alt='Figma Logo' width={24} height={15} />
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
