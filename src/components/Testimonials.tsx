import { FC } from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      'Landed three interviews in a week after switching to a QuickResume template. The ATS checker showed exactly what my old resume was missing.',
    name: 'Priya S.',
    role: 'Software Engineer',
    initials: 'PS',
  },
  {
    quote:
      'As a fresher I had no idea how to format my resume. The fresher template and the AI summary made it effortless — done in ten minutes.',
    name: 'Rahul M.',
    role: 'Recent Graduate',
    initials: 'RM',
  },
  {
    quote:
      'The cover letter generator matched my resume to the job description in seconds. I got a callback the same day.',
    name: 'Ananya K.',
    role: 'Marketing Associate',
    initials: 'AK',
  },
];

export const Testimonials: FC = () => (
  <section className="bg-card border-y border-line py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="max-w-2xl mb-12">
        <p className="eyebrow mb-4">Loved by job seekers</p>
        <h2 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold">
          Resumes that get replies
        </h2>
        <p className="text-lg text-mist mt-4">
          Freshers and professionals use QuickResume to get past the bots and in front of recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            className="bg-paper border border-line rounded-2xl p-6 flex flex-col"
          >
            <div className="flex gap-0.5 mb-4 text-pine" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-[15.5px] leading-relaxed text-ink flex-1">“{r.quote}”</blockquote>
            <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-line">
              <span className="w-10 h-10 rounded-full bg-pine/15 text-pine grid place-items-center font-bold text-sm">
                {r.initials}
              </span>
              <span>
                <span className="block font-bold text-ink text-sm">{r.name}</span>
                <span className="block font-mono text-[11px] tracking-[0.12em] uppercase text-mist">{r.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
