import type { ComponentType } from 'react';
import { Building, ExternalLink, GraduationCap, Languages } from 'lucide-react';

interface LegacyPageProps {
  EditableText: ComponentType<{ path: string }>;
}

export default function LegacyPage({ EditableText }: LegacyPageProps) {
  return (
    <section id="twbi" className="py-20 bg-white border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-xs">
            <span className="w-4 h-4 rounded-full bg-brand-blue/10 flex items-center justify-center text-[10px] text-brand-blue">2</span>
            <EditableText path="twbi.section_title" />
          </div>
          <h2 className="section-title">
            <EditableText path="twbi.title" />
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <EditableText path="twbi.description" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-brand-blue/5 rounded-xl text-brand-blue w-fit mb-5">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
              <EditableText path="twbi.benefits.b1_title" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <EditableText path="twbi.benefits.b1_desc" />
            </p>
          </div>

          <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-teal/20 hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal w-fit mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
              <EditableText path="twbi.benefits.b2_title" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <EditableText path="twbi.benefits.b2_desc" />
            </p>
          </div>

          <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-coral/20 hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-brand-coral/5 rounded-xl text-brand-coral w-fit mb-5">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
              <EditableText path="twbi.benefits.b3_title" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <EditableText path="twbi.benefits.b3_desc" />
            </p>
          </div>

          <div className="bg-brand-warm rounded-2xl p-6 sm:p-8 border border-gray-150 hover:border-brand-blue/20 hover:shadow-md transition-all duration-300">
            <div className="p-3 bg-brand-blue/5 rounded-xl text-brand-blue w-fit mb-5">
              <ExternalLink className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-blue mb-2">
              <EditableText path="twbi.benefits.b4_title" />
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <EditableText path="twbi.benefits.b4_desc" />
            </p>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center max-w-4xl mx-auto space-y-2">
          <div className="flex justify-center text-brand-blue">
            <Building className="w-7 h-7" />
          </div>
          <p className="text-sm text-brand-blue font-semibold">
            <EditableText path="twbi.sjusd_connection" />
          </p>
          <p className="text-xs text-gray-500">
            SJUSD features the highly recognized TWBI model, which we support through community fundraising, advocacy, and cultural events.
          </p>
        </div>
      </div>
    </section>
  );
}
