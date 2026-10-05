import type { ComponentType } from 'react';
import { GraduationCap, School } from 'lucide-react';

interface LegacyPageProps {
  EditableText: ComponentType<{ path: string }>;
}

export default function LegacyPage({ EditableText }: LegacyPageProps) {
  return (
    <section id="legacy" className="py-20 bg-white border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
            <span className="w-8 h-0.5 bg-brand-blue"></span>
            <EditableText path="legacy.section_title" />
            <span className="w-8 h-0.5 bg-brand-blue"></span>
          </div>
          <h2 className="section-title">
            <EditableText path="legacy.title" />
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <EditableText path="legacy.description" />
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['1900', '1917', '1966'] as const).map((year, index) => (
            <div key={year} className="bg-brand-warm rounded-2xl p-6 border border-gray-150 text-center">
              <p className="font-serif font-bold text-3xl text-brand-blue">{year}</p>
              <h3 className="font-bold text-sm text-brand-blue mt-3">
                <EditableText path={`legacy.milestones.${index}.title`} />
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mt-2">
                <EditableText path={`legacy.milestones.${index}.description`} />
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif font-bold text-xl text-brand-blue text-center mb-6">
            <EditableText path="legacy.work_title" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="p-3 bg-brand-blue/5 rounded-xl text-brand-blue w-fit mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-brand-blue mb-2">
                <EditableText path="legacy.scholarships_title" />
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <EditableText path="legacy.scholarships_description" />
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal w-fit mb-5">
                <School className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-brand-blue mb-2">
                <EditableText path="legacy.grants_title" />
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                <EditableText path="legacy.grants_description" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
