import { useState } from 'react';

const INITIAL = { firstName: '', lastName: '', phone: '', email: '', comment: '' };

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Ad tələb olunur';
    if (!form.lastName.trim()) e.lastName = 'Soyad tələb olunur';
    if (!form.email.trim()) e.email = 'Email tələb olunur';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email düzgün deyil';
    return e;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    console.log('Göndərilənlər:', form);
    setForm(INITIAL);
    setErrors({});
    setSubmitted(true);
    setLoading(false);
  };

  const handleReset = () => setSubmitted(false);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="card-glass rounded-2xl p-10 text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Göndərildi!</h2>
          <p className="text-slate-400 mb-8">Müraciətiniz uğurla qəbul edildi. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl font-medium transition"
          >
            Yenidən yaz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Əlaqə</h1>
        <p className="text-slate-400 mt-1">Bizimlə əlaqə saxlayın</p>
      </div>

      <div className="card-glass rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Ad" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} placeholder="Ayxan" />
            <Field label="Soyad" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} placeholder="Məmmədov" />
          </div>
          <Field label="Telefon" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+994 50 000 00 00" />
          <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="example@email.com" />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Şərh</label>
            <textarea
              name="comment"
              rows={4}
              className="input-field resize-none"
              placeholder="Mesajınızı yazın..."
              value={form.comment}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Göndərilir...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Göndər
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
