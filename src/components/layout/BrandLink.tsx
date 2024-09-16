"use client";

import { Package2 } from "lucide-react";
import Link from "next/link";

export default function BrandLink({
  displayName,
  className,
}: {
  className?: any;
  displayName: boolean;
}) {
  const finalClass = className
    ? className
    : "flex items-center gap-2 text-lg font-semibold md:text-base";

  return (
    <Link href="/" className={finalClass}>
      <Package2 className="h-6 w-6" />
      {displayName ? (
        <span>SaaS</span>
      ) : (
        <span className="sr-only">Acme Inc</span>
      )}
    </Link>
  );
}
