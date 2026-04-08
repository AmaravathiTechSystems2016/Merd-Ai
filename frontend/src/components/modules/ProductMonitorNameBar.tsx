"use client";

import { usePathname } from "next/navigation";

import { Heading, Text } from "@/components/atoms";
import { monitorAnalysisMock } from "@/lib/data/analysis/mock";

type MonitorContext = {
  label: string;
  monitorName: string;
};

function getMonitorContext(pathname: string): MonitorContext | null {
  if (pathname.startsWith("/dashboard")) {
    return {
      label: "Monitor",
      monitorName: monitorAnalysisMock.monitorName,
    };
  }

  if (pathname.startsWith("/monitor")) {
    return {
      label: "Monitor",
      monitorName: monitorAnalysisMock.monitorName,
    };
  }

  return null;
}

export function ProductMonitorNameBar() {
  const pathname = usePathname();
  const context = getMonitorContext(pathname);

  if (!context) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-[var(--content-width-page)] px-[var(--space-6)] pt-[var(--space-2)] md:px-[var(--space-10)] md:pt-[var(--space-3)]">
      <div className="flex flex-col gap-[var(--space-1)]">
        <Text size="label" tone="accent" weight="medium" caps>
          {context.label}
        </Text>
        <Heading size="h3">{context.monitorName}</Heading>
      </div>
    </section>
  );
}