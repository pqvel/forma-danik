import { FC, ReactNode } from "react";

const sizes = {
  small: "max-w-2xl",
  medium: "max-w-5xl",
  large: "max-w-7xl",
};

type Props = {
  children: ReactNode;
  size?: "small" | "medium" | "large";
};

export const Container: FC<Props> = ({ children, size = "medium" }) => {
  return (
    <div className={`mx-auto max-w-5xl w-full px-3 ${sizes[size]}`}>
      {children}
    </div>
  );
};
