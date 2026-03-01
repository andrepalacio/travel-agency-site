"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';
import { HomeData } from '@/types/home';
import { saveHomeContent } from "@/app/admin/actions";
import { toast } from "sonner";

interface EditorContextType {
  data: HomeData;
  updateSection: (section: keyof HomeData, newData: any) => void;
  isSaving: boolean;
  saveChanges: () => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode; 
  initialData: HomeData; 
}) {
  const [data, setData] = useState<HomeData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const saveChanges = async () => {
    setIsSaving(true);
    const result = await saveHomeContent(data);
  
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    
    setIsSaving(false);
  };

  // Función optimizada para actualizar cualquier sección del Home
  const updateSection = useCallback((section: keyof HomeData, newData: any) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  }, []);

  return (
    <EditorContext.Provider value={{ data, updateSection, isSaving, saveChanges }}>
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error("useEditor debe usarse dentro de un EditorProvider");
  return context;
};