"use client";

import { useState } from "react";

import { Role } from "@/types";
import { useLocale } from "next-intl";
import SidePanel from "./SidePanel";
import StandardSignIn from "./StandardSignIn";

export function SignInView() {
  return (
    <div className="min-h-[100dvh] flex">
      {/* ── LEFT PANEL (Form) ── */}
      <StandardSignIn role="customer" />

      {/* ── RIGHT PANEL (Image/SidePanel) ── */}
      <SidePanel role="customer" />
    </div>
  );
}
