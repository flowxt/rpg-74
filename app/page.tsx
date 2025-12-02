import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* Hero Section */}
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

        {/* Radial glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#d4a853]/10 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Dragon images */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 opacity-30 hover:opacity-50 transition-opacity duration-700">
          <Image
            src="/image/dragon.png"
            alt="Dragon"
            width={600}
            height={600}
            className="animate-float object-contain"
            style={{ animationDelay: '0s' }}
          />
        </div>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-30 hover:opacity-50 transition-opacity duration-700">
          <Image
            src="/image/dragon1.png"
            alt="Dragon"
            width={600}
            height={600}
            className="animate-float object-contain"
            style={{ animationDelay: '3s' }}
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
            <span className="text-gradient-gold animate-shimmer">Jeu de Rôle</span>
            <span className="text-[#f5f1e8] block mt-2">en ligne</span>
          </h1>

          {/* Ornament */}
          <div 
            className="flex items-center justify-center gap-4 my-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <span className="ornament" />
            <span className="text-[#d4a853] text-2xl">🐉</span>
            <span className="ornament" />
          </div>

          {/* Subtitle */}
          <p 
            className="font-[var(--font-crimson)] text-xl md:text-2xl text-[#f5f1e8]/80 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Plongez dans des aventures <span className="text-[#d4a853] font-semibold">Donjons & Dragons</span> épiques.
            <br />
            Une expérience <span className="italic">accessible</span>, <span className="italic">immersive</span> et <span className="italic">ludique</span>.
          </p>

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

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse-slow"
          >
            <div className="flex flex-col items-center gap-2 text-[#d4a853]/60">
              <span className="text-xs uppercase tracking-widest">Découvrir</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0908] to-transparent" />
      </section>

      {/* Values Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[#12100e] to-[#0a0908]" />
        
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
