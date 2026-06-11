"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { Role } from "@/types";
import FullScreenSignUp from "./FullScreenSignUp";
import StandardSignUp from "./StandardSignUp";

export function SignUpView() {
  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("auth-role") as Role) || "customer";
    }
    return "customer";
  });

  const searchParams = useSearchParams();
  const handleChangeRole = (newRole: Role) => {
    setRole(newRole);
    if (typeof window !== "undefined" && newRole) {
      localStorage.setItem("auth-role", newRole);
    }
  };
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    const fallbackUrl = searchParams.get("sign_up_fallback_redirect_url");
    if (fallbackUrl) {
      try {
        const decoded = decodeURIComponent(fallbackUrl);
        if (decoded.includes("/merchant-setup")) {
          setRole("merchant");
        } else if (decoded.includes("/customer-setup")) {
          setRole("customer");
        }
      } catch (e) {
        console.error("Failed to parse fallback URL:", e);
      }
    }
    hasInitialized.current = true;
  }, [searchParams]);

  const isFullscreen = !role;

  return (
    <div
      className={`min-h-[100dvh] ${isFullscreen ? "flex flex-col items-center justify-center px-4 py-12" : "flex"}`}
      style={
        isFullscreen
          ? {
              background:
                "linear-gradient(145deg,#160800 0%,#2a1000 40%,#1a0a02 70%,#0d0500 100%)",
            }
          : {}
      }
    >
      {isFullscreen && <FullScreenSignUp handleChangeRole={handleChangeRole} />}

      {!isFullscreen && (
        <StandardSignUp role={role} handleChangeRole={handleChangeRole} />
      )}
    </div>
  );
}
