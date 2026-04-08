import type { ReactNode } from "react";

import { ProductHeader } from "@/components/modules";

export default function ProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <ProductHeader />

      {children}
    </div>
  );
}
