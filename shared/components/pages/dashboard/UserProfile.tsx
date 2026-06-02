"use client";

import { useClerk, useUser } from "@clerk/react";
import { LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

function UserProfile() {
  const basePath = "";
  const { user } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations("Dashboard.Shell");
  return (
    <div className="border-t border-white/[0.07] p-3">
      {user ? (
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group cursor-default">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.firstName ?? ""}
              className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <User className="h-3.5 w-3.5 text-white/50" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white/80 truncate leading-tight">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[11px] text-white/30 truncate leading-tight mt-0.5">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <button
            onClick={() =>
              signOut({
                redirectUrl: `${window.location.origin}${basePath}/`,
              })
            }
            className="shrink-0 p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            title={t("signOut")}
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <Link href="/auth/sign-in">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors text-sm">
            <User className="h-4 w-4" /> {t("signIn")}
          </div>
        </Link>
      )}
    </div>
  );
}

export default UserProfile;
