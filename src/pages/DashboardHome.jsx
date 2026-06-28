import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Ümumi Balans', value: '₼ 1,300.00', change: '+12%', up: true, color: 'indigo' },
  { label: 'Aktiv Kartlar', value: '3', change: '+1 bu ay', up: true, color: 'emerald' },
  { label: 'Müştərilər', value: '10', change: 'Cəmi', up: null, color: 'violet' },
  { label: 'Əməliyyatlar', value: '24', change: '+5 bu həftə', up: true, color: 'amber' },
];

const colorMap = {
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const quickLinks = [
  { to: '/dashboard/cards', label: 'Kart Əlavə Et', desc: 'Yeni bank kartı əlavə edin', emoji: '💳' },
  { to: '/dashboard/clients', label: 'Müştəri Tap', desc: 'Random müştəri məlumatı', emoji: '👤' },
  { to: '/dashboard/contact', label: 'Əlaqə Formu', desc: 'Bizimlə əlaqə saxlayın', emoji: '✉️' },
];

export default function DashboardHome() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Sabahınız xeyir' : hour < 18 ? 'Günortanız xeyir' : 'Axşamınız xeyir';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-slate-400 mt-1">Hesab vəziyyətinizə baxış</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className={`card-glass rounded-2xl p-5 border ${colorMap[stat.color]}`}>
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <p className={`text-xs mt-2 ${stat.up === true ? 'text-emerald-400' : stat.up === false ? 'text-red-400' : 'text-slate-500'}`}>
              {stat.up === true ? '↑ ' : stat.up === false ? '↓ ' : ''}{stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Sürətli Keçidlər</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="card-glass rounded-2xl p-5 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition group"
            >
              <span className="text-3xl">{link.emoji}</span>
              <p className="text-white font-semibold mt-3 group-hover:text-indigo-400 transition">{link.label}</p>
              <p className="text-slate-400 text-sm mt-1">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="card-glass rounded-2xl p-5 border border-indigo-500/20 bg-indigo-500/5">
        <p className="text-slate-300 text-sm">
          <span className="text-indigo-400 font-semibold">FinApp</span> — şəxsi maliyyə idarəetmə panelinizdə xoş gəlmisiniz.
          Kartlarınızı idarə edin, müştəri məlumatlarına baxın, bizimlə əlaqə saxlayın.
        </p>
      </div>
    </div>
  );
}
