import React, { useCallback, useEffect, useState } from "react";
import LiveCursors from "@/components/cursor/LiveCursors";
import { useOthers } from "@liveblocks/react/suspense";
import { useMyPresence } from "@liveblocks/react";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import CursorChat from "@/components/cursor/CursorChat";
import ReactionSelector from "@/components/reaction/ReactionSelector";
import FlyingReaction from "@/components/reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const [reaction, setReaction] = useState<Reaction[]>([]);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReaction((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
    }
  }, 100);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;

      updateMyPresence({ cursor: { x, y } });

      setCursorState((prevState) => {
        if (prevState.mode === CursorMode.Reaction) {
          return { ...prevState, isPressed: true };
        }
        return prevState;
      });
    },

    [cursorState.mode, setCursorState]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      setCursorState((prevState) => {
        if (prevState.mode === CursorMode.Reaction) {
          return { ...prevState, isPressed: true };
        }
        return prevState;
      });
    },
    [cursorState.mode, setCursorState]
  );

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  const setReactions = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className='flex h-[100vh] w-full items-center justify-center text-center'
    >
      <h1 className='text-2xl text-white'>Figma Clone</h1>

      {reaction.map((reaction) => (
        <FlyingReaction
          key={reaction.timestamp.toString()}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      ))}

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReactions} />
      )}

      <LiveCursors others={others} />
    </div>
  );
};
export default Live;
//     setCursorState((prevState) => {
//       if (prevState.mode === CursorMode.Reaction) {
//         return { ...prevState, isPressed: false };
//       }
//       return prevState;
//     });
//     console.log(cursorState.mode);
//     console.log("cursorState", cursorState);
//   },
//   [cursorState.mode, setCursorState]
// );
