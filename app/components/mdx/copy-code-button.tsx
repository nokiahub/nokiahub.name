"use client";

import { useState } from "react";

export const CopyCodeButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button className={"bg-pink-300 px-1"} disabled={isCopied} onClick={copy}>
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
