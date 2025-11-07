"use client";

import { GloveProvider } from "../../contexts/GloveContext";

interface GloveProviderWrapperProps {
  children: React.ReactNode;
}

export default function GloveProviderWrapper({ children }: GloveProviderWrapperProps) {
  return <GloveProvider>{children}</GloveProvider>;
}
