import { useState } from 'react'

export default function App() {
  const [open, setOpen] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-sky-50 to-yellow-50 text-gray-700">
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-sky-100 to-yellow-50"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-20 text-7xl">
          ✨ ☁️ 🌈 🎨
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-pink-400">
            1 aninho da Laura ✨
          </h1>

          <p className="mt-4 text-lg text-pink-300">
            O Maior Pintor do Mundo preparou uma linda obra de amor 🎨
          </p>

          <button
            onClick={() => setOpen('menu')}
            className="mt-8 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-xl bg-gradient-to-r from-pink-300 via-yellow-300 to-sky-300"
          >
            Abrir convite
          </button>

          <p className="mt-6 text-sm text-pink-300 font-medium">
            20 de junho • 17h • Goiana/PE
          </p>
        </div>
      </section>

      {open === 'menu' && (
        <div className="fixed inset-0 bg-white z-50 p-5 overflow-auto">
          <button
            onClick={() => setOpen(null)}
            className="mb-6 text-pink-400 font-semibold"
          >
            ← Início
          </button>

          <h2 className="text-center text-3xl font-bold text-pink-400">
            Bem-vindo ao convite da Laura ✨
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-10 max-w-md mx-auto">
            <Card emoji="🎨" title="Confirmar presença" />
            <Card emoji="🎁" title="Sugestões de presentes" />
            <Card emoji="📍" title="Como chegar" />
            <Card emoji="💌" title="Uma mensagem para você" />
          </div>
        </div>
      )}
    </div>
  )
}

function Card({ emoji, title }) {
  return (
    <div className="rounded-3xl bg-white shadow-xl p-6 min-h-40 flex flex-col items-center justify-center">
      <div className="text-5xl">{emoji}</div>
      <div className="mt-4 font-semibold text-center">{title}</div>
    </div>
  )
}