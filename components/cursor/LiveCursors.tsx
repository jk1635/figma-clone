import Cursor from "@/components/cursor/Cursor";
import { COLORS } from "@/constants";
import { useOthers } from "@liveblocks/react";

const LiveCursors = () => {
  const others = useOthers();

  return others.map(({ connectionId, presence }) => {
    if (!presence?.cursor) return null;

    return (
      <Cursor
        key={connectionId}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message || ""}
      />
    );
  });
};

export default LiveCursors;
