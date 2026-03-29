const steps = [
  {
    number: 1,
    title: 'Décrivez',
    description: 'Expliquez ce que vous voulez en quelques phrases',
    bgColor: 'bg-[#eeedfe]',
    textColor: 'text-[#534ab7]',
  },
  {
    number: 2,
    title: 'Personnalisez',
    description: 'Couleurs, logo et catégorie de votre app',
    bgColor: 'bg-[#e1f5ee]',
    textColor: 'text-[#0f6e56]',
  },
  {
    number: 3,
    title: 'Publiez',
    description: 'Votre app est en ligne, partagez le lien',
    bgColor: 'bg-[#faeeda]',
    textColor: 'text-[#854f0b]',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#7c6df0] text-xs tracking-[0.2em] font-medium uppercase mb-3">
            COMMENT CA MARCHE
          </p>
          <h2 className="text-2xl lg:text-3xl font-bold">
            Trois étapes, c&apos;est tout
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 rounded-xl p-6 text-center"
            >
              <div
                className={`w-12 h-12 ${step.bgColor} ${step.textColor} rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold`}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
