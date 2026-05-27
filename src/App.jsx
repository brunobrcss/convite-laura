import { useMemo, useState } from 'react';

function Card({ icon, title, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${color} rounded-3xl shadow-lg p-6 min-h-36 flex flex-col items-center justify-center active:scale-95 transition-transform`}
    >
      <div className='text-4xl mb-3'>{icon}</div>

      <div className='font-semibold text-gray-700 text-center'>
        {title}
      </div>
    </button>
  );
}

function Modal({ title, color, children, onClose }) {
  return (
    <div className='fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4'>
      <div className='w-[92%] max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl'>

        <div className={`${color} p-5 flex justify-between items-center`}>
          <h3 className='font-bold text-lg text-gray-700'>
            {title}
          </h3>

          <button
            onClick={onClose}
            className='text-xl'
          >
            ✖
          </button>
        </div>

        <div className='p-5 max-h-[70vh] overflow-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ConviteLaura() {

  const [step, setStep] = useState('hero');
  const [playVideo, setPlayVideo] = useState(false);
  const [open, setOpen] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const stars = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i),
    []
  );

  const formatPhone = (value) => {

    let nums = value.replace(/\D/g, '').slice(0, 11);

    if (nums.length <= 2) return nums;

    if (nums.length <= 7) {
      return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    }

    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };

  const handleConfirm = async () => {

    if (!name || !phone) {

      setWarning(
        '✨ Para confirmar sua presença, favor preencher com seu nome e telefone.'
      );

      return;
    }

    try {

      setWarning('');
      setLoading(true);

      await fetch(
        'https://script.google.com/macros/s/AKfycbzVQIQJ1z5AQOMumnUrP_9u4hRMDVtofnwPCNYoC9Tao2W7yy6M4d_-VFdytQrTDY0dKA/exec',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            phone,
          }),
        }
      );

      setConfirmed(true);

    } catch (err) {

      setWarning(
        'Não foi possível confirmar agora. Tente novamente ✨'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-100 via-white to-sky-100 flex items-center justify-center p-4'>

    <div className='w-full max-w-[430px] min-h-screen md:min-h-[900px] bg-white md:rounded-[40px] md:shadow-[0_0_60px_rgba(0,0,0,0.18)] overflow-hidden relative'>

      {/* HERO */}
{step === 'hero' && (
  <section className='relative min-h-screen overflow-hidden flex items-center justify-center'>

    {/* IMG CONVITE */}
    <img
      src='/hero.jpg'
      alt='Convite Laura'
      className='absolute inset-0 w-full h-full object-cover'
    />

    {/* ESTRELAS */}
    {stars.map((s) => (
      <div
        key={s}
        className='absolute text-xl opacity-70 animate-pulse z-10'
        style={{
          left: `${10 + s * 8}%`,
          top: `${8 + (s % 5) * 14}%`,
        }}
      >
        ✨
      </div>
    ))}

    {/* BOTÃO */}
    <div className='relative z-20 mt-[58vh]'>

      <button
        onClick={() => setStep('video')}
        className='rounded-full px-10 py-5 text-2xl font-semibold text-[#c44f7d] shadow-2xl bg-gradient-to-r from-pink-200 via-yellow-100 to-sky-200 active:scale-95 transition-transform border border-white/70'
        style={{
          fontFamily: '"Trebuchet MS", "Poppins", sans-serif'
        }}
      >
        ✨ Abrir convite ✨
      </button>

    </div>
  </section>
)}

      {/* VIDEO */}
      {step === 'video' && (
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-black'>

          {!playVideo && (
            <>
              <img
                src='/frame-video.jpg'
                alt='Frame vídeo'
                className='absolute inset-0 w-full h-full object-cover'
              />

              <div className='absolute inset-0 bg-black/30' />

              <div className='absolute z-10 text-center px-6 top-[20%] left-1/2 -translate-x-1/2'>

  <button
  onClick={() => setPlayVideo(true)}
  className='relative overflow-hidden rounded-[2.5rem] px-14 py-5 text-2xl font-semibold text-[#d14f88] shadow-[0_10px_40px_rgba(255,182,193,0.45)] bg-gradient-to-r from-pink-200 via-yellow-100 to-sky-200 active:scale-95 transition-all duration-300 border border-white/80'
  style={{
    fontFamily: '"Trebuchet MS", "Poppins", sans-serif'
  }}
>

  <div className='absolute inset-0 bg-white/20 backdrop-blur-sm' />

  <span className='relative z-10 flex items-center gap-3'>
    ✨ Assistir ✨
  </span>

</button>

</div>
            </>
          )}

          {playVideo && (
            <video
              src='/video.mp4'
              playsInline
              controls
              preload='auto'
              autoPlay
              className='absolute inset-0 w-full h-full object-cover z-20'
              onEnded={() => setStep('menu')}
            />
          )}
        </section>
      )}

      {/* MENU */}
      {step === 'menu' && (
        <section className='relative min-h-screen p-5 overflow-hidden'>

          <div className='absolute inset-0'>
            <img
              src='/hero.jpg'
              alt='Background Laura'
              className='w-full h-full object-cover scale-105 opacity-30'
            />

            <div className='absolute inset-0 bg-gradient-to-b from-pink-100/80 via-white/75 to-sky-100/80 backdrop-blur-md' />
          </div>

          <div className='relative z-10 max-w-md mx-auto'>

            <div className='mb-10 mt-6 text-center'>

              <div className='inline-block px-8 py-5 rounded-[2rem] bg-white/40 shadow-2xl backdrop-blur-xl border border-white/50'>

                <h2
                  className='text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-sky-500 drop-shadow-sm'
                  style={{
                    fontFamily: '"Trebuchet MS", "Poppins", sans-serif'
                  }}
                >
                  Bem-vindo(a) ao convite da Laura ✨
                </h2>

                <p className='mt-2 text-sm text-pink-500/80 font-medium tracking-wide'>
                  Uma experiência preparada com muito amor 🎨
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>

              <Card
                color='bg-pink-200/90'
                title='Confirmar presença'
                icon='🎨'
                onClick={() => {
                  setConfirmed(false);
                  setWarning('');
                  setOpen('confirm');
                }}
              />

              <Card
                color='bg-yellow-200/90'
                title='Sugestões de presentes'
                icon='🎁'
                onClick={() => setOpen('gift')}
              />

              <Card
                color='bg-sky-200/90'
                title='Como chegar'
                icon='📍'
                onClick={() => setOpen('map')}
              />

              <Card
                color='bg-purple-200/90'
                title='Uma mensagem para você'
                icon='💌'
                onClick={() => setOpen('msg')}
              />
            </div>
          </div>
        </section>
      )}

      {/* CONFIRMAR */}
      {open === 'confirm' && (
        <Modal
          title='Confirme sua presença ✨'
          color='bg-pink-200'
          onClose={() => setOpen(null)}
        >
          {!confirmed ? (
            <>
              <div className='space-y-3'>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Ex.: João Silva e família'
                  className='w-full rounded-2xl border p-4'
                />

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(formatPhone(e.target.value))
                  }
                  placeholder='Telefone'
                  inputMode='tel'
                  className='w-full rounded-2xl border p-4'
                />
              </div>

              {warning && (
                <div className='mt-3 rounded-2xl bg-pink-100 border border-pink-200 px-4 py-3 text-sm text-pink-600 text-center shadow-sm'>
                  {warning}
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={loading}
                className='w-full mt-4 rounded-2xl bg-pink-300 text-white p-4 font-semibold'
              >
                {loading ? 'Confirmando...' : 'Confirmar'}
              </button>
            </>
          ) : (
            <div className='text-center py-8'>

              <div className='text-4xl'>
                ✨🎉✨
              </div>

              <p className='mt-4 font-semibold text-gray-700'>
                Obrigado! Será uma alegria ter você conosco 🎨✨
              </p>
            </div>
          )}
        </Modal>
      )}

      {/* PRESENTES */}
      {open === 'gift' && (
        <Modal
          title='Sugestões de presentes 🎁'
          color='bg-yellow-200'
          onClose={() => setOpen(null)}
        >
          <ul className='space-y-3 text-gray-700'>
            <li>👕 Roupinhas (2 anos)</li>
            <li>👟 Calçados infantis (20–22)</li>
            <li>📚 Livrinhos infantis</li>
            <li>🧩 Brinquedos educativos</li>
            <li>🫶 Brinquedos sensoriais</li>
            <li>👜 Acessórios infantis</li>
          </ul>
        </Modal>
      )}

      {/* MAPA */}
      {open === 'map' && (
        <Modal
          title='Como chegar 📍'
          color='bg-sky-200'
          onClose={() => setOpen(null)}
        >
          <p className='text-gray-700 leading-7'>
            Kolly Kids Celebrações
            <br />
            Rua Frei Caneca, 58 — Goiana/PE
            <br />
            Em frente à Igreja Nossa Senhora do Carmo
          </p>
        </Modal>
      )}

      {/* MSG */}
      {open === 'msg' && (
        <Modal
          title='Uma mensagem para você 💌'
          color='bg-purple-200'
          onClose={() => setOpen(null)}
        >
          <p className='text-gray-700 leading-7'>
            Entre cores, amor e bênçãos,
            nasceu uma linda obra chamada Laura.

            <br /><br />

            Venha celebrar conosco seu primeiro aninho de vida 🎨✨

            <br /><br />

            <strong>
              Bruno, Tatiane e Laura aguardam você com carinho 💕
            </strong>
          </p>
        </Modal>
      )}
       </div>
    </div>
  );
}
