import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "@/components/cursor/LiveCursors";
import { useOthers } from "@liveblocks/react/suspense";
import { useMyPresence } from "@liveblocks/react";
import { CursorMode } from "@/types/type";
import CursorChat from "@/components/cursor/CursorChat";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();

  const [cursorState, setCursorState] = useState({
    mode: CursorMode.Hidden,
  });

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

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
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  );
};
export default Live;
