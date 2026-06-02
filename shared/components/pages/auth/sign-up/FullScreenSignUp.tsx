"use client";

import React from "react";
import { RoleSelector } from "./RoleSelector";
import { BG_EMOJIS } from "./data";

function FullScreenSignUp({
  handleChangeRole,
}: {
  handleChangeRole: (role: string) => void;
}) {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(249,115,22,0.22) 0%,transparent 65%)",
            bottom: "-100px",
            right: "-100px",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle,rgba(251,146,60,0.12) 0%,transparent 65%)",
            top: "5%",
            left: "-80px",
          }}
        />
      </div>
      {BG_EMOJIS.map((e, i) => (
        <span
          key={i}
          className={e.anim}
          style={{
            position: "fixed",
            top: e.top,
            left: e.left,
            fontSize: e.size,
            opacity: e.opacity,
            animationDelay: e.delay,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {e.emoji}
        </span>
      ))}
      <RoleSelector onSelect={handleChangeRole} />
    </>
  );
}

export default FullScreenSignUp;
