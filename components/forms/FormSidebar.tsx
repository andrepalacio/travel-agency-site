"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { X } from "lucide-react";

interface FormSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function FormSidebar({ isOpen, onClose, title, children }: FormSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[25%] p-0 border-none bg-white overflow-y-auto">
        <div className="p-8 relative">
          {/* Logo */}
          <div className="flex justify-center mt-8 mb-6">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center font-bold">LOGO</div>
          </div>

          <p className="text-center text-slate-600 text-sm mb-8 px-4">
            {title}
          </p>

          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}