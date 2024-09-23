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
    <button
      className={
        "rounded-t bg-[#89b4fa] px-1 py-0.5 text-[#585b70] hover:bg-[#89b4fa]"
      }
      disabled={isCopied}
      onClick={copy}
    >
      {isCopied ? "Copied!" : "Copy"}
    </button>
  );
};
