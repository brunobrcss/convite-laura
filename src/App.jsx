import { useMemo, useState } from 'react';

export default function ConviteLaura() {
  const [step, setStep] = useState('hero');
  const [playVideo, setPlayVideo] = useState(false);
  const [open, setOpen] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const formatPhone = (value) => {
    let nums = value.replace(/\D/g, '').slice(0, 11);
    if (nums.length <= 2) return nums;
    if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };
  const [confirmed, setConfirmed] = useState(false);

  const stars = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);

  const Card = ({ icon, title, color, onClick }) => (
    <button onClick={onClick} className={`${color} rounded-3xl shadow-lg p-6 min-h-36 flex flex-col items-center justify-center active:scale-95 transition-transform`}>
      <div className='text-4xl mb-3'>{icon}</div>
      <div className='font-semibold text-gray-700 text-center'>{title}</div>
    </button>
  );

  const Modal = ({ title, color, children }) => (
    <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center'>
      <div className='w-[92%] max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl'>
        <div className={`${color} p-5 flex justify-between items-center`}>
          <h3 className='font-bold text-lg text-gray-700'>{title}</h3>
          <button onClick={() => setOpen(null)} className='text-xl'>✖</button>
        </div>
        <div className='p-5 max-h-[70vh] overflow-auto'>{children}</div>
      </div>
    </div>
  );

  return <div className='min-h-screen bg-gradient-to-b from-pink-50 via-sky-50 to-yellow-50'>
    {step === 'hero' && <section className='relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden'>
      <div className='absolute inset-0'>
            <img
              src='/hero.jpg'
              alt='Hero Laura'
              className='w-full h-full object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]'
            />
            <div className='absolute inset-0 bg-black/10 backdrop-blur-[1px]' />
          </div>
      {stars.map(s => <div key={s} className='absolute text-xl opacity-70 animate-pulse' style={{ left: `${10 + s*8}%`, top: `${8 + (s%5)*14}%` }}>✨</div>)}
      <div className='relative z-10 max-w-md'>
        <h1 className='text-4xl font-bold text-pink-400'>1 aninho da Laura ✨</h1>
        <p className='mt-3 text-lg text-pink-300'>O Maior Pintor do Mundo preparou uma linda obra de amor 🎨</p>
        <button onClick={() => setStep('video')} className='mt-8 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-2xl bg-gradient-to-r from-pink-300 via-yellow-300 to-sky-300 animate-bounce'>
              Abrir convite
            </button>
        <p className='mt-6 text-sm text-pink-300 font-medium'>20 de junho • 17h • Goiana/PE</p>
      </div>
    </section>}

    {step === 'video' && (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
          <img src='/frame-video.jpg' alt='Frame vídeo' className='absolute inset-0 w-full h-full object-cover' />
          <div className='absolute inset-0 bg-black/20' />

          {!playVideo ? (
            <div className='relative z-10 text-center px-6'>
              <button
                onClick={() => setPlayVideo(true)}
                className='rounded-full bg-pink-300 text-white px-10 py-5 text-2xl shadow-2xl hover:scale-105 transition-transform'
              >
                ▶ Assistir
              </button>

              <p className='mt-5 text-white text-lg'>
                Um convite especial espera por você ✨
              </p>
            </div>
          ) : (
            <video
            src='/video.mp4'
            autoPlay
            playsInline
            webkit-playsinline="true"
            controls
            preload='auto'
            className='w-full h-full object-cover'
            onEnded={() => setStep('menu')}
          />
          )}
        </section>
      )}

      {step === 'menu' && <section className='min-h-screen p-5'>
      <div className='max-w-md mx-auto'>
        <h2 className='text-center text-2xl font-bold text-pink-500 mt-6 mb-8'>Bem-vindo ao convite da Laura ✨</h2>
        <div className='grid grid-cols-2 gap-4'>
          <Card color='bg-pink-200' title='Confirmar presença' icon={'🎨'} onClick={() => setOpen('confirm')} />
          <Card color='bg-yellow-200' title='Sugestões de presentes' icon={'🎁'} onClick={() => setOpen('gift')} />
          <Card color='bg-sky-200' title='Como chegar' icon={'📍'} onClick={() => setOpen('map')} />
          <Card color='bg-purple-200' title='Uma mensagem para você' icon={'💌'} onClick={() => setOpen('msg')} />
        </div>
      </div>
    </section>}

    {open === 'confirm' && <Modal title='Confirme sua presença ✨' color='bg-pink-200'>{!confirmed ? <><div className='space-y-3'><input value={name} onChange={e=>setName(e.target.value)} placeholder='Ex.: João Silva e família' className='w-full rounded-2xl border p-4' /><input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} placeholder='Telefone (81) 99999-9999' inputMode='tel' className='w-full rounded-2xl border p-4' /></div><button onClick={()=>setConfirmed(true)} className='w-full mt-4 rounded-2xl bg-pink-300 text-white p-4 font-semibold'>Confirmar</button></> : <div className='text-center py-8'><div className='text-4xl'>✨🎉✨</div><p className='mt-4 font-semibold text-gray-700'>Obrigado! Será uma alegria ter você conosco 🎨✨</p></div>}</Modal>}
    {open === 'gift' && <Modal title='Sugestões de carinho 🎁' color='bg-yellow-200'><ul className='space-y-3 text-gray-700'><li>👕 Roupinhas (2 anos)</li><li>👟 Calçados infantis (20–22)</li><li>📚 Livrinhos infantis</li><li>🧩 Brinquedos educativos</li><li>🫶 Brinquedos sensoriais</li><li>👜 Acessórios infantis (bolsas, kits)</li></ul></Modal>}
    {open === 'map' && <Modal title='Como chegar 📍' color='bg-sky-200'><p className='text-gray-700 leading-7'>Kolly Kids Celebrações<br/>Rua Frei Caneca, 58 — Goiana/PE<br/>Em frente à Igreja Nossa Senhora do Carmo</p></Modal>}
    {open === 'msg' && <Modal title='Uma mensagem para você 💌' color='bg-purple-200'><p className='text-gray-700 leading-7'>Entre cores, amor e bênçãos, nasceu uma linda obra chamada Laura.<br/><br/>Venha celebrar conosco seu primeiro aninho de vida. 🎨✨<br/><br/><strong>Bruno, Tatiane e Laura aguardam você com carinho 💕</strong></p></Modal>}
  </div>;
}
