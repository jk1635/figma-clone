import React, { memo } from "react";
import Image from "next/image";
import { ActiveElement, NavbarProps } from "@/types/type";
import ActiveUsers from "@/components/users/ActiveUsers";
import { navElements } from "@/constants";
import ShapesMenu from "@/components/ShapesMenu";
import { Button } from "@/components/ui/button";
import NewThread from "@/components/comments/NewThread";

const Navbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  const isActive = (value: string) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className='flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white'>
      <Image src='/assets/logo.svg' alt='Figma Logo' width={24} height={15} />

      <ul className='flex flex-row'>
        {navElements.map((item: ActiveElement | any) => (
          <li
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            className={`group flex items-center justify-center px-2.5 py-5 ${isActive(item.value) ? "bg-primary-green" : "hover:bg-primary-grey-200"}`}
          >
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : item?.value === "comments" ? (
              <NewThread>
                <Button className='relative h-5 w-5 object-contain'>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert" : ""}
                  />
                </Button>
              </NewThread>
            ) : (
              <Button className='relative h-5 w-5 object-contain'>
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  className={isActive(item.value) ? "invert" : ""}
                />
              </Button>
            )}
          </li>
        ))}
      </ul>
      <ActiveUsers />
    </nav>
  );
};

export default memo(
  Navbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
