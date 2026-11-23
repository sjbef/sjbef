import { useRef, useState, type FormEvent, type FormEventHandler, type InputHTMLAttributes, type ReactNode } from 'react';
import { CheckCircle, Printer, RefreshCw, Send } from 'lucide-react';

const gradeOptions = [
  { value: 'high-school-senior', name: 'grade-high-school-senior' },
  { value: 'college-freshman', name: 'grade-college-freshman' },
  { value: 'college-sophomore', name: 'grade-college-sophomore' },
  { value: 'college-junior', name: 'grade-college-junior' },
  { value: 'college-senior', name: 'grade-college-senior' },
] as const;

const copy = {
  en: {
    title: 'College Scholarship Application',
    subtitle: 'For the upcoming academic year · Deadline: February 28',
    studentInformation: 'Student and Membership Information',
    studentName: 'Student name',
    email: 'Email address',
    memberName: 'Catholic Financial Life member name',
    policyNumber: 'Policy number',
    dateOfBirth: 'Date of birth',
    chapterNumber: 'Chapter number',
    mailingAddress: 'Street address',
    city: 'City',
    state: 'State',
    zip: 'ZIP code',
    cellPhone: 'Cell phone',
    homePhone: 'Home phone',
    education: 'School Information',
    grade: 'Current grade',
    grades: {
      'high-school-senior': 'High school senior',
      'college-freshman': 'College freshman',
      'college-sophomore': 'College sophomore',
      'college-junior': 'College junior',
      'college-senior': 'College senior',
    },
    schoolName: 'School name',
    schoolCity: 'School city',
    schoolState: 'School state',
    tuitionBoard: 'Total tuition and board',
    gpa: 'GPA',
    major: 'Major',
    minor: 'Minor',
    acknowledgment: 'I apply for an SJBEF scholarship and acknowledge that I am a member of Catholic Financial Life in good standing. I attest that the information above is true and complete to the best of my knowledge.',
    signature: 'Student signature (type full name)',
    signatureDate: 'Date',
    requiredNote: '* Required field',
    optionalNote: 'Date of birth and policy number are required.',
    print: 'Print / Save as PDF',
    submit: 'Submit scholarship application',
    submitting: 'Submitting…',
    success: 'Your application was submitted. You can print a copy for your records.',
    error: 'The application could not be submitted. Please try again or email info@sjbef.org.',
    questions: 'Questions? Email info@sjbef.org or call 508-699-2764.',
  },
  es: {
    title: 'Solicitud de Beca Universitaria',
    subtitle: 'Para el próximo año académico · Fecha límite: 28 de febrero',
    studentInformation: 'Información del estudiante y membresía',
    studentName: 'Nombre del estudiante',
    email: 'Correo electrónico',
    memberName: 'Nombre del miembro de Catholic Financial Life',
    policyNumber: 'Número de póliza',
    dateOfBirth: 'Fecha de nacimiento',
    chapterNumber: 'Número de capítulo',
    mailingAddress: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zip: 'Código postal',
    cellPhone: 'Teléfono celular',
    homePhone: 'Teléfono particular',
    education: 'Información escolar',
    grade: 'Grado actual',
    grades: {
      'high-school-senior': 'Último año de secundaria',
      'college-freshman': 'Primer año universitario',
      'college-sophomore': 'Segundo año universitario',
      'college-junior': 'Tercer año universitario',
      'college-senior': 'Último año universitario',
    },
    schoolName: 'Nombre de la escuela',
    schoolCity: 'Ciudad de la escuela',
    schoolState: 'Estado de la escuela',
    tuitionBoard: 'Costo total de matrícula y alojamiento',
    gpa: 'Promedio académico (GPA)',
    major: 'Especialidad',
    minor: 'Especialidad secundaria',
    acknowledgment: 'Solicito una beca de SJBEF y reconozco que soy miembro vigente de Catholic Financial Life. Certifico que la información anterior es verdadera y completa según mi leal saber y entender.',
    signature: 'Firma del estudiante (escriba su nombre completo)',
    signatureDate: 'Fecha',
    requiredNote: '* Campo obligatorio',
    optionalNote: 'La fecha de nacimiento y el número de póliza son obligatorios.',
    print: 'Imprimir / Guardar como PDF',
    submit: 'Enviar solicitud de beca',
    submitting: 'Enviando…',
    success: 'Su solicitud fue enviada. Puede imprimir una copia para sus archivos.',
    error: 'No se pudo enviar la solicitud. Inténtelo de nuevo o escriba a info@sjbef.org.',
    questions: '¿Preguntas? Escriba a info@sjbef.org o llame al 508-699-2764.',
  },
};

interface ApplicationFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  autoComplete?: string;
  min?: number;
  step?: number | 'any';
  wide?: boolean;
}

