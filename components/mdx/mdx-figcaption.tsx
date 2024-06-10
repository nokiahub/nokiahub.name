import { ReactNode } from "react";
import { CopyCodeButton } from "@/components/mdx/copy-code-button";

type Props = {
  children: ReactNode;
  raw: string;
};

export const Figcaption = ({ children, raw, ...props }: Props) => {
  return (
    <figcaption
      {...props}
      className={"bg-background text-center text-sm text-gray-500"}
    >
      <div className={"flex justify-between"}>
        {children}
        <CopyCodeButton text={raw} />
      </div>
    </figcaption>
  );
};
