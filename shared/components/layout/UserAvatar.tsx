import { useClerk, useUser } from "@clerk/react";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserAvatar() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const isRTL = locale === "ar";
  const isMerchant = user?.unsafeMetadata?.role === "merchant";
  const handleSignOut = () => {
    setOpen(false);
    signOut({ redirectUrl: `${window.location.origin}/` });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.firstName ?? "User"}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div
            className={`absolute ${isRTL ? "left-0" : "right-0"} top-11 z-50 bg-background border rounded-xl shadow-lg w-52 py-2 overflow-hidden`}
          >
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
              {isMerchant && (
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  <LayoutDashboard className="h-3 w-3" /> {t("badgeMerchant")}
                </span>
              )}
            </div>
            {isMerchant && (
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/dashboard");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                {t("btnMerchantDashboard")}
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left text-destructive"
            >
              <LogOut className="h-4 w-4" />
              {t("btnSignOut")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserAvatar;
