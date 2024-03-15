import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  type: "primary" | "back" | "position";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // disabled?: boolean;
  // className?: string;
}

import styles from "./Button.module.css";

export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} 
      `}
    >
      {children}
    </button>
  );
}