function ApplicationField({
  id,
  name,
  label,
  required = false,
  type = 'text',
  autoComplete,
  min,
  step,
  wide = false,
}: ApplicationFieldProps) {
  return (
    <label className={`scholarship-field ${wide ? 'scholarship-field-wide' : ''}`} htmlFor={id}>
      <span className="scholarship-field-label">
        {label}{required && <span className="scholarship-required-mark"> *</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        min={min}
        step={step}
        className="scholarship-field-input w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
      />
    </label>
  );
}

interface ScholarshipApplicationFormProps {
  lang: 'en' | 'es';
  embedded?: boolean;
}

function ScholarshipFormWrapper({
  embedded,
  className,
  onSubmit,
  onInput,
  children,
}: {
  embedded: boolean;
  className: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onInput: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}) {
  if (embedded) return <div className={className}>{children}</div>;
  return (
    <form
      name="scholarship-application"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      onInput={onInput}
      className={className}
    >
      {children}
    </form>
  );
}

export default function ScholarshipApplicationForm({ lang, embedded = false }: ScholarshipApplicationFormProps) {
  const [grade, setGrade] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const firstGradeRef = useRef<HTMLInputElement>(null);
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
    if (!grade) {
      firstGradeRef.current?.setCustomValidity(lang === 'en' ? 'Select your current grade.' : 'Seleccione su grado actual.');
      firstGradeRef.current?.reportValidity();
      firstGradeRef.current?.focus();
      return;
    }

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
      console.error('Scholarship application submission failed', error);
      setSubmissionError(error instanceof Error ? error.message : text.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="scholarship-application-form"
      className="scholarship-print-area bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md"
    >
      <header className="text-center border-b border-gray-200 pb-4 mb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">
          Saint-Jean-Baptiste Educational Foundation
        </p>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue mt-2">
          {text.title}
        </h3>
        <p className="text-sm font-semibold text-gray-700 mt-1">{text.subtitle}</p>
      </header>

      <ScholarshipFormWrapper
        embedded={embedded}
        onSubmit={handleSubmit}
        onInput={() => setWasSubmitted(false)}
        className="space-y-6"
      >
        {!embedded && (
          <>
            <input type="hidden" name="form-name" value="scholarship-application" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
              </label>
            </p>
          </>
        )}

        <section className="scholarship-application-section space-y-3">
          <h4 className="font-serif font-bold text-lg text-brand-blue">{text.studentInformation}</h4>
          <div className="scholarship-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ApplicationField id="applicant-name" name="applicant-name" label={text.studentName} required autoComplete="name" />
            <ApplicationField id="student-email" name="student-email" label={text.email} type="email" required autoComplete="email" />
            <ApplicationField id="member-name" name="member-name" label={text.memberName} required />
            <ApplicationField id="policy-number" name="policy-number" label={text.policyNumber} required />
            <ApplicationField id="date-of-birth" name="date-of-birth" label={text.dateOfBirth} required />
            <ApplicationField id="chapter-number" name="chapter-number" label={text.chapterNumber} required />
            <ApplicationField id="mailing-address" name="mailing-address" label={text.mailingAddress} required wide autoComplete="street-address" />
            <ApplicationField id="applicant-city" name="applicant-city" label={text.city} required autoComplete="address-level2" />
            <ApplicationField id="applicant-state" name="applicant-state" label={text.state} required autoComplete="address-level1" />
            <ApplicationField id="applicant-zip" name="applicant-zip" label={text.zip} required autoComplete="postal-code" />
            <ApplicationField id="cell-phone" name="cell-phone" label={text.cellPhone} type="tel" required autoComplete="tel" />
            <ApplicationField id="home-phone" name="home-phone" label={text.homePhone} type="tel" />
          </div>
        </section>

        <section className="scholarship-application-section space-y-3">
          <h4 className="font-serif font-bold text-lg text-brand-blue">{text.education}</h4>
          <fieldset className="scholarship-grade-group">
            <legend className="scholarship-field-label text-sm font-bold text-gray-700 mb-2">
              {text.grade} <span className="scholarship-required-mark">*</span>
            </legend>
            <div className="scholarship-grade-options flex flex-wrap gap-x-5 gap-y-2">
              {gradeOptions.map((option, index) => (
                <label key={option.value} className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    ref={index === 0 ? firstGradeRef : undefined}
                    type="checkbox"
                    name={option.name}
                    value="Yes"
                    checked={grade === option.value}
                    required={index === 0 && !grade}
                    onChange={(event) => {
                      firstGradeRef.current?.setCustomValidity('');
                      if (event.target.checked) setGrade(option.value);
                      else setGrade('');
                    }}
                    className="scholarship-grade-checkbox h-4 w-4 rounded border-gray-300 text-brand-blue accent-brand-blue focus:ring-brand-blue"
                  />
                  {text.grades[option.value]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="scholarship-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ApplicationField id="school-name" name="school-name" label={text.schoolName} required wide />
            <ApplicationField id="school-city" name="school-city" label={text.schoolCity} required />
            <ApplicationField id="school-state" name="school-state" label={text.schoolState} required />
            <ApplicationField id="tuition-board" name="tuition-board" label={text.tuitionBoard} type="text" required />
            <ApplicationField id="gpa" name="gpa" label={text.gpa} type="text" required />
            <ApplicationField id="major" name="major" label={text.major} required />
            <ApplicationField id="minor" name="minor" label={text.minor} />
          </div>
        </section>

        <section className="scholarship-application-section scholarship-attestation space-y-4">
          <label className="scholarship-acknowledgment flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
            <input
              type="checkbox"
              name="application-acknowledgment"
              value="Agreed"
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-blue accent-brand-blue focus:ring-brand-blue"
            />
            <span>{text.acknowledgment} *</span>
          </label>
          <p className="scholarship-optional-note text-xs text-gray-500">{text.optionalNote}</p>
          <div className="scholarship-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ApplicationField id="student-signature" name="student-signature" label={text.signature} required />
            <ApplicationField id="signature-date" name="signature-date" label={text.signatureDate} type="date" required />
          </div>
        </section>

        <footer className="scholarship-form-footer border-t border-gray-200 pt-3 text-xs text-gray-600">
          <p>{text.questions}</p>
        </footer>

        {!embedded && <div className="scholarship-screen-only space-y-3">
          <p className="text-xs text-gray-500">{text.requiredNote}</p>
          {wasSubmitted && (
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700" role="status">
              <CheckCircle className="h-4 w-4" />
              {text.success}
            </p>
          )}
          {submissionError && (
            <p className="text-sm text-red-700" role="alert">
              {text.error} {submissionError}
            </p>
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
        </div>}
      </ScholarshipFormWrapper>
    </section>
  );
}
