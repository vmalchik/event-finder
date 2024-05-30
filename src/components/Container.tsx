import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-white/[2%] flex flex-col">
      {children}
    </div>
  );
}
