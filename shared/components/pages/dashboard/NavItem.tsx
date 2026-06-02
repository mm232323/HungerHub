'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ElementType } from 'react'

function NavItem({
  href, icon: Icon, label, exact = false, badge, onClick
}: {
  href: string; icon: ElementType; label: string; exact?: boolean; badge?: number; onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname?.startsWith(href);

  return (
    <Link href={href} onClick={onClick}>
      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer group ${active
          ? "bg-orange-500/15 text-orange-400"
          : "text-white/45 hover:text-white/90 hover:bg-white/[0.06]"
        }`}>
        <Icon className={`h-[18px] w-[18px] shrink-0 transition-colors ${active ? "text-orange-400" : "group-hover:text-white/80"}`} />
        <span className={`text-sm flex-1 ${active ? "font-semibold text-orange-300" : "font-medium"}`}>{label}</span>
        {badge != null && badge > 0 && (
          <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">
            {badge}
          </span>
        )}
        {active && !badge && (
          <span className="h-1.5 w-1.5 bg-orange-400 rounded-full" />
        )}
      </div>
    </Link>
  );
}



export default NavItem