import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate, AnimatePresence } from 'motion/react'
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

/* ============================
   DATA
   ============================ */
const pioneers = [
  {
    initials: 'AL', year: '1843', name: 'Ada Lovelace', desc: 'Primera programadora de la historia', url: 'https://www.celebratingada.com/',
    color: '#6e38f3', gradientFrom: '#020124', gradientTo: '#2f0e7a',
    profile: 'Matemática y escritora británica. Publicó el primer algoritmo destinado a ser ejecutado por una máquina, más de un siglo antes de que existieran las computadoras modernas. Previó que las máquinas podían ir más allá del cálculo numérico.'
  },
  {
    initials: 'HL', year: '1942', name: 'Hedy Lamarr', desc: 'Base del WiFi, Bluetooth y GPS', url: 'https://www.hedylamarr.com/about/biography/',
    color: '#3872f3', gradientFrom: '#020124', gradientTo: '#0e337a',
    profile: 'Actriz e inventora austriaco-americana. Patentó en 1942 el espectro ensanchado, que es la base tecnológica del WiFi, el Bluetooth y el GPS modernos. Su contribución fue reconocida décadas después de realizarla.'
  },
  {
    initials: 'GH', year: '1952', name: 'Grace Hopper', desc: 'Inventora del primer compilador', url: 'https://www.womenshistory.org/education-resources/biographies/grace-hopper',
    color: '#38d7f3', gradientFrom: '#020124', gradientTo: '#0e637a',
    profile: 'Contralmirante de la Marina de EE.UU. e informática. Creó el primer compilador de la historia (A-0, 1952) y fue pieza clave en el desarrollo del lenguaje COBOL, que aún procesa billones de transacciones bancarias diarias'
  },
  {
    initials: 'KJ', year: '1980', name: 'Katherine Johnson', desc: 'Cálculos que llevaron al hombre a la luna', url: 'https://www.nasa.gov/centers-and-facilities/langley/katherine-johnson-biography/',
    color: '#38f361', gradientFrom: '#020124', gradientTo: '#0e7a43',
    profile: 'Matemática afroamericana de la NASA. Sus cálculos orbitales fueron esenciales para las misiones Mercury y Apolo. John Glenn se negó a despegar sin que ella verificara los cálculos de la computadora. Medalla Presidencial de la Libertad, 2015.'
  },
  {
    initials: 'RP', year: '1985', name: 'Radia Perlman', desc: '"Madre del internet" · Protocolo STP', url: 'https://www.invent.org/inductees/radia-perlman',
    color: '#f3ec38', gradientFrom: '#020124', gradientTo: '#7a760e',
    profile: 'Ingeniera de software estadounidense. Inventó el protocolo Spanning Tree (STP), que permite que las redes Ethernet funcionen sin bucles infinitos. Es un pilar invisible de toda la infraestructura de internet moderna.'
  },
]

const resources = [
  { title: 'Laboratoria', desc: 'Formación tecnológica para mujeres en LATAM', url: 'https://laboratoria.la/' },
  { title: 'Reporte IMCO 2025', desc: 'Beneficios de sumar a más mujeres en las TIC', url: 'https://imco.org.mx/beneficios-de-sumar-a-mas-mujeres-en-las-tic/' },
  { title: 'Women in Tech MX', desc: 'Red de mujeres profesionales en tecnología', url: 'https://www.womentech.net/women-in-tech/mexico' },
]

const bars = [
  { label: 'Fuerza laboral TIC', value: 15, suffix: '15% Mujeres', gradientClass: 'bg-gradient-to-r from-[#5b2d8e] to-[#9d5cf0]', valueColor: 'text-[#9d5cf0]' },
  { label: 'Puestos de liderazgo', value: 19, suffix: '19% Mujeres', gradientClass: 'bg-gradient-to-r from-[#5b2d8e] to-[#9d5cf0]', valueColor: 'text-[#7c3aed]' },
  { label: 'Egresadas de carreras TIC', value: 30, suffix: '30% Mujeres', gradientClass: 'bg-gradient-to-r from-[#5b2d8e] to-[#9d5cf0]', valueColor: 'text-[#4ade80]' },
  { label: 'Meta propuesta 2030', value: 40, suffix: '40% Mujeres', gradientClass: 'bg-gradient-to-r from-[#14532d] to-[#4ade80]', valueColor: 'text-[#4ade80]' },
]

