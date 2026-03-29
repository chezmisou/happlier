import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-[#0f1117] py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <p className="text-[#7c6df0] text-xs tracking-[0.2em] font-medium uppercase mb-6">
          PROPULSE PAR L&apos;IA CLAUDE
        </p>

        {/* Title */}
        <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
          Votre app web, prête en quelques minutes
        </h1>

        {/* Subtitle */}
        <p className="text-[#9ca3af] text-base lg:text-lg max-w-xl mx-auto mb-8">
          Décrivez votre idée, choisissez vos couleurs, et notre IA génère une
          application web complète, accessible en ligne instantanément.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-4">
          <Link
            href="/signup"
            className="bg-[#7c6df0] text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-[#6b5ce0] transition-colors"
          >
            Créer mon app gratuitement
          </Link>
          <form action="/api/demo" method="POST">
            <button
              type="submit"
              className="bg-transparent border border-white/20 text-white px-7 py-3 rounded-lg font-medium text-sm hover:bg-white/5 transition-colors"
            >
              Essayer la démo
            </button>
          </form>
        </div>

        {/* Price mention */}
        <p className="text-[#6b7280] text-sm">
          Gratuit pendant 3 jours, puis 5€/mois par app
        </p>
      </div>
    </section>
  );
}
