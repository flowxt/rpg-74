"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Composant magique : Traduction progressive runes -> texte !
function RuneToText({ 
  text, 
  delay = 0,
  className = "" 
}: { 
  text: string; 
  delay?: number;
  className?: string;
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [started, setStarted] = useState(false);
  
  // Map de caractères vers des runes similaires
  const charToRune: { [key: string]: string } = {
    'a': 'ᚨ', 'b': 'ᛒ', 'c': 'ᚲ', 'd': 'ᛞ', 'e': 'ᛖ', 'f': 'ᚠ',
    'g': 'ᚷ', 'h': 'ᚺ', 'i': 'ᛁ', 'j': 'ᛃ', 'k': 'ᚲ', 'l': 'ᛚ',
    'm': 'ᛗ', 'n': 'ᚾ', 'o': 'ᛟ', 'p': 'ᛈ', 'q': 'ᚲ', 'r': 'ᚱ',
    's': 'ᛊ', 't': 'ᛏ', 'u': 'ᚢ', 'v': 'ᚹ', 'w': 'ᚹ', 'x': 'ᛉ',
    'y': 'ᛃ', 'z': 'ᛉ', 'é': 'ᛖ', 'è': 'ᛖ', 'ê': 'ᛖ', 'à': 'ᚨ',
    'ô': 'ᛟ', 'û': 'ᚢ', 'î': 'ᛁ', 'ï': 'ᛁ', 'ù': 'ᚢ',
    ' ': ' ', ',': ',', '.': '.', '&': '&', "'": "'", '!': '!',
    '\n': '\n',
  };

  const charToRuneChar = (char: string): string => {
    const lower = char.toLowerCase();
    return charToRune[lower] || char;
  };

  useEffect(() => {
    // Délai avant de commencer la traduction
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    // Révéler un caractère à la fois
    if (revealedCount < text.length) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 50); // 50ms entre chaque caractère

      return () => clearTimeout(timer);
    }
  }, [started, revealedCount, text.length]);

  return (
    <span className={`inline ${className}`}>
      {text.split('').map((char, index) => {
        const isRevealed = index < revealedCount;
        const isSpace = char === ' ';
        const runeChar = charToRuneChar(char);
        
        return (
          <span 
            key={index} 
            className="relative inline-block"
            style={{ 
              width: isSpace ? '0.3em' : 'auto',
              minWidth: isSpace ? '0.3em' : 'auto',
            }}
          >
            {/* Rune character */}
            <span
              className={`
                transition-all duration-300
                ${isRevealed ? 'opacity-0 blur-sm scale-110' : 'opacity-100 blur-0 scale-100'}
              `}
              style={{
                color: '#d4a853',
                textShadow: !isRevealed ? '0 0 8px #d4a853, 0 0 16px #9b4dff' : 'none',
                position: isRevealed ? 'absolute' : 'relative',
                left: 0,
              }}
            >
              {isSpace ? '\u00A0' : runeChar}
            </span>
            
            {/* Real character */}
            <span
              className={`
                transition-all duration-300
                ${isRevealed ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-90'}
              `}
              style={{
                position: isRevealed ? 'relative' : 'absolute',
                left: 0,
              }}
            >
              {isSpace ? '\u00A0' : char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Floating runes component - L'effet préféré !
function FloatingRunes() {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛊ'];
  
  const [floatingRunes] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      rune: runes[Math.floor(Math.random() * runes.length)],
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 8,
      size: Math.random() * 1.5 + 1,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingRunes.map((r) => (
        <div
          key={r.id}
          className="rune"
          style={{
            left: `${r.left}%`,
            bottom: '-50px',
            fontSize: `${r.size}rem`,
            animationDelay: `${r.delay}s`,
            animationDuration: `${r.duration}s`,
          }}
        >
          {r.rune}
        </div>
      ))}
    </div>
  );
}

// Light mist for hero - version allégée
function LightMist() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="mist" style={{ top: '70%', animationDelay: '0s', opacity: 0.15 }} />
      <div className="mist" style={{ top: '85%', animationDelay: '7s', opacity: 0.1 }} />
    </div>
  );
}

// ============================================
// SECTION MAGIQUE - Tous les effets épiques
// ============================================

// Magical particles component
function MagicParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      type: Math.random() > 0.5 ? 'gold' : 'magic',
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${p.type === 'gold' ? 'particle-gold' : 'particle-magic'}`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Ember particles component
function EmberParticles() {
  const [embers] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: 30 + Math.random() * 40,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
      drift: (Math.random() - 0.5) * 80,
      size: Math.random() * 5 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((e) => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            bottom: '20%',
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            '--drift': `${e.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// Magic circles component
function MagicCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <div 
        className="magic-circle absolute"
        style={{
          width: '500px',
          height: '500px',
          animation: 'magicCircleRotate 30s linear infinite, magicCirclePulse 4s ease-in-out infinite',
        }}
      />
      <div 
        className="magic-circle absolute"
        style={{
          width: '380px',
          height: '380px',
          animation: 'magicCircleRotate 20s linear infinite reverse, magicCirclePulse 3s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
      <div 
        className="magic-circle absolute"
        style={{
          width: '260px',
          height: '260px',
          animation: 'magicCircleRotate 15s linear infinite, magicCirclePulse 2s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      <div 
        className="magic-circle absolute"
        style={{
          width: '140px',
          height: '140px',
          animation: 'magicCircleRotate 10s linear infinite reverse, magicCirclePulse 1.5s ease-in-out infinite',
          animationDelay: '0.5s',
        }}
      />
    </div>
  );
}

// 🎲 DÉ D20 STYLISÉ ET PROPRE
function D20Dice3D() {
  return (
    <div className="relative w-36 h-36" style={{ perspective: '800px' }}>
      {/* Glow effect behind */}
      <div 
        className="absolute inset-0 blur-3xl animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,83,0.5) 0%, rgba(155,77,255,0.2) 50%, transparent 70%)',
          transform: 'scale(2)',
        }}
      />
      
      {/* 3D Dice container - Single clean face that rotates */}
      <div 
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'diceFloat 4s ease-in-out infinite',
        }}
      >
        {/* Main visible face */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, #2a2018 0%, #1a1410 50%, #0f0c0a 100%)',
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            boxShadow: `
              inset 2px 2px 20px rgba(212,168,83,0.2),
              inset -2px -2px 20px rgba(0,0,0,0.5),
              0 0 40px rgba(212,168,83,0.3)
            `,
            animation: 'diceRotateSmooth 6s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner hexagon border */}
          <div 
            className="absolute inset-3 flex items-center justify-center"
            style={{
              clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
              border: '2px solid transparent',
              background: `linear-gradient(#1a1410, #1a1410) padding-box,
                          linear-gradient(135deg, #d4a853 0%, #f0d078 25%, #d4a853 50%, #b8860b 75%, #d4a853 100%) border-box`,
            }}
          />
          
          {/* Corner accents */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#d4a853] rounded-full opacity-60" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#d4a853] rounded-full opacity-60" />
          
          {/* Number */}
          <span 
            className="relative z-10 font-[var(--font-cinzel)] text-5xl font-bold select-none"
            style={{
              background: 'linear-gradient(180deg, #f0d078 0%, #d4a853 40%, #b8860b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(212,168,83,0.5))',
              textShadow: '0 0 30px rgba(212,168,83,0.8)',
            }}
          >
            20
          </span>
        </div>

        {/* Subtle 3D depth layers */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, #1a1410 0%, #0a0908 100%)',
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            transform: 'translateZ(-10px) scale(1.02)',
            opacity: 0.8,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, #0f0c0a 0%, #050403 100%)',
            clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
            transform: 'translateZ(-20px) scale(1.04)',
            opacity: 0.6,
          }}
        />
      </div>

      {/* Shadow on surface */}
      <div 
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full blur-xl opacity-60"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          animation: 'shadowPulse 4s ease-in-out infinite',
        }}
      />
      
      {/* Sparkle effects */}
      <div 
        className="absolute top-2 right-4 w-1 h-1 bg-[#f0d078] rounded-full"
        style={{ animation: 'sparkle 2s ease-in-out infinite' }}
      />
      <div 
        className="absolute bottom-8 left-6 w-1 h-1 bg-[#f0d078] rounded-full"
        style={{ animation: 'sparkle 2s ease-in-out infinite 0.5s' }}
      />
    </div>
  );
}

