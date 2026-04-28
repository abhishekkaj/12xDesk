"use client";

import { usePathname } from "next/navigation";
import { DesktopSidebar, MobileBottomNav } from "@/components/layout/sidebar";

export function NavigationWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <DesktopSidebar />
      <main className="lg:ml-[240px] min-h-screen pb-20 lg:pb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <MobileBottomNav />
    </>
  );
}
