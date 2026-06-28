import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      return setError('Şifrələr uyğun gəlmir.');
    }
    if (form.password.length < 6) {
      return setError('Şifrə ən az 6 simvol olmalıdır.');
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = register(form.name, form.email, form.password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">FinApp</h1>
          <p className="text-slate-400 mt-1">Yeni hesab yaradın</p>
        </div>

        {/* Card */}
        <div className="card-glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Ad Soyad</label>
              <input
                type="text"
                name="name"
                className="input-field"
                placeholder="Ayxan Məmmədov"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Şifrə</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Şifrəni təsdiqlə</label>
              <input
                type="password"
                name="confirm"
                className="input-field"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button type="submit" className="btn-primary mt-2" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Yüklənir...
                </span>
              ) : 'Qeydiyyatdan keç'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Artıq hesabınız var?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Daxil olun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
