"use client";
import React, { useEffect, useState } from "react";
import { TopNav } from "@/components/modules/monitor-workspace";

export function HeaderWithFade() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOpacity(y < 120 ? 1 - y / 120 : 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-7 z-[100] flex justify-center">
      <div className="pointer-events-auto w-full max-w-[1440px] px-6 md:px-8 xl:px-10" style={{ opacity }}>
        <TopNav />
      </div>
    </div>
  );
}
