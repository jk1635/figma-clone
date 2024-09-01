import React from "react";
import ReactionButton from "@/components/reaction/ReactionButton";

type ReactionSelectorProps = {
  setReaction: (reaction: string) => void;
};

const ReactionSelector = ({ setReaction }: ReactionSelectorProps) => {
  return (
    <div
      className='absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full bg-white px-2'
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
