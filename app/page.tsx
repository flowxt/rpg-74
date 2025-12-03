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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* ============================================ */}
      {/* HERO SECTION - Image épique fullscreen */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 🖼️ IMAGE DE FOND FULLSCREEN */}
        <div className="absolute inset-0">
        <Image
            src="/image/jdr.png"
            alt="Aventurier devant un château"
            fill
            className="object-cover object-center"
          priority
            quality={100}
          />
          {/* Overlay pour lisibilité du texte - léger pour voir l'image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/40 to-transparent" />
        </div>

        {/* ✨ RUNES FLOTTANTES par dessus l'image */}
        <FloatingRunes />
        <LightMist />

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
