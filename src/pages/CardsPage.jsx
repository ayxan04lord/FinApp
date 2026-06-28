import { useState } from 'react';

const INITIAL_CARDS = [
  { id: 1, number: '7653 7553 5693 9862', balance: 100 },
  { id: 2, number: '7453 9736 0763 3474', balance: 400 },
  { id: 3, number: '9577 7543 9379 9784', balance: 800 },
];

const cardColors = [
  'from-indigo-600 to-violet-600',
  'from-emerald-600 to-teal-600',
  'from-rose-600 to-pink-600',
  'from-amber-600 to-orange-600',
  'from-sky-600 to-blue-600',
];

function CardItem({ card, colorClass, onClose }) {
  return (
    <div className={`relative rounded-2xl p-6 bg-gradient-to-br ${colorClass} shadow-lg`}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-6 -translate-x-6" />

      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <svg className="w-10 h-7 text-white/80" viewBox="0 0 40 28" fill="currentColor">
            <rect x="0" y="0" width="40" height="28" rx="4" fillOpacity="0" />
            <circle cx="14" cy="14" r="10" fillOpacity="0.8" />
            <circle cx="26" cy="14" r="10" fillOpacity="0.5" />
          </svg>
          <span className="text-white/70 text-sm font-medium">VISA</span>
        </div>

        <p className="text-white font-mono text-lg tracking-widest mb-6">{card.number}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider">Balans</p>
            <p className="text-white text-xl font-bold">₼ {card.balance.toLocaleString()}</p>
          </div>
          <button
            onClick={() => onClose(card.id)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-red-500/30 text-white text-sm px-3 py-1.5 rounded-lg transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CardsPage() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [form, setForm] = useState({ number: '', balance: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClose = (id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const numberClean = form.number.trim();
    const balance = parseFloat(form.balance);

    // Basic validation
    if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(numberClean)) {
      return setError('Kart nömrəsi formatı: XXXX XXXX XXXX XXXX');
    }
    if (isNaN(balance) || balance < 0) {
      return setError('Balans düzgün deyil.');
    }
    if (cards.find(c => c.number === numberClean)) {
      return setError('Bu kart artıq əlavə edilib.');
    }

    setCards(prev => [...prev, { id: Date.now(), number: numberClean, balance }]);
    setForm({ number: '', balance: '' });
    setSuccess('Kart uğurla əlavə edildi!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Kartlarım</h1>
        <p className="text-slate-400 mt-1">Bank kartlarınızı idarə edin</p>
      </div>

      {/* Add Card Form */}
      <div className="card-glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yeni Kart Əlavə Et
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            name="number"
            className="input-field flex-1"
            placeholder="XXXX XXXX XXXX XXXX"
            value={form.number}
            onChange={e => setForm({ ...form, number: formatCardNumber(e.target.value) })}
            maxLength={19}
          />
          <input
            name="balance"
            type="number"
            min="0"
            className="input-field sm:w-36"
            placeholder="Balans (₼)"
            value={form.balance}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition active:scale-95 whitespace-nowrap"
          >
            Əlavə et
          </button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">{error}</p>
        )}
        {success && (
          <p className="mt-3 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg">{success}</p>
        )}
      </div>

      {/* Cards grid */}
      {cards.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <p>Heç bir kart yoxdur. Yeni kart əlavə edin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, idx) => (
            <CardItem
              key={card.id}
              card={card}
              colorClass={cardColors[idx % cardColors.length]}
              onClose={handleClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}
