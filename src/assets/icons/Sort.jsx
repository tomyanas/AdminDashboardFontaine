import React from "react";
export const Sort = ({ height = "24", width = "24" }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   height={height}
    //   width={width}
    //   viewBox="0 0 20 20"
    //   fill="currentColor"
    // >
    //   <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"

      height={height}
      width={width}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
      />
    </svg>
  );
};