const contextCards = [
  {
    front: {
      title: 'Estereotipos desde la infancia',
      text: 'Menos del 25% de las mujeres mexicanas eligen carreras STEM, según datos de la UNESCO. Los mensajes culturales refuerzan el sesgo desde temprana edad.'
    },
    back: {
      title: 'Oportunidad',
      text: 'Cuando las niñas tienen referentes femeninas en ciencia, sus aspiraciones cambian. La visibilidad de mujeres en tecnología es el factor más poderoso para transformar vocaciones.'
    },
  },
  {
    front: {
      title: 'Desigualdad en cargos directivos',
      text: '73% de empresas tech en México no tienen mujeres en alta dirección.'
    },
    back: {
      title: 'Oportunidad',
      text: 'Las empresas con mayor diversidad de género toman mejores decisiones, innovan más y son más rentables. Incluir mujeres en liderazgo no es solo justicia: es estrategia.'
    },
  },
  {
    front: {
      title: 'Brecha salarial persistente',
      text: 'Mujeres en TIC ganan 20-25% menos que hombres en puestos equivalentes.'
    },
    back: {
      title: 'Oportunidad',
      text: 'La brecha salarial no es inevitable. Leyes de transparencia salarial, certificaciones de equidad y conocer el valor real del propio trabajo son herramientas concretas para cerrarla y exigir que se cierre.'
    },
  },
  {
    front: {
      title: 'Baja representación educativa',
      text: 'Por cada mujer egresada de carrera TIC hay casi dos hombres. La brecha empieza en la universidad.'
    },
    back: {
      title: 'Oportunidad',
      text: 'El cambio empieza antes de la universidad. Mostrarle a una niña que la tecnología también es suya vale más que cualquier campaña. Los referentes femeninos en ciencia son la semilla de las vocaciones del futuro.'
    },
  },
]

/* ============================
   ANIMATED COUNTER
   ============================ */
function AnimatedCounter({ target, suffix = '%' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1000, bounce: 0 })

  useEffect(() => {
    animate(motionValue, target, { duration: 1, ease: 'easeOut' })
  }, [motionValue, target])

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(v) + suffix
      }
    })
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

/* ============================
   ANIMATED PROGRESS BAR
   ============================ */
