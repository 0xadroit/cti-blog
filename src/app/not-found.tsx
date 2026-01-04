'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glitchText, setGlitchText] = useState('404');
  const [showContent, setShowContent] = useState(false);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]/*-+!@#$%^&()';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Black background with opacity for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = '#22c55e';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary the green color for depth
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff'; // Occasional white flash
        } else if (brightness > 0.8) {
          ctx.fillStyle = '#4ade80'; // Bright green
        } else {
          ctx.fillStyle = '#22c55e'; // Normal green
        }

        ctx.fillText(char, x, y);

        // Reset drop when it goes off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    // Show content after delay
    setTimeout(() => setShowContent(true), 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Glitch effect for 404
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`';
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const glitched = '404'.split('').map(char => 
          Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText('404'), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Scanline effect overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Main content */}
      <div className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Glitchy 404 */}
        <div className="text-center mb-8 relative">
          {/* Main 404 */}
          <h1 
            className="text-[120px] sm:text-[180px] md:text-[220px] font-black text-primary-500 leading-none select-none tracking-tight"
            style={{
              textShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          >
            {glitchText}
          </h1>
          
          {/* Glitch layers */}
          <h1 
            className="absolute inset-0 text-[120px] sm:text-[180px] md:text-[220px] font-black text-cyan-500 leading-none select-none tracking-tight opacity-70"
            style={{
              clipPath: 'inset(20% 0 50% 0)',
              transform: 'translate(-4px, 4px)',
              animation: 'glitch1 0.3s infinite',
            }}
            aria-hidden="true"
          >
            404
          </h1>
          <h1 
            className="absolute inset-0 text-[120px] sm:text-[180px] md:text-[220px] font-black text-red-500 leading-none select-none tracking-tight opacity-70"
            style={{
              clipPath: 'inset(50% 0 20% 0)',
              transform: 'translate(4px, -4px)',
              animation: 'glitch2 0.3s infinite',
            }}
            aria-hidden="true"
          >
            404
          </h1>
        </div>

        {/* Terminal box */}
        <div className="bg-black/80 border border-primary-500/50 rounded-lg overflow-hidden shadow-2xl mb-8 w-full max-w-2xl backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.1)',
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-dark-900/90 border-b border-primary-500/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-primary-400 text-sm font-mono flex items-center justify-center gap-2">
                <Terminal className="h-4 w-4" />
                root@0xadroit:~
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm space-y-1">
            <TypewriterLine delay={0} text="$ ./scan_route --target /nonexistent" color="text-gray-300" />
            <TypewriterLine delay={600} text="[*] Initializing route scanner..." color="text-primary-400" />
            <TypewriterLine delay={1200} text="[*] Scanning network topology..." color="text-primary-400" />
            <TypewriterLine delay={1800} text="[!] ALERT: Route not found in routing table" color="text-red-400" />
            <TypewriterLine delay={2400} text="[!] ERROR CODE: 0x404 - RESOURCE_NOT_FOUND" color="text-red-400" />
            <TypewriterLine delay={3000} text="[*] Initiating recovery protocol..." color="text-yellow-400" />
            <TypewriterLine delay={3600} text="[+] Recovery mode: ACTIVE" color="text-primary-400" />
            <TypewriterLine delay={4200} text="[+] Recommendation: Return to known sector" color="text-primary-400" />
            <div className="flex items-center mt-2">
              <span className="text-primary-400">root@0xadroit</span>
              <span className="text-gray-500">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-500">$ </span>
              <span className="w-2 h-4 bg-primary-500 animate-pulse ml-1" />
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full">
          <Shield className="h-4 w-4 text-primary-500" />
          <span className="text-primary-400 text-sm font-mono">SECTOR UNDER MAINTENANCE</span>
          <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
        </div>

        {/* Message */}
        <div className="text-center mb-8 max-w-md">
          <p className="text-gray-400 text-lg">
            The page you seek has been <span className="text-red-400">deleted</span>, 
            <span className="text-yellow-400"> moved</span>, or 
            <span className="text-primary-400"> never existed</span>.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
            }}
          >
            <Home className="h-5 w-5 group-hover:animate-pulse" />
            Return to Base
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-primary-500/10 text-primary-400 border border-primary-500/50 rounded-lg font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
            View All Posts
          </Link>
        </div>

        {/* Binary decoration */}
        <div className="absolute bottom-4 left-4 text-primary-500/20 font-mono text-xs hidden md:block">
          01001110 01001111 01010100<br/>
          01000110 01001111 01010101<br/>
          01001110 01000100 00100001
        </div>
        <div className="absolute bottom-4 right-4 text-primary-500/20 font-mono text-xs hidden md:block text-right">
          ERR_404<br/>
          NOT_FOUND<br/>
          MAINTENANCE
        </div>
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes glitch1 {
          0%, 100% { transform: translate(-4px, 4px); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(-6px, 6px); }
          75% { transform: translate(-3px, 3px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(4px, -4px); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(6px, -6px); }
          75% { transform: translate(3px, -3px); }
        }
      `}</style>
    </div>
  );
}

// Typewriter effect component
function TypewriterLine({ delay, text, color }: { delay: number; text: string; color: string }) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setShowCursor(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          setShowCursor(false);
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  if (!displayText && !showCursor) return null;

  return (
    <div className={color}>
      {displayText}
      {showCursor && <span className="animate-pulse">▊</span>}
    </div>
  );
}
