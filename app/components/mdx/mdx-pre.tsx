import { CopyCodeButton } from "@/app/components/mdx/copy-code-button";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  raw: string;
};

export const Pre = ({ children, raw, ...props }: Props) => {
  return (
    <pre {...props} className={"p-4"}>
      <div className={"flex justify-end"}>
        <CopyCodeButton text={raw} />
      </div>
      {children}
    </pre>
  );
};
