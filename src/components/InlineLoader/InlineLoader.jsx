import React from "react";
import './InlineLoader.scss'

export const InLineLoader = () => {

  return (
    <div className="inline-loader_container" >
      <div className="dot" style={{animationDelay:'.1s'}} />
      <div className="dot" style={{animationDelay:'.2s'}} />
      <div className="dot" style={{animationDelay:'.3s'}} />
      <div className="dot" style={{animationDelay:'.4s'}} />
      <div className="dot" style={{animationDelay:'.5s'}} />
      <div className="dot" style={{animationDelay:'.6s'}} />
      <div className="dot" style={{animationDelay:'.7s'}} />
      <div className="dot" style={{animationDelay:'.8s'}} />
    </div>
  );
};
