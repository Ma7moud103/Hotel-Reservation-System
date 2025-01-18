import { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
}
function Overlay({ children }: OverlayProps) {
  return (
    <div className="bg-overlay backdrop-blur-[2px] fixed   top-0 start-0 end-0 bottom-0 z-10 h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default Overlay;
