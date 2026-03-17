"use client"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";

interface FormSheetProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly text: string;
  readonly children: React.ReactNode;
}

export function FormSidebar({ isOpen, onClose, text, children }: FormSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[25%] p-0 border-none bg-white overflow-y-auto">
        <div className="p-8 relative">
          {/* Logo */}
          <SheetTitle>
            <div className="flex justify-center mt-8 mb-6">
              <Image src="/logos/logo_slogan.png" alt="Expery Logo" width={240} height={120} />
            </div>
          </SheetTitle>

          <p className="text-center text-slate-600 text-sm mb-8 px-4">
            {text}
          </p>

          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}