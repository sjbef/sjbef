import { useState, type FormEvent } from 'react';
import { CheckCircle, Printer, RefreshCw, Send } from 'lucide-react';
import ScholarshipApplicationForm from './ScholarshipApplicationForm';
import VolunteerServiceForm from './VolunteerServiceForm';

const copy = {
  en: {
    print: 'Print / Save complete application as PDF',
    submit: 'Submit complete application',
    submitting: 'Submitting…',
    success: 'Your application was submitted. You can print a copy for your records.',
    error: 'The application could not be submitted. Please try again or email info@sjbef.org.',
  },
  es: {
    print: 'Imprimir / Guardar solicitud completa como PDF',
    submit: 'Enviar solicitud completa',
    submitting: 'Enviando…',
    success: 'Su solicitud fue enviada. Puede imprimir una copia para sus archivos.',
    error: 'No se pudo enviar la solicitud. Inténtelo de nuevo o escriba a info@sjbef.org.',
  },
} as const;

export default function ScholarshipApplicationPacket({ lang }: { lang: 'en' | 'es' }) {
  const [isSending, setIsSending] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const text = copy[lang];

  const handlePrint = () => {
    const cleanup = () => {
      document.body.classList.remove(
        'print-scholarship-package',
        'print-scholarship-application',
        'print-volunteer-form',
      );
    };
    document.body.classList.add(
      'print-scholarship-package',
      'print-scholarship-application',
      'print-volunteer-form',
    );
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new URLSearchParams();
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, value.toString()));

    setIsSending(true);
    setSubmissionError('');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`The server returned HTTP ${response.status}.`);
      setWasSubmitted(true);
    } catch (error) {
      console.error('Scholarship application packet submission failed', error);
      setSubmissionError(error instanceof Error ? error.message : text.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      name="scholarship-package"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      onInput={() => setWasSubmitted(false)}
      className="scholarship-package-print space-y-6"
    >
      <input type="hidden" name="form-name" value="scholarship-package" />
      <p className="hidden">
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>

      <ScholarshipApplicationForm lang={lang} embedded />
      <VolunteerServiceForm lang={lang} embedded />

      <div className="scholarship-package-screen-only space-y-3">
        {wasSubmitted && (
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700" role="status">
            <CheckCircle className="h-4 w-4" />
            {text.success}
          </p>
        )}
        {submissionError && <p className="text-sm text-red-700" role="alert">{text.error} {submissionError}</p>}
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
  );
}
