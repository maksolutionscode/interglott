import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { CreditsBar } from "./CreditsBar";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-24 max-w-lg mx-auto px-4 safe-area-pt safe-area-px">
        <div className="pt-3 pb-2">
          <CreditsBar />
        </div>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
