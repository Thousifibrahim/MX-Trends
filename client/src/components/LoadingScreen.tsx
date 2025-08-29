import { useEffect, useState } from "react";
import { Store } from "lucide-react";
import { LOADING_DURATION, LOGO_ANIMATION_DELAY } from "@/lib/loadingConfig";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, LOGO_ANIMATION_DELAY);

    // Start fade out after configured duration
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, LOADING_DURATION);

    // Complete loading after fade animation
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, LOADING_DURATION + 1000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background with subtle glassmorphic effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Logo container */}
      <div
        className={`relative z-10 flex flex-col items-center space-y-6 transition-all duration-1000 ease-out ${
          logoVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Logo icon with glassmorphic background */}
        <div className="relative animate-scale-in">
          <div className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-3xl flex items-center justify-center border border-primary/20 shadow-2xl backdrop-blur-xl">
            <Store className="w-12 h-12 md:w-16 md:h-16 text-primary drop-shadow-lg" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl animate-pulse" />
          
          {/* Rotating ring */}
          <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl border-2 border-transparent bg-gradient-to-r from-primary/30 via-transparent to-accent/30 animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Brand name */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cyber-glow">
            MX Trends
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2 font-light">
            Modern E-commerce Experience
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex space-x-2 mt-8">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
