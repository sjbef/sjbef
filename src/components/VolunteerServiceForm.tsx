import { useState, type FormEvent } from 'react';
import { CheckCircle, Printer, RefreshCw, Send } from 'lucide-react';

const ENTRY_COUNT = 8;

const copy = {
  en: {
    title: 'Scholarship Program - Summary of Volunteer Service',
    subtitle: 'Return with your scholarship application by February 28',
    instructions: 'List your leadership roles and volunteer service. Preference is given to students who volunteered for a Catholic Financial Life chapter, the Society of Saint Vincent de Paul, a local parish, or another nonprofit organization. Add a separate sheet if you need more space.',
    studentName: 'Student name',
    leadershipTitle: 'Student Leadership Positions',
    leadershipYears: 'Year(s) served',
    organization: 'Name of organization',
    leadershipRole: 'Leadership role within organization',
    volunteerTitle: 'Student Volunteer Services',
    volunteerService: 'Volunteer service',
    contribution: "Describe your contribution to the organization's mission",
    print: 'Print / Save as PDF',
    submit: 'Submit volunteer form',
    submitting: 'Submitting…',
    success: 'Your volunteer form was submitted. You can print a copy for your records.',
    error: 'The form could not be submitted. Please try again or email info@sjbef.org.',
    mail: 'Mail with your scholarship application to SJBEF, P.O. Box 496, North Attleboro, MA 02761.',
    questions: 'Questions? Email info@sjbef.org or call 508-699-2764.',
    printingNote: 'Use your browser’s print dialog to print or save this form as a PDF.',
  },
  es: {
    title: 'Programa de Becas - Resumen del Servicio Voluntario',
    subtitle: 'Envíe este formulario junto con su solicitud de beca antes del 28 de febrero',
    instructions: 'Indique sus cargos de liderazgo y servicio voluntario. Se dará preferencia a estudiantes que hayan realizado voluntariado para un capítulo de Catholic Financial Life, la Sociedad de San Vicente de Paúl, una parroquia local u otra organización sin fines de lucro. Adjunte otra hoja si necesita más espacio.',
    studentName: 'Nombre del estudiante',
    leadershipTitle: 'Cargos de Liderazgo Estudiantil',
    leadershipYears: 'Año(s) de servicio',
    organization: 'Nombre de la organización',
    leadershipRole: 'Cargo de liderazgo en la organización',
    volunteerTitle: 'Servicio Voluntario Estudiantil',
    volunteerService: 'Servicio voluntario',
    contribution: 'Describa su contribución a la misión de la organización',
    print: 'Imprimir / Guardar como PDF',
    submit: 'Enviar formulario de voluntariado',
    submitting: 'Enviando…',
    success: 'Su formulario fue enviado. Puede imprimir una copia para sus archivos.',
    error: 'No se pudo enviar el formulario. Inténtelo de nuevo o escriba a info@sjbef.org.',
    mail: 'Envíelo junto con su solicitud de beca a SJBEF, P.O. Box 496, North Attleboro, MA 02761.',
    questions: '¿Preguntas? Escriba a info@sjbef.org o llame al 508-699-2764.',
    printingNote: 'Use el diálogo de impresión del navegador para imprimir o guardar este formulario como PDF.',
  },
};

interface VolunteerServiceFormProps {
  lang: 'en' | 'es';
}