// Subtle particles for values section
function SubtleParticles() {
  const [particles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle particle-gold"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Central magical orb
function MagicOrb() {
  return (
    <div className="relative">
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(155,77,255,0.4) 0%, rgba(74,158,255,0.2) 50%, transparent 70%)',
          transform: 'scale(2)',
        }}
      />
      {/* Main orb */}
      <div 
        className="w-40 h-40 rounded-full animate-orb relative"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(155,77,255,0.6) 30%, rgba(74,158,255,0.4) 60%, rgba(212,168,83,0.3) 100%)',
          boxShadow: '0 0 60px rgba(155,77,255,0.6), 0 0 120px rgba(74,158,255,0.4), inset 0 0 60px rgba(255,255,255,0.2)',
        }}
      >
        {/* Inner light */}
        <div 
          className="absolute top-4 left-6 w-8 h-8 rounded-full bg-white/40 blur-sm"
        />
        {/* Swirling energy */}
        <div 
          className="absolute inset-2 rounded-full opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(155,77,255,0.8), transparent, rgba(74,158,255,0.8), transparent)',
            animation: 'magicCircleRotate 4s linear infinite',
          }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* ============================================ */}
      {/* HERO SECTION - Épuré avec runes flottantes */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#1a1410] to-[#0a0908]" />
        
        {/* Animated background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a853' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* ✨ RUNES FLOTTANTES */}
        <FloatingRunes />
        <LightMist />

        {/* Radial glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#d4a853]/8 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Dragon images */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-30 hover:opacity-50 transition-all duration-700 hover:scale-105">
          <Image
            src="/image/dragon.png"
            alt="Dragon"
            width={600}
            height={600}
            className="animate-float object-contain"
            priority
          />
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-30 hover:opacity-50 transition-all duration-700 hover:scale-105">
          <Image
            src="/image/dragon1.png"
            alt="Dragon"
            width={600}
            height={600}
            className="animate-float object-contain"
            style={{ animationDelay: '3s' }}
            priority
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-8">
            <span className="text-[#d4a853] text-2xl">🎭</span>
            <span className="text-[#f5f1e8]/80 font-[var(--font-crimson)] text-lg">Maître du Jeu professionnel & convivial</span>
          </div>

          {/* Main title */}
          <h1 
            className="font-[var(--font-cinzel)] text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <span className="text-[#f5f1e8] block mb-2">Découvrez le</span>
            <span className="text-gradient-gold animate-shimmer inline-block">Jeu de Rôle</span>
            <span className="text-[#f5f1e8] block mt-2">en ligne</span>
          </h1>

          {/* Ornament */}
          <div 
            className="flex items-center justify-center gap-4 my-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <span className="ornament" />
            <span className="text-[#d4a853] text-3xl">🐉</span>
            <span className="ornament" />
          </div>

          {/* ✨ SUBTITLE AVEC TRADUCTION PROGRESSIVE RUNES -> TEXTE ✨ */}
          <div 
            className="font-[var(--font-crimson)] text-xl md:text-2xl text-[#f5f1e8]/80 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <RuneToText 
              text="Plongez dans des aventures " 
              delay={1200}
            />
            <span className="text-[#d4a853] font-semibold">
              <RuneToText 
                text="Donjons & Dragons" 
                delay={1200}
              />
            </span>
            <RuneToText 
              text=" épiques." 
              delay={1200}
            />
            <br />
            <span className="block mt-2">
              <RuneToText 
                text="Une expérience " 
                delay={3500}
              />
              <span className="italic">
                <RuneToText text="accessible" delay={3500} />
              </span>
              <RuneToText text=", " delay={3500} />
              <span className="italic">
                <RuneToText text="immersive" delay={3500} />
              </span>
              <RuneToText text=" et " delay={3500} />
              <span className="italic">
                <RuneToText text="ludique" delay={3500} />
              </span>
              <RuneToText text="." delay={3500} />
            </span>
          </div>

          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <div className="text-center">
              <div className="font-[var(--font-cinzel)] text-4xl md:text-5xl font-bold text-[#d4a853]">50+</div>
              <div className="text-[#f5f1e8]/60 text-sm uppercase tracking-wider mt-1">Joueurs actifs</div>
            </div>
            <div className="w-px bg-[#d4a853]/30 hidden md:block" />
            <div className="text-center">
              <div className="font-[var(--font-cinzel)] text-4xl md:text-5xl font-bold text-[#d4a853]">500+</div>
              <div className="text-[#f5f1e8]/60 text-sm uppercase tracking-wider mt-1">Parties jouées</div>
            </div>
            <div className="w-px bg-[#d4a853]/30 hidden md:block" />
            <div className="text-center">
              <div className="font-[var(--font-cinzel)] text-4xl md:text-5xl font-bold text-[#d4a853]">30+</div>
              <div className="text-[#f5f1e8]/60 text-sm uppercase tracking-wider mt-1">Campagnes terminées</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            <button className="btn-primary animate-fire-glow">
              Rejoindre l&apos;aventure
            </button>
            <button className="btn-secondary">
              Découvrir les campagnes
            </button>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0908] to-transparent" />
      </section>

      {/* ============================================ */}
      {/* MAGIC SECTION - L'orbe, le dé 3D, les cercles */}
      {/* ============================================ */}
      <section className="relative py-32 px-6 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#0d0b09] to-[#0a0908]" />
        
        {/* ✨ EFFETS MAGIQUES */}
        <MagicParticles />
        <EmberParticles />
        <MagicCircles />

        {/* Decorative glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9b4dff]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a9eff]/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Orb and 3D Dice */}
            <div className="flex flex-col items-center justify-center gap-16">
              {/* Magic Orb */}
              <MagicOrb />
              
              {/* 🎲 DÉ D20 3D */}
              <D20Dice3D />
            </div>

            {/* Right side - Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 rounded-full glass text-[#9b4dff] text-sm uppercase tracking-widest mb-6">
                L&apos;essence du JDR
              </span>
              <h2 className="font-[var(--font-cinzel)] text-4xl md:text-5xl font-bold text-[#f5f1e8] mb-6">
                La <span className="text-gradient-gold animate-shimmer inline-block">Magie</span> opère
              </h2>
              <p className="font-[var(--font-crimson)] text-xl text-[#f5f1e8]/80 mb-8 leading-relaxed">
                Chaque lancer de dé peut changer le destin. Chaque décision ouvre de nouvelles possibilités. 
                Dans nos parties, la <span className="text-[#9b4dff]">magie</span> n&apos;est pas que dans les sorts... 
                elle est dans ces moments où tout le monde retient son souffle.
              </p>
              
              {/* Features list */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 glass p-4 rounded-xl group hover:border-[#d4a853]/40 transition-all">
                  <span className="text-2xl group-hover:animate-pulse-slow">🎲</span>
                  <div>
                    <h4 className="font-[var(--font-cinzel)] text-[#f5f1e8] font-semibold">Le hasard comme allié</h4>
                    <p className="text-[#f5f1e8]/60 text-sm">Les dés créent des moments inoubliables</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 glass p-4 rounded-xl group hover:border-[#9b4dff]/40 transition-all">
                  <span className="text-2xl group-hover:animate-pulse-slow">🔮</span>
                  <div>
                    <h4 className="font-[var(--font-cinzel)] text-[#f5f1e8] font-semibold">Immersion totale</h4>
                    <p className="text-[#f5f1e8]/60 text-sm">Des ambiances sonores et visuelles travaillées</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 glass p-4 rounded-xl group hover:border-[#4a9eff]/40 transition-all">
                  <span className="text-2xl group-hover:animate-pulse-slow">⚡</span>
                  <div>
                    <h4 className="font-[var(--font-cinzel)] text-[#f5f1e8] font-semibold">Suspense garanti</h4>
                    <p className="text-[#f5f1e8]/60 text-sm">Des rebondissements qui surprennent même le MJ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* VALUES SECTION */}
      {/* ============================================ */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#12100e] to-[#0a0908]" />
        
        {/* Subtle particles */}
        <SubtleParticles />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a853]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8b0000]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-2 rounded-full glass text-[#d4a853] text-sm uppercase tracking-widest mb-6">
              Ce qui nous définit
            </span>
            <h2 className="font-[var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f1e8] mb-6">
              Nos <span className="text-gradient-gold">Valeurs</span>
            </h2>
            <p className="font-[var(--font-crimson)] text-xl text-[#f5f1e8]/70 max-w-2xl mx-auto">
              Une philosophie de jeu centrée sur le plaisir, l&apos;immersion et le partage
            </p>
          </div>

          {/* Values grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Scène d&apos;expression
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Un espace où chaque joueur peut s&apos;exprimer librement et donner vie à son personnage dans une communauté bienveillante.
                </p>
              </div>
            </div>

            {/* Value Card 2 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">⚔️</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Rule of Cool
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Quand une idée est épique, elle mérite d&apos;être tentée. Ici, l&apos;audace et la créativité sont récompensées !
                </p>
              </div>
            </div>

            {/* Value Card 3 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">🌟</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Débutants bienvenus
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Pas besoin d&apos;expérience préalable. Chaque aventurier commence quelque part, et nous sommes là pour vous guider.
                </p>
              </div>
            </div>

            {/* Value Card 4 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">🎲</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Choix qui comptent
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Vos décisions et les dés façonnent l&apos;histoire. Chaque partie est unique, chaque aventure est la vôtre.
                </p>
              </div>
            </div>

            {/* Value Card 5 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Moments épiques
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Personnages charismatiques, situations frémissantes, surprises inattendues... Tout ce qui promet de belles émotions !
                </p>
              </div>
            </div>

            {/* Value Card 6 */}
            <div className="group relative p-8 rounded-2xl glass hover:border-[#d4a853]/40 transition-all duration-500 hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center mb-6 group-hover:animate-fire-glow transition-all duration-500">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-[var(--font-cinzel)] text-2xl font-bold text-[#f5f1e8] mb-4">
                  Promesses tenues
                </h3>
                <p className="font-[var(--font-crimson)] text-[#f5f1e8]/70 leading-relaxed">
                  Des parties qui tiennent leurs promesses. Plus de 200 joueurs nous ont fait confiance, et plus de 30 campagnes terminées avec succès.
                </p>
              </div>
            </div>
          </div>

          {/* Quote section */}
          <div className="mt-24 text-center">
            <div className="relative inline-block max-w-4xl">
              <span className="absolute -top-8 -left-4 text-8xl text-[#d4a853]/20 font-serif">&ldquo;</span>
              <blockquote className="font-[var(--font-crimson)] text-2xl md:text-3xl text-[#f5f1e8]/90 italic leading-relaxed px-8">
                Les scénarios proposés sont ceux que j&apos;aimerais vivre en tant que joueur. 
                Ensemble, ces ingrédients donnent à chaque aventure une <span className="text-[#d4a853] not-italic font-semibold">saveur singulière</span>.
              </blockquote>
              <span className="absolute -bottom-12 -right-4 text-8xl text-[#d4a853]/20 font-serif">&rdquo;</span>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-[#d4a853]/40" />
              <span className="text-[#d4a853] font-[var(--font-cinzel)] uppercase tracking-widest text-sm">Le Maître du Jeu</span>
              <div className="w-16 h-px bg-[#d4a853]/40" />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <div className="glass inline-block p-12 rounded-3xl">
              <h3 className="font-[var(--font-cinzel)] text-3xl md:text-4xl font-bold text-[#f5f1e8] mb-4">
                Prêt à forger votre <span className="text-gradient-gold">légende</span> ?
              </h3>
              <p className="font-[var(--font-crimson)] text-xl text-[#f5f1e8]/70 mb-8 max-w-xl mx-auto">
                Rejoignez plus de 50 aventuriers et vivez des histoires inoubliables
              </p>
              <button className="btn-primary text-lg animate-fire-glow">
                Commencer l&apos;aventure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
