'use client'
import { ExternalLink, Link } from 'lucide-react';
import React, { ElementType } from 'react'

function ConsumerNavItem({ href, icon: Icon, label, onClick }: {
  href: string; icon: ElementType; label: string; onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/65 hover:bg-white/[0.05] transition-all duration-150 cursor-pointer group">
        <Icon className="h-[17px] w-[17px] shrink-0 group-hover:text-white/60 transition-colors" />
        <span className="text-sm font-medium flex-1">{label}</span>
        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>
    </Link>
  );
}

export default ConsumerNavItem