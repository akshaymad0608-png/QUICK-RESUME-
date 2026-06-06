import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for entry-level professionals.",
    features: [
      { name: "1 Resume build", included: true },
      { name: "Basic templates", included: true },
      { name: "ATS score checker", included: true },
      { name: "Export to PDF", included: true },
      { name: "AI Cover letters", included: false },
      { name: "Unlimited resumes", included: false }
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "15",
    period: "/mo",
    description: "The complete toolkit to land your dream job faster.",
    features: [
      { name: "Unlimited resumes", included: true },
      { name: "All premium templates", included: true },
      { name: "Deep ATS score analysis", included: true },
      { name: "Export to PDF & DOCX", included: true },
      { name: "AI Cover letters", included: true },
      { name: "Resume keyword matcher", included: true }
    ],
    cta: "Upgrade to Pro",
    popular: true
  }
];

const Pricing: FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-[var(--color-bg-surface)] text-body flex flex-col font-sans pt-[72px]">
      <Helmet>
        <title>Pricing | QuickResume</title>
        <meta name="description" content="Simple pricing for our professional resume builder." />
      </Helmet>

      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-6">Simple, transparent pricing.</h1>
          <p className="text-lg text-body max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your job search. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1 rounded-full border border-[var(--color-border)] shadow-sm inline-flex items-center">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-surface text-heading shadow-sm border border-[var(--color-border)]' : 'text-muted hover:text-heading'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${billingCycle === 'annual' ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-heading'}`}
            >
              Annually <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md uppercase tracking-wider hidden sm:inline-block">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-white rounded-2xl p-8 flex flex-col h-full border hover:border-gray-300 transition-all ${
                plan.popular ? 'border-primary ring-1 ring-primary shadow-md' : 'border-[var(--color-border)] shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-heading">{plan.name}</h3>
                {plan.popular && (
                  <span className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="text-body text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="flex items-end gap-1 border-b border-[var(--color-border)] pb-8 mb-8">
                <span className="text-4xl font-extrabold text-heading">
                  ${billingCycle === 'annual' && plan.price !== "0" ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}
                </span>
                {plan.period && <span className="text-body font-medium mb-1">{plan.period}</span>}
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-success shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 shrink-0" />
                    )}
                    <span className={feature.included ? 'text-heading' : 'text-gray-400'}>{feature.name}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3.5 rounded-xl font-bold text-center transition-colors ${
                  plan.popular ? 'bg-primary text-white hover:bg-primary-hover shadow-sm' : 'bg-white text-heading border border-[var(--color-border)] hover:bg-gray-50'
                }`}
                onClick={() => navigate('/start')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
