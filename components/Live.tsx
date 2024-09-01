import React, { useCallback } from "react";
import LiveCursors from "@/components/cursor/LiveCursors";
import { useOthers } from "@liveblocks/react/suspense";
import { useMyPresence } from "@liveblocks/react";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='flex h-[100vh] w-full items-center justify-center text-center'
    >
      <h1 className='text-2xl text-white'>Figma Clone</h1>
      <LiveCursors others={others} />
    </div>
  );
};
export default Live;
