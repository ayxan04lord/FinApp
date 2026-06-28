import { useState, useCallback } from 'react';
import { fetchClients } from '../Components/FetchClients';

export default function ClientsPage() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleFetch = useCallback(async () => {
    setLoading(true);
    setClient(null);
    const data = await fetchClients();
    setClient(data);
    setLoading(false);
    setFetched(true);
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Müştərilər</h1>
        <p className="text-slate-400 mt-1">Random müştəri məlumatı əldə edin</p>
      </div>

      {/* Fetch button */}
      <div className="card-glass rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-white font-semibold text-lg mb-1">Müştəri Məlumatı</h2>
        <p className="text-slate-400 text-sm mb-5">Düyməyə basın — təsadüfi müştəri məlumatı gəlsin</p>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition active:scale-95"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Gətirilir...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {fetched ? 'Yenidən Gətir' : 'Müştəri Gətir'}
            </>
          )}
        </button>
      </div>

      {/* Client card */}
      {client && (
        <div className="card-glass rounded-2xl p-6 border border-violet-500/20 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
              {client.name ? client.name[0].toUpperCase() : '?'}
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">
                {client.name || <span className="text-slate-400 italic">Anonim</span>}
              </h3>
              <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">Müştəri</span>
            </div>
          </div>

          <div className="space-y-3">
            <InfoRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
              label="Telefon"
              value={client.phone || '—'}
            />
            <InfoRow
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              }
              label="Kart nömrəsi"
              value={client.card || 'Göstərilməyib'}
              mono
            />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value, mono }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/40 rounded-xl px-4 py-3">
      <span className="text-slate-400">{icon}</span>
      <div className="flex-1 flex items-center justify-between gap-2">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className={`text-white text-sm ${mono ? 'font-mono' : 'font-medium'}`}>{value}</span>
      </div>
    </div>
  );
}
