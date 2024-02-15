import cn from "classnames";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
  variant?: "outline" | "primary" | "no-bg";
} & ComponentPropsWithoutRef<"button"> &
  PropsWithChildren;

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const className = cn({
    [styles.btn]: true,
    [styles[`btn-${variant}`]]: variant,
  });

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
