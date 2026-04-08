import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  lg: "w-[12rem] md:w-[13.5rem]",
  md: "w-[10rem] md:w-[11rem]",
  sm: "w-[8.5rem] md:w-[9.5rem]",
} as const;

export type BrandMarkProps = {
  className?: string;
  href?: string;
  priority?: boolean;
  size?: keyof typeof SIZE_CLASSES;
};

export function BrandMark({
  className,
  href,
  priority = false,
  size = "md",
}: BrandMarkProps) {
  const logo = (
    <Image
      alt="MERD AI"
      className={cn("h-auto", SIZE_CLASSES[size], className)}
      height={360}
      priority={priority}
      src="/merd-ai-logo.svg"
      width={1200}
    />
  );

  if (!href) {
    return logo;
  }

  return (
    <Link aria-label="MERD AI" className="inline-flex items-center" href={href}>
      {logo}
    </Link>
  );
}
