"use client";

import { useState } from "react";

import { Role } from "@/types";
import { useLocale } from "next-intl";
import SidePanel from "./SidePanel";
import StandardSignIn from "./StandardSignIn";

export function SignInView() {
  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("auth-role") as Role) || "customer";
    }
    return "customer";
  });
  const locale = useLocale();

  const handleChangeRole = (newRole: Role) => {
    setRole(newRole);
    if (typeof window !== "undefined" && newRole) {
      localStorage.setItem("auth-role", newRole);
    }
  };

  return (
    <div className="min-h-[100dvh] flex">
      {/* ── LEFT PANEL (Form) ── */}
      <StandardSignIn role={role} handleRoleChange={handleChangeRole} />

      {/* ── RIGHT PANEL (Image/SidePanel) ── */}
      <SidePanel role={role} />
    </div>
  );
}