export default function VolunteerServiceForm({ lang }: VolunteerServiceFormProps) {
  const [isSending, setIsSending] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const text = copy[lang];

  const handlePrint = () => {
    const cleanup = () => document.body.classList.remove('print-volunteer-form');
    document.body.classList.add('print-volunteer-form');
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, value.toString()));

    setIsSending(true);
    setHasError(false);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setWasSubmitted(true);
    } catch (error) {
      console.error('Volunteer form submission failed', error);
      setHasError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="volunteer-service-form"
      className="volunteer-print-area bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md"
    >
      <header className="text-center border-b border-gray-200 pb-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">
          Saint-Jean-Baptiste Educational Foundation
        </p>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue mt-2">
          {text.title}
        </h3>
        <p className="text-sm font-semibold text-gray-700 mt-2">{text.subtitle}</p>
      </header>

      <p className="text-sm text-gray-600 leading-relaxed mb-6">{text.instructions}</p>

      <form
        name="volunteer-service"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onInput={() => setWasSubmitted(false)}
        className="space-y-8"
      >
        <input type="hidden" name="form-name" value="volunteer-service" />
        <p className="hidden">
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="max-w-xl">
          <label htmlFor="student-name" className="block text-sm font-bold text-brand-blue mb-1.5">
            {text.studentName} *
          </label>
          <input
            id="student-name"
            name="student-name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className="volunteer-field-input w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>

        <section className="volunteer-form-section space-y-3">
          <h4 className="font-serif font-bold text-lg text-brand-blue">{text.leadershipTitle}</h4>
          <div className="volunteer-column-headings hidden text-[10px] font-bold uppercase tracking-wide text-gray-600">
            <span>{text.leadershipYears}</span>
            <span>{text.organization}</span>
            <span>{text.leadershipRole}</span>
          </div>
          <div className="space-y-3">
            {Array.from({ length: ENTRY_COUNT }, (_, index) => {
              const entry = index + 1;
              return (
                <div
                  key={entry}
                  className="volunteer-form-entry grid grid-cols-1 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:grid-cols-3"
                >
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.leadershipYears}</span>
                    <input
                      name={`leadership-${entry}-years`}
                      type="text"
                      maxLength={40}
                      placeholder="e.g. 2022–2023"
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.organization}</span>
                    <input
                      name={`leadership-${entry}-organization`}
                      type="text"
                      maxLength={120}
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.leadershipRole}</span>
                    <input
                      name={`leadership-${entry}-role`}
                      type="text"
                      maxLength={120}
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>

        <section className="volunteer-form-section volunteer-services-section space-y-3">
          <h4 className="font-serif font-bold text-lg text-brand-blue">{text.volunteerTitle}</h4>
          <div className="volunteer-column-headings volunteer-service-headings hidden text-[10px] font-bold uppercase tracking-wide text-gray-600">
            <span>{text.leadershipYears}</span>
            <span>{text.organization}</span>
            <span>{text.volunteerService}</span>
            <span>{text.contribution}</span>
          </div>
          <div className="space-y-3">
            {Array.from({ length: ENTRY_COUNT }, (_, index) => {
              const entry = index + 1;
              return (
                <div
                  key={entry}
                  className="volunteer-form-entry volunteer-service-entry grid grid-cols-1 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.leadershipYears}</span>
                    <input
                      name={`service-${entry}-years`}
                      type="text"
                      maxLength={40}
                      placeholder="e.g. 2022–2023"
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.organization}</span>
                    <input
                      name={`service-${entry}-organization`}
                      type="text"
                      maxLength={120}
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.volunteerService}</span>
                    <input
                      name={`service-${entry}-type`}
                      type="text"
                      maxLength={120}
                      className="volunteer-field-input mt-1 w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                  <label className="text-xs font-semibold text-gray-600">
                    <span className="volunteer-field-label">{text.contribution}</span>
                    <textarea
                      name={`service-${entry}-contribution`}
                      rows={2}
                      maxLength={500}
                      className="volunteer-field-input mt-1 w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-sm font-normal text-gray-900"
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="volunteer-form-footer border-t border-gray-200 pt-4 text-xs text-gray-600">
          <p>{text.mail}</p>
          <p className="mt-1">{text.questions}</p>
        </footer>

        <div className="volunteer-screen-only space-y-3">
          <p className="text-xs text-gray-500">{text.printingNote}</p>
          {wasSubmitted && (
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700" role="status">
              <CheckCircle className="h-4 w-4" />
              {text.success}
            </p>
          )}
          {hasError && (
            <p className="text-sm text-red-700" role="alert">{text.error}</p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-blue px-5 py-3 text-sm font-bold text-brand-blue transition hover:bg-brand-blue/5"
            >
              <Printer className="h-4 w-4" />
              {text.print}
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-coral px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-coral/95 disabled:cursor-wait disabled:opacity-70"
            >
              {isSending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSending ? text.submitting : text.submit}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