function ProgressBar({ value, gradientClass, delay = 0 }: { value: number; gradientClass: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="w-full h-4 bg-white/6 rounded-full overflow-hidden relative">
      <div className={`h-full rounded-full ${gradientClass}`}
        style={{ width: inView ? `${value}%` : '0%', transitionDelay: `${delay}ms`, transition: 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />
    </div>
  )
}

/* ============================
   FLIP CARD
   ============================ */
function FlipCard({ card }: { card: (typeof contextCards)[0] }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="cursor-pointer w-[calc(50%-8px)] lg:h-[calc(50%-8px)] h-auto min-h-[160px]"
      style={{ perspective: '1000px' }} onClick={() => setFlipped((f) => !f)} >
      <motion.div style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.65, ease: [0.4, 0.2, 0.2, 1] }}
      >
        {/* Front */}
        <div
          className="lg:absolute lg:inset-0 relative rounded-2xl p-[12px_10px] border border-[rgba(124,58,237,0.25)]
                     bg-[#1a1738] flex flex-col items-center justify-center text-center gap-2
                     overflow-hidden hover:border-[rgba(157,92,240,0.5)] h-full"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="shrink-0">
            <FiAlertTriangle size={18} color="#3872f3" />
          </div>
          <div className="text-[clamp(10px,1.5vh,14px)] font-inter font-bold text-[#3872f3] leading-tight">{card.front.title}</div>
          <p className="text-[clamp(8px,1.3vh,12px)] text-[#a8a0c8] flex-1 overflow-y-auto font-inter leading-normal custom-scrollbar pr-1">
            {card.front.text}
          </p>
          <span className="text-[10px] text-[#6b6590] mt-1 shrink-0">Toca para la oportunidad</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-[12px_10px] border border-[rgba(157,92,240,0.35)]
                     bg-linear-to-br from-[#1a1738] to-[#221f45] flex flex-col items-center
                     justify-between text-center overflow-hidden gap-1.5"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="shrink-0">
            <FiCheckCircle size={18} color="#38f361" />
          </div>
          <div className="text-[clamp(12px,1.5vh,14px)] font-inter font-bold text-[#4ade80] mb-0.5 shrink-0">{card.back.title}</div>
          <p className="text-[clamp(10px,1.3vh,12px)] font-inter text-[#a8a0c8] flex-1 overflow-y-auto leading-normal custom-scrollbar pr-1">
            {card.back.text}
          </p>
          <span className="text-[10px] text-[#6b6590] mt-1 shrink-0">Toca para volver</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ============================
   PIONEER CARD LINK
   ============================ */
function PioneerCard({ p, index = 0, onClick }: { p: (typeof pioneers)[0]; index?: number; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center text-left w-full gap-3.5 px-4 py-1 my-3 rounded-[10px] border border-[rgba(124,58,237,0.25)]
                 bg-[#1a1738] mb-1 no-underline text-inherit cursor-pointer relative overflow-hidden
                 transition-all duration-250 ease-out
                 hover:border-[rgba(157,92,240,0.5)] hover:bg-[#221f45] hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
    >
      {/* Gradient overlay on hover — kept as inline style for pseudo-element alternative */}
      <div className='w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 tracking-wider font-playfair-display'
        style={{ backgroundImage: `linear-gradient(to bottom, ${p.gradientFrom}, ${p.gradientTo})`, color: p.color }}>
        {p.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-inter font-bold tracking-wider mb-0.5" style={{ color: p.color }}>{p.year}</div>
        <div className="text-lg font-inter font-semibold text-white mb-0.5">{p.name}</div>
        <div className="text-sm text-[#6b6590] truncate font-inter">{p.desc}</div>
      </div>
      <span className="text-sm text-[#6b6590] transition-all duration-200 shrink-0
                       group-hover:text-[#c084fc] group-hover:translate-x-1">
        ›
      </span>
    </motion.button>
  )
}

/* ============================
   MAIN APP
   ============================ */
export default function App() {
  const barsRef = useRef<HTMLDivElement>(null)
  const [selectedPioneer, setSelectedPioneer] = useState<(typeof pioneers)[0] | null>(null)
  //const barsInView = useInView(barsRef, { once: true, margin: '-80px' })

  return (
    <div className="flex flex-col w-full lg:h-screen h-auto lg:overflow-hidden overflow-y-auto mx-auto bg-indigo-oscuro relative">
      <img src="/headerdesign.svg" alt="" className='lg:w-auto w-full lg:h-1/6 h-16 object-cover absolute top-0 left-0 z-0 pointer-events-none' />

      {/* ── SECCIÓN SUPERIOR (2/12) ── */}
      <div className="flex flex-col lg:flex-row lg:basis-1/6 w-full relative z-10">
        {/* Sub-sección 1/2 */}
        <div className="lg:basis-4/6 w-full h-16 lg:h-auto flex flex-col justify-center px-12">
          <h1 className="text-[clamp(24px,3vw,40px)] font-light italic text-[#f0eeff] leading-tight font-playfair-display">
            Siempre estuvieron aquí
          </h1>
          <span className="text-[clamp(18px,2.5vw,32px)] font-bold italic text-[#c084fc] font-poppins">
            Mujeres en la tecnología
          </span>
        </div>

        <div className="lg:basis-2/6 w-full h-auto flex">
          {/* Sub-sección 1/4 */}
          <div className="basis-1/2 flex flex-col items-center justify-center">
            <div className="text-[clamp(32px,4vw,56px)] font-black leading-none tabular-nums bg-linear-to-r from-[#999ae7] to-[#5a4ac1] bg-clip-text text-transparent">
              <AnimatedCounter target={15} />
            </div>
            <p className="text-[11px] text-[#a8a0c8] text-center max-w-[140px] leading-tight mt-1">
              de empleos TIC en México son ocupados por mujeres
            </p>
          </div>

          {/* Sub-sección 1/4 */}
          <div className="basis-1/2 flex flex-col items-center justify-center border-l border-[rgba(124,58,237,0.15)]">
            <div className="text-[clamp(32px,4vw,56px)] font-black leading-none tabular-nums bg-linear-to-r from-[#999ae7] to-[#5a4ac1] bg-clip-text text-transparent">
              <AnimatedCounter target={25} />
            </div>
            <p className="text-[11px] text-[#a8a0c8] text-center max-w-[140px] leading-tight mt-1">
              de las mexicanas elige carreras STEM
            </p>
          </div>

        </div>
      </div>

      {/* ── SECCIÓN CENTRAL (8/12) ── */}
      <div className="flex flex-col lg:flex-row lg:basis-2/3 w-full overflow-hidden">
        {/* Sub-sección Pioneras */}
        <div className="lg:basis-3/12 w-full lg:h-full h-fit p-6 flex flex-col">
          <div className="bg-indigo-medio/40 rounded-2xl h-full p-5 flex flex-col border border-[rgba(124,58,237,0.1)]">
            <p className="text-azul-claro font-inter text-[10px] font-bold tracking-widest uppercase mb-2">
              PASADO - PIONERAS
            </p>
            <h2 className="font-playfair-display text-morado-claro text-xl italic mb-4">
              Antes de Google, ellas ya <span className="text-[#9b9fff]">programaban</span>
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {pioneers.map((p, i) => (
                <PioneerCard key={p.initials} p={p} index={i} onClick={() => setSelectedPioneer(p)} />
              ))}
            </div>
          </div>
        </div>

        {/* Sub-sección  Datos */}
        <div className="lg:basis-5/12 lg:h-full h-fit py-6 lg:px-0 px-6 flex flex-col">
          <div className="bg-indigo-medio/40 rounded-2xl h-full p-6 flex flex-col border border-[rgba(124,58,237,0.1)] relative overflow-hidden">
            <p className="text-azul-claro font-inter text-[10px] font-bold tracking-widest uppercase mb-2">
              PRESENTE - DATOS EN MÉXICO
            </p>
            <h2 className="font-playfair-display text-morado-claro text-xl italic mb-6">
              Los números que <span className="text-[#9b9fff]">no mienten</span>
            </h2>

            <div ref={barsRef} className="flex flex-col gap-6 relative z-10">
              {bars.map((b, i) => (
                <div key={b.label} className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-[#a8a0c8] font-inter">{b.label}</span>
                    <span className="font-extrabold text-sm text-[#38d7f3] font-inter">
                      {b.suffix}
                    </span>
                  </div>
                  <ProgressBar value={b.value} gradientClass={b.gradientClass} delay={i * 200} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sub-sección  Contexto */}
        <div className="lg:basis-4/12 lg:h-full h-fit p-6 flex flex-col ">
          <div className="bg-indigo-medio/40 rounded-2xl h-full p-5 flex flex-col border border-[rgba(124,58,237,0.1)]">
            <p className="text-azul-claro font-inter text-[10px] font-bold tracking-widest uppercase mb-2">
              CONTEXTO
            </p>
            <h2 className="font-playfair-display text-morado-claro text-xl italic mb-4">
              Barreras y <span className="text-[#9b9fff]">oportunidades</span>
            </h2>
            <div className="flex flex-wrap gap-3 justify-center content-start lg:overflow-y-auto lg:flex-1 pr-1 custom-scrollbar">
              {contextCards.map((card, i) => (
                <FlipCard key={i} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECCIÓN INFERIOR (2/12) ── */}
      <div className="flex lg:basis-1/6 w-full lg:flex-row flex-col">
        {/* Sub-sección 5/12 */}
        <div className="lg:basis-5/12 w-full flex flex-col px-8 ">
          <p className="text-azul-claro font-inter text-[10px] font-bold tracking-widest mb-3">
            ¿QUE PUEDES HACER? - RECURSOS
          </p>
          <div className="flex lg:flex-row flex-col gap-5 lg:h-full h-fit mb-3">
            {resources.map((r) => (
              <div className="w-full lg:w-1/3 px-5 py-2 rounded-lg h-full bg-indigo-medio/40">
                <div className="h-4/5">
                  <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-md font-inter text-white hover:text-[#c084fc] transition-colors">
                    {r.title}
                  </a>
                  <p className="text-xs font-inter text-[#a8a0c8]">
                    {r.desc}
                  </p>
                </div>
                <div className="h-1/5">
                  <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-inter text-[#38d7f3] hover:text-[#c084fc] transition-colors">
                    Visitar →
                  </a>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-sección 2/12 */}
        <div className="lg:basis-2/12 w-full flex flex-col items-center justify-center">
          {/* 
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#c084fc] to-[#6e38f3] flex items-center justify-center text-white font-bold text-xs">
            STEM
          </div>
        */}
        </div>

        {/* Sub-sección 5/12 */}
        <div className="lg:basis-5/12 w-full flex flex-col px-3 ">
          <p className="text-azul-claro font-inter text-[10px] font-bold tracking-widest mb-2">REFERENCIAS</p>
          <div className="flex w-full h-full flex-row">
            <div className='flex flex-col w-1/2 h-full px-2'>
              <p className='text-[10px] pl-4 -indent-4 pb-1 text-white'>
                Cigarini, M. (28 de Mayo de 2025). La profunda brecha de género en el sector tecnológico. Obtenido de Expansión Mujeres:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://mujeres.expansion.mx/opinion/2025/05/28/la-profunda-brecha-de-genero-en-el-sector-tecnologico" target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
              <p className='text-[10px] pl-4 -indent-4 pb-1  text-white'>
                de la Rosa, E. (26 de Mayo de 2025). Sumar a más mujeres en las TIC generaría ganancias de hasta 53,523 millones de pesos. Obtenido de El Economista:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://www.eleconomista.com.mx/capital-humano/sumar-mujeres-tic-generaria-ganancias-53-523-millones-pesos-20250526-760497.html" target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
              <p className='text-[10px] pl-4 -indent-4 pb-1  text-white'>
                Instituto Mexicano para la Competitividad (IMCO). (1 de Febrero de 2022). En México, solo 3 de cada 10 profesionistas STEM son mujeres. Obtenido de IMCO:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://imco.org.mx/en-mexico-solo-3-de-cada-10-profesionistas-stem-son-mujeres/ " target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
            </div>
            <div className='flex flex-col w-1/2 h-full px-2'>
              <p className='text-[10px] pl-4 -indent-4 pb-1 text-white'>
                Instituto Mexicano para la Competitividad (IMCO). (23 de Mayo de 2025). Beneficios de sumar a más mujeres en las TIC. Obtenido de IMCO:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://imco.org.mx/beneficios-de-sumar-a-mas-mujeres-en-las-tic/ " target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
              <p className='text-[10px] pl-4 -indent-4 pb-1 text-white'>
                L. D. (1 de Agosto de 2025). ¿Dónde están las líderes? Mujeres en la tecnología de México, lejos de puestos directivos. Obtenido de Líder Empresarial:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://www.liderempresarial.com/donde-estan-las-lideres-mujeres-en-la-tecnologia-de-mexico-lejos-de-puestos-directivos/ " target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
              <p className='text-[10px] pl-4 -indent-4 pb-1 text-white'>
                Oreja, M. (10 de Diciembre de 2024). Solo el 19% de liderazgo tech en México es femenino: ¿cómo aumentarlo? Obtenido de Expansión Mujeres:
                <span className=' text-[#38d7f3] hover:text-[#c084fc] transition-colors'>
                  <a href="https://mujeres.expansion.mx/actualidad/2024/12/10/solo-el-19-de-liderazgo-tech-en-mexico-es-femenino-como-aumentarlo" target="_blank" rel="noopener noreferrer"> Enlace</a>
                </span>
              </p>
            </div>


          </div>


        </div>
      </div>
      {/* <img src="/tech-girl.png" alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2/5 w-auto object-contain z-20 pointer-events-none lg:visible invisible" /> */}
      <img src="/icon.png" alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1/5 w-auto object-contain z-20 pointer-events-none lg:visible invisible" />

      <AnimatePresence>
        {selectedPioneer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPioneer(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[400px] bg-[#0a0726] border border-[#30166a] rounded-xl p-8 relative shadow-[0_0_40px_rgba(124,58,237,0.2)]"
            >
              <button
                onClick={() => setSelectedPioneer(null)}
                className="absolute top-4 right-4 text-[#6b6590] hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="text-sm font-inter font-bold tracking-wider mb-4" style={{ color: selectedPioneer.color }}>
                {selectedPioneer.year}
              </div>

              <div className='w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 tracking-wider font-playfair-display mb-6'
                style={{ backgroundImage: `linear-gradient(to bottom, ${selectedPioneer.gradientFrom}, ${selectedPioneer.gradientTo})`, color: selectedPioneer.color }}>
                {selectedPioneer.initials}
              </div>

              <h3 className="text-3xl font-playfair-display text-white mb-2">{selectedPioneer.name}</h3>
              <div className="text-sm font-semibold mb-6" style={{ color: selectedPioneer.color }}>{selectedPioneer.desc}</div>

              <p className="text-xs text-[#a8a0c8] font-inter leading-relaxed mb-8">
                {selectedPioneer.profile}
              </p>

              <a
                href={selectedPioneer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-[#38d7f3] text-sm font-inter text-[#38d7f3] hover:bg-[#38d7f3]/10 transition-colors"
              >
                Ver perfil completo <span>→</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
