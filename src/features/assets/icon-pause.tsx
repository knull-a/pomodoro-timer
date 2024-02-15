import { ComponentPropsWithoutRef } from "react";

export function IconPause({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg fill="#fff" width="25" height="25" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M18.432 7.5h4.547v17h-4.547zM9.022 7.5h4.545v17H9.022z"></path>
      </g>
    </svg>
  );
}
