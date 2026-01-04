'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, Home, Wrench, User, Code, Lock, Cpu, Database, Wifi, Activity, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState<'scanning' | 'maintenance' | 'rebuilding'>('scanning');

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of katakana, hex, and symbols
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF<>{}[]/*-+!@#$%^&()═║╔╗╚╝░▒▓█';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.9) {
          ctx.fillStyle = '#00ff41';
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#00cc33';
        } else {
          ctx.fillStyle = '#008822';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    setTimeout(() => setShowContent(true), 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + Math.random() * 3;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // System status cycling
  useEffect(() => {
    const statuses: Array<'scanning' | 'maintenance' | 'rebuilding'> = ['scanning', 'maintenance', 'rebuilding'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setSystemStatus(statuses[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-30"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)',
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Main content */}
      <div className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Glitchy ABOUT text */}
        <div className="text-center mb-6 relative">
          <div className="inline-block px-4 py-1 border border-[#00ff41]/30 rounded mb-4 bg-black/50">
            <span className="text-[#00ff41]/60 text-xs font-mono tracking-widest flex items-center gap-2">
              <Lock className="h-3 w-3" />
              SECTOR LOCKED • ACCESS RESTRICTED
            </span>
          </div>
          
          <h1 
            className="text-[80px] sm:text-[120px] md:text-[150px] font-black text-[#00ff41] leading-none select-none tracking-tight"
            style={{
              textShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.4), 0 0 80px rgba(0, 255, 65, 0.2)',
              animation: 'textGlow 2s ease-in-out infinite',
            }}
          >
            ABOUT
          </h1>
          
          {/* Glitch layers */}
          <h1 
            className="absolute inset-0 text-[80px] sm:text-[120px] md:text-[150px] font-black text-cyan-400 leading-none select-none tracking-tight opacity-50"
            style={{
              clipPath: 'inset(30% 0 40% 0)',
              transform: 'translate(-3px, 3px)',
              animation: 'glitch1 0.2s infinite',
            }}
            aria-hidden="true"
          >
            ABOUT
          </h1>
          <h1 
            className="absolute inset-0 text-[80px] sm:text-[120px] md:text-[150px] font-black text-red-500 leading-none select-none tracking-tight opacity-50"
            style={{
              clipPath: 'inset(60% 0 10% 0)',
              transform: 'translate(3px, -3px)',
              animation: 'glitch2 0.2s infinite',
            }}
            aria-hidden="true"
          >
            ABOUT
          </h1>
        </div>

        {/* Terminal box */}
        <div 
          className="bg-black/90 border border-[#00ff41]/50 rounded-lg overflow-hidden shadow-2xl mb-6 w-full max-w-2xl backdrop-blur-sm"
          style={{
            boxShadow: '0 0 30px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.05)',
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 bg-black/90 border-b border-[#00ff41]/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-[#00ff41] shadow-lg shadow-[#00ff41]/50" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[#00ff41] text-sm font-mono flex items-center justify-center gap-2">
                <Terminal className="h-4 w-4" />
                0xadroit@security-terminal
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm space-y-1">
            <TypewriterLine delay={0} text="$ ./load_profile --user 0xadroit" color="text-gray-300" />
            <TypewriterLine delay={600} text="[*] Initializing security scan..." color="text-[#00ff41]" />
            <TypewriterLine delay={1200} text="[!] ERROR: Profile database offline" color="text-red-400" />
            <TypewriterLine delay={1800} text="[*] Attempting recovery..." color="text-yellow-400" />
            <TypewriterLine delay={2400} text="[!] Recovery failed: Resource unavailable" color="text-red-400" />
            <TypewriterLine delay={3000} text="[*] Status: UNDER MAINTENANCE" color="text-yellow-400" />
            <TypewriterLine delay={3600} text="[+] Recommendation: Return to secure zone" color="text-[#00ff41]" />
            <TypewriterLine delay={4200} text="[+] Recommendation: Return to secure zone" color="text-[#00ff41]" />
            <div className="flex items-center mt-2">
              <span className="text-[#00ff41]">root@0xadroit</span>
              <span className="text-gray-500">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-gray-500">$ </span>
              <span className="w-2 h-4 bg-[#00ff41] animate-pulse ml-1" />
            </div>
          </div>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-2xl mb-6">
          <StatusCard 
            icon={<AlertTriangle className="h-5 w-5" />} 
            label="Status" 
            value="MAINTENANCE MODE" 
            color="yellow"
          />
          <StatusCard 
            icon={<Shield className="h-5 w-5" />} 
            label="Security" 
            value="PROTECTED" 
            color="cyan"
          />
          <StatusCard 
            icon={<Activity className="h-5 w-5" />} 
            label="Recovery" 
            value="IN PROGRESS" 
            color="green"
          />
        </div>

        {/* Main message */}
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Wrench className="h-5 w-5 text-[#00ff41]" />
            This sector is under maintenance
          </h2>
          <p className="text-gray-400">
            The page you&apos;re looking for has been moved, deleted, or never existed. 
            Our security team is investigating the anomaly.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
            <span>System Recovery</span>
            <span>{Math.min(Math.floor(scanProgress), 100)}%</span>
          </div>
          <div className="h-2 bg-black/50 border border-[#00ff41]/30 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00ff41] to-cyan-400 transition-all duration-150"
              style={{ 
                width: `${Math.min(scanProgress, 100)}%`,
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              }}
            />
          </div>
          <div className="text-center text-xs font-mono text-[#00ff41]/60 mt-1">
            Scanning routes... {systemStatus === 'scanning' && '⠋'}
            {systemStatus === 'maintenance' && '⠙'}
            {systemStatus === 'rebuilding' && '⠹'}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-[#00ff41] hover:bg-[#00cc33] text-black rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
            }}
          >
            <Home className="h-5 w-5 group-hover:animate-pulse" />
            Return to Base
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 rounded-lg font-semibold transition-all hover:scale-105"
          >
            <Code className="h-5 w-5" />
            Go Back
          </Link>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-8 left-8 text-[#00ff41]/20 font-mono text-xs hidden lg:block">
          ╔══════════════╗<br/>
          ║ SECTOR: ABOUT ║<br/>
          ║ STATUS: MAINT ║<br/>
          ╚══════════════╝
        </div>
        <div className="absolute top-8 right-8 text-[#00ff41]/20 font-mono text-xs hidden lg:block text-right">
          ┌─────────────┐<br/>
          │ SYS_OFFLINE │<br/>
          │ ERR: 0x503  │<br/>
          └─────────────┘
        </div>
        <div className="absolute bottom-8 left-8 text-[#00ff41]/20 font-mono text-xs hidden lg:block">
          01010101 01001110<br/>
          01000100 01000101<br/>
          01010010 00100000<br/>
          01001101 01000001<br/>
          01001001 01001110<br/>
          01010100 00101110
        </div>
        <div className="absolute bottom-8 right-8 text-[#00ff41]/20 font-mono text-xs hidden lg:block text-right">
          [REBUILDING]<br/>
          Profile: 0xadroit<br/>
          ETA: Soon™<br/>
          Priority: HIGH
        </div>

        {/* Floating icons */}
        <FloatingIcon Icon={Cpu} delay={0} x={10} y={30} />
        <FloatingIcon Icon={Database} delay={1} x={85} y={25} />
        <FloatingIcon Icon={Wifi} delay={2} x={15} y={70} />
        <FloatingIcon Icon={User} delay={3} x={80} y={75} />
      </div>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes textGlow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(0, 255, 65, 0.8), 0 0 40px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 255, 65, 0.4);
          }
          50% { 
            text-shadow: 0 0 30px rgba(0, 255, 65, 1), 0 0 60px rgba(0, 255, 65, 0.8), 0 0 90px rgba(0, 255, 65, 0.6);
          }
        }
        @keyframes glitch1 {
          0%, 100% { transform: translate(-3px, 3px); opacity: 0.5; }
          20% { transform: translate(-5px, 5px); opacity: 0.3; }
          40% { transform: translate(-2px, 2px); opacity: 0.7; }
          60% { transform: translate(-4px, 4px); opacity: 0.4; }
          80% { transform: translate(-1px, 1px); opacity: 0.6; }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translate(3px, -3px); opacity: 0.5; }
          20% { transform: translate(5px, -5px); opacity: 0.3; }
          40% { transform: translate(2px, -2px); opacity: 0.7; }
          60% { transform: translate(4px, -4px); opacity: 0.4; }
          80% { transform: translate(1px, -1px); opacity: 0.6; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.5; }
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
      }, 25);
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

// Status card component
function StatusCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'yellow' | 'cyan' | 'green' }) {
  const colorClasses = {
    yellow: 'border-yellow-500/30 text-yellow-500',
    cyan: 'border-cyan-500/30 text-cyan-500',
    green: 'border-[#00ff41]/30 text-[#00ff41]',
  };

  return (
    <div className={`bg-black/50 border ${colorClasses[color].split(' ')[0]} rounded-lg p-3 backdrop-blur-sm`}>
      <div className={`flex items-center gap-2 ${colorClasses[color].split(' ')[1]} mb-1`}>
        {icon}
        <span className="text-xs font-mono">{label}</span>
      </div>
      <div className={`text-xs font-mono font-bold ${colorClasses[color].split(' ')[1]}`}>
        {value}
      </div>
    </div>
  );
}

// Floating icon component
function FloatingIcon({ Icon, delay, x, y }: { Icon: React.ElementType; delay: number; x: number; y: number }) {
  return (
    <div 
      className="absolute z-10 text-[#00ff41]/20 hidden md:block"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `float 4s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon className="h-8 w-8" />
    </div>
  );
}
