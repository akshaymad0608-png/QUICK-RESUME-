import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    try {
      setIsLoading(true);
      const res = await fetch('/api/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (res.ok) {
        if (data.demoOtp) toast.success(`Demo Mode: OTP is ${data.demoOtp}`, { duration: 6000 });
        else toast.success('OTP sent to your email!');
        setStep('otp');
      } else toast.error(data.error || 'Failed to send OTP');
    } catch (err) { console.error(err); toast.error('Network error.'); }
    finally { setIsLoading(false); }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) { toast.error('Please enter the OTP'); return; }
    try {
      setIsLoading(true);
      const res = await fetch('/api/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) });
      const data = await res.json();
      if (res.ok) {
        toast.success('Successfully logged in!');
        try { await fetch('/api/send-welcome-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, name: email.split('@')[0] }) }); } catch {}
        navigate('/choose-template');
      } else toast.error(data.error || 'Invalid OTP');
    } catch (err) { console.error(err); toast.error('Network error.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col" style={{background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0f9ff 100%)'}}>
      <Helmet><title>Log In - QuickResume.business</title></Helmet>

      <header className="w-full bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm" style={{borderColor: '#e9d5ff'}}>
        <Link to="/" className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
            <FileText size={18} />
          </div>
          QuickResume.business
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8 text-center" style={{borderColor: '#e9d5ff'}}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-md" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
            <FileText size={30} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'email' ? 'Welcome back 👋' : 'Check your email 📬'}
          </h1>
          <p className="text-gray-500 mb-8">
            {step === 'email' ? 'Sign in with your email to continue building your resume.' : `We sent a 6-digit code to ${email}`}
          </p>

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" autoFocus required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all text-gray-900"
                  style={{}} onFocus={e => e.target.style.borderColor='#7c3aed'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full py-3.5 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md hover:opacity-90"
                style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                {isLoading ? 'Sending...' : 'Continue with Email'} <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 text-left">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Enter OTP Code</label>
                <input type="text" autoFocus required maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-all text-center text-2xl font-mono tracking-[0.5em] text-gray-900" />
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full py-3.5 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-md hover:opacity-90"
                style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                {isLoading ? 'Verifying...' : 'Verify & Sign In'} <CheckCircle2 size={18} />
              </button>
              <div className="text-center mt-2">
                <button type="button" onClick={() => setStep('email')} className="text-sm font-medium hover:underline" style={{color: '#7c3aed'}}>
                  ← Use a different email
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-gray-400 mt-8">
            By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
