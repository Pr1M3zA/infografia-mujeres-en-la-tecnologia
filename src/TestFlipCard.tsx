
import { FlipCard } from './components'

const TestFlipCard = () => {
   const cards = [
      {
         title: 'React',
         description: 'Librería JavaScript para construir interfaces de usuario con componentes reutilizables.',
         icon: '⚛️',
         backgroundColor: 'bg-blue-500',
      },
      {
         title: 'Tailwind CSS',
         description: 'Framework CSS utility-first que permite crear diseños modernos sin escribir CSS personalizado.',
         icon: '🎨',
         backgroundColor: 'bg-cyan-500',
      },
      {
         title: 'TypeScript',
         description: 'Superconjunto tipado de JavaScript que mejora la calidad del código y detecta errores tempranamente.',
         icon: '📘',
         backgroundColor: 'bg-blue-600',
      },
      {
         title: 'Vite',
         description: 'Herramienta de construcción moderna y rápida que optimiza el desarrollo y la compilación de aplicaciones.',
         icon: '⚡',
         backgroundColor: 'bg-purple-500',
      },
      {
         title: 'Componentes',
         description: 'Este FlipCard es un componente reutilizable que puedes usar en tus proyectos.',
         icon: '🎁',
         backgroundColor: 'bg-green-500',
      },
      {
         title: 'Animaciones',
         description: 'Las transiciones suaves con CSS3 transforms crean experiencias visuales atractivas.',
         icon: '✨',
         backgroundColor: 'bg-pink-500',
      },
   ]



   return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-8">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-bold text-white mb-4 text-center">
               Tarjetas con Efecto Flip
            </h1>
            <p className="text-gray-400 text-center mb-12 text-lg">
               Pasa el mouse sobre las tarjetas para ver el efecto de voltearse
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {cards.map((card, index) => (
                  <FlipCard
                     key={index}
                     title={card.title}
                     description={card.description}
                     icon={card.icon}
                     backgroundColor={card.backgroundColor}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default TestFlipCard