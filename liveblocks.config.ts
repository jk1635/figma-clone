// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import { LiveMap } from "@liveblocks/client";
import { ReactionEvent } from "@/types/type";

declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      cursor: { x: number; y: number } | null;
      message: string | null;
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      canvasObjects: LiveMap<string, any>;
    };

    UserMeta: {
      id: string;
      // Custom user info set when authenticating with a secret key
      info: {};
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: ReactionEvent;

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {};

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {};

    // Custom activities data for custom notification kinds
    ActivitiesData: {};
  }
}

// Necessary if you have no imports/exports
export {};
