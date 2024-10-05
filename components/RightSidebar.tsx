import React from "react";
import { RightSidebarProps } from "@/types/type";
import Dimensions from "@/components/settings/Dimensions";
import Color from "@/components/settings/Color";
import Export from "@/components/settings/Export";
import Text from "@/components/settings/Text";

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  isEditingRef,
  activeObjectRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  return (
    <section className='sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 max-sm:hidden'>
      <h3 className='px-5 pt-4 text-xs uppercase'>Design</h3>
      <span className='mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300'>
        Make changes to canvas as you like
      </span>

      <Dimensions />
      <Text />
      <Color />
      <Export />
    </section>
  );
};
export default RightSidebar;
