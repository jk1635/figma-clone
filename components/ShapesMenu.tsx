import React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ShapesMenu = ({ item, activeElement, handleActiveElement }) => {
  const isDropdown = item.value.some((el) => el?.value === activeElement.value);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='no-ring'>
          <Button
            className='relative h-5 w-5 object-contain'
            onClick={() => handleActiveElement(item)}
          >
            <Image
              src={isDropdown ? activeElement.icon : item.icon}
              alt={item.name}
              fill
              className={isDropdown ? "invert" : ""}
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mt-5 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white'>
          {item.value.map((el) => (
            <button
              key={el?.name}
              onClick={() => handleActiveElement(el)}
              className={`flex h-fit justify-between gap-10 rounded-none px-5 py-3 focus:border-none ${activeElement.value === el.value ? "bg-primary-green" : "hover:bg-primary-grey-200"}`}
            >
              <div className='group flex items-center gap-2'>
                <Image
                  src={el?.icon}
                  alt={el?.name}
                  width={20}
                  height={20}
                  className={activeElement.value === el.value ? "invert" : ""}
                />
                <p
                  className={`text-sm ${activeElement.value === el?.value ? "text-primary-black" : "text-white"}`}
                >
                  {el?.name}
                </p>
              </div>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ShapesMenu;
