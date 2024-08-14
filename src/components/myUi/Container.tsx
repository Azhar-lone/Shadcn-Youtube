import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    // due to sidebar on medium screen move container from left 11% and
    // also make it width 85% to have 5% margin from sidebar
    // top one is for all
    // first is for large screen
    // second is for medium screen
    // third is for small screen
    <div
      className={cn(
        `
            md:w-[83%] md:ml-[17%]

sm:w-[90%] sm:ml-[10%]

            `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
