import { Mail } from 'lucide-react';
import type { ComponentType } from 'react';

interface DonatePageProps {
  isActive: boolean;
  EditableText: ComponentType<{ path: string }>;
}

export default function DonatePage({ isActive, EditableText }: DonatePageProps) {
  return (
    <div className={isActive ? '' : 'hidden'}>
      <section id="donate" className="py-20 bg-white border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
              <span className="w-8 h-0.5 bg-brand-blue"></span>
              <EditableText path="donate.section_title" />
              <span className="w-8 h-0.5 bg-brand-blue"></span>
            </div>
            <h2 className="section-title">
              <EditableText path="donate.title" />
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <EditableText path="donate.description" />
            </p>
          </div>

          <div className="max-w-xl mx-auto text-center space-y-4 bg-brand-warm border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex justify-center gap-2 text-brand-blue font-bold text-sm">
              <Mail className="w-5 h-5 text-brand-teal" />
              <span><EditableText path="donate.mail_check" /></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
