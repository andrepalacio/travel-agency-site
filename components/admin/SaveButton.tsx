"use client"

import { useEditor } from "@/context/EditorContext";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

export function SaveButton() {
  const { saveChanges, isSaving } = useEditor();

  return (
    <Button 
      onClick={saveChanges} 
      disabled={isSaving}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex gap-2"
    >
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Guardando...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Publicar Cambios
        </>
      )}
    </Button>
  );
}