import { ComponentPropsWithoutRef } from "react";

export function IconPlay({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      fill="#fff"
      height="25px"
      width="25px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M18,11v-1h-1V9h-2V7h-2V5h-2V3H5v18h6v-1v-1h2v-2h2v-2h2v-1h1v-1h1v-2H18z M13,13v2h-2v2H9v2H7V5h2v2h2v2h2v2h2v2H13z"></path>{" "}
      </g>
    </svg>
  );
}
