"use client";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
};

export const Label: FC<Props> = ({ label, children }) => {
  return (
    <label className="">
      <div className="mb-2">{label}</div>
      {children}
    </label>
  );
};
