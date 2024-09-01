import React from "react";
import ReactionButton from "@/components/reaction/ReactionButton";

type ReactionSelectorProps = {
  setReaction: (reaction: string) => void;
};

const ReactionSelector = ({ setReaction }: ReactionSelectorProps) => {
  return (
    <div
      className='-translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white px-2'
      style={{
        boxShadow:
          "0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction='👍' onSelect={setReaction} />
      <ReactionButton reaction='🔥' onSelect={setReaction} />
      <ReactionButton reaction='😍' onSelect={setReaction} />
      <ReactionButton reaction='👀' onSelect={setReaction} />
      <ReactionButton reaction='😱' onSelect={setReaction} />
      <ReactionButton reaction='🙁' onSelect={setReaction} />
    </div>
  );
};

export default ReactionSelector;
