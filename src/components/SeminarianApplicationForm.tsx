import { useState, type FormEvent } from 'react';
import { CheckCircle, Printer, RefreshCw, Send } from 'lucide-react';

const copy = {
  en: {
    title: 'Application for Theological Scholarship',
    subtitle: 'Saint-Jean-Baptiste Educational Foundation · Providing educational aid since 1966',
    personal: 'Applicant Information',
    firstName: 'First name',
    middleName: 'Middle name',
    lastName: 'Last name',
    address: 'Home address',
    city: 'City',
    state: 'State',
    zip: 'ZIP',
    homePhone: 'Home phone',
    cellPhone: 'Cell phone',
    dateOfBirth: 'Date of birth',
    placeOfBirth: 'Place of birth',
    member: 'Are you a member of Catholic Financial Life?',
    yes: 'Yes',
    no: 'No',
    chapter: 'Chapter',
    chapterLocation: 'Chapter city/state',
    seminaryInformation: 'Seminary Information',
    seminary: 'Name of seminary you are attending',
    seminaryAddress: 'Seminary address',
    seminaryCity: 'City',
    seminaryState: 'State',
    seminaryZip: 'ZIP',
    studyYear: 'Year of theological studies',
    first: 'First',
    second: 'Second',
    third: 'Third',
    fourth: 'Fourth',
    special: 'Special',
    specialExplain: 'Please explain if special',
    diocese: 'By what diocese or religious order have you been accepted for priestly ministry after ordination?',
    ordinationDate: 'Expected date of ordination',
    family: 'Family and Financial Information',
    previousAid: 'Have you previously received educational financial aid from the SJB Educational Foundation?',
    previousYears: 'If yes, what years?',
    parent1: 'Parent 1',
    parent2: 'Parent 2',
    parentName: 'Name',
    parentAddress: 'Address',
    parentCityStateZip: 'City / State / ZIP',
    dependents: 'Family dependents including applicant',
    checkAddress: 'Address where scholarship check should be sent',
    requiredNote: '* Required field',
    print: 'Print / Save as PDF',
    submit: 'Submit seminarian application',
    submitting: 'Submitting…',
    success: 'Your application was submitted. You can print a copy for your records.',
    error: 'The application could not be submitted. Please try again or email info@sjbef.org.',
    questions: 'Questions? Email info@sjbef.org or call 508-699-2764.',
    legacy: 'The existing Google seminarian form is also available.',
  },
  es: {
    title: 'Solicitud de Beca de Teología',
    subtitle: 'Fundación Educativa Saint-Jean-Baptiste · Brindando ayuda educativa desde 1966',
    personal: 'Información del solicitante',
    firstName: 'Nombre',
    middleName: 'Segundo nombre',
    lastName: 'Apellido',
    address: 'Dirección particular',
    city: 'Ciudad',
    state: 'Estado',
    zip: 'Código postal',
    homePhone: 'Teléfono particular',
    cellPhone: 'Teléfono celular',
    dateOfBirth: 'Fecha de nacimiento',
    placeOfBirth: 'Lugar de nacimiento',
    member: '¿Es miembro de Catholic Financial Life?',
    yes: 'Sí',
    no: 'No',
    chapter: 'Capítulo',
    chapterLocation: 'Ciudad/estado del capítulo',
    seminaryInformation: 'Información del seminario',
    seminary: 'Nombre del seminario al que asiste',
    seminaryAddress: 'Dirección del seminario',
    seminaryCity: 'Ciudad',
    seminaryState: 'Estado',
    seminaryZip: 'Código postal',
    studyYear: 'Año de estudios teológicos',
    first: 'Primero',
    second: 'Segundo',
    third: 'Tercero',
    fourth: 'Cuarto',
    special: 'Especial',
    specialExplain: 'Explique si es especial',
    diocese: '¿Qué diócesis u orden religiosa lo ha aceptado para el ministerio sacerdotal después de la ordenación?',
    ordinationDate: 'Fecha prevista de ordenación',
    family: 'Información familiar y financiera',
    previousAid: '¿Ha recibido anteriormente ayuda educativa de la Fundación Educativa SJB?',
    previousYears: 'Si respondió sí, ¿en qué años?',
    parent1: 'Progenitor 1',
    parent2: 'Progenitor 2',
    parentName: 'Nombre',
    parentAddress: 'Dirección',
    parentCityStateZip: 'Ciudad / Estado / Código postal',
    dependents: 'Dependientes familiares, incluido el solicitante',
    checkAddress: 'Dirección para enviar el cheque de la beca',
    requiredNote: '* Campo obligatorio',
    print: 'Imprimir / Guardar como PDF',
    submit: 'Enviar solicitud para seminarista',
    submitting: 'Enviando…',
    success: 'Su solicitud fue enviada. Puede imprimir una copia para sus archivos.',
    error: 'No se pudo enviar la solicitud. Inténtelo de nuevo o escriba a info@sjbef.org.',
    questions: '¿Preguntas? Escriba a info@sjbef.org o llame al 508-699-2764.',
    legacy: 'También está disponible el formulario existente de Google para seminaristas.',
  },
} as const;

type Language = keyof typeof copy;
type CopyKey = keyof typeof copy.en;

interface FieldProps {
  name: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'tel' | 'number';
  wide?: boolean;
  min?: number;
}

function Field({ name, label, required = false, type = 'text', wide = false, min }: FieldProps) {
  return (
    <label className={`seminarian-field${wide ? ' seminarian-field-wide' : ''}`} htmlFor={`seminarian-${name}`}>
      <span className="seminarian-field-label">{label}{required && <span> *</span>}</span>
      <input
        id={`seminarian-${name}`}
        name={name}
        type={type}
        required={required}
        min={min}
        className="seminarian-field-input w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
      />
    </label>
  );
}

function TextArea({ name, label, required = false, rows = 2 }: { name: string; label: string; required?: boolean; rows?: number }) {
  return (
    <label className="seminarian-field block" htmlFor={`seminarian-${name}`}>
      <span className="seminarian-field-label">{label}{required && <span> *</span>}</span>
      <textarea
        id={`seminarian-${name}`}
        name={name}
        required={required}
        rows={rows}
        className="seminarian-field-input w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
      />
    </label>
  );
}

function RadioChoices({
  name,
  label,
  choices,
  required = false,
  onChange,
}: {
  name: string;
  label: string;
  choices: readonly { value: string; label: string }[];
  required?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <fieldset className="seminarian-choice-group">
      <legend className="seminarian-field-label">{label}{required && <span> *</span>}</legend>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {choices.map((choice, index) => (
          <label key={choice.value} className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={choice.value}
              required={required && index === 0}
              onChange={() => onChange?.(choice.value)}
              className="h-4 w-4 accent-brand-blue"
            />
            {choice.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function SeminarianApplicationForm({ lang }: { lang: Language }) {
  const [member, setMember] = useState('');
  const [studyYear, setStudyYear] = useState('');
  const [previousAid, setPreviousAid] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const text = copy[lang];
  const label = (key: CopyKey) => text[key];

  const handlePrint = () => {
    const cleanup = () => document.body.classList.remove('print-seminarian-application');
    document.body.classList.add('print-seminarian-application');
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
      console.error('Seminarian application submission failed', error);
      setSubmissionError(error instanceof Error ? error.message : text.error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="seminarian-application-form" className="seminarian-print-area rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8">
      <header className="seminarian-form-header mb-5 border-b border-gray-200 pb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Saint-Jean-Baptiste Educational Foundation</p>
        <h3 className="mt-2 font-serif text-xl font-bold text-brand-blue sm:text-2xl">{label('title')}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-700">{label('subtitle')}</p>
      </header>

      <form
        name="seminarian-application"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onInput={() => setWasSubmitted(false)}
        className="space-y-5"
      >
        <input type="hidden" name="form-name" value="seminarian-application" />
        <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>

        <section className="seminarian-form-section space-y-3">
          <h4 className="font-serif text-lg font-bold text-brand-blue">{label('personal')}</h4>
          <div className="seminarian-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field name="first-name" label={label('firstName')} required />
            <Field name="middle-name" label={label('middleName')} />
            <Field name="last-name" label={label('lastName')} required wide />
            <Field name="home-address" label={label('address')} required wide />
            <Field name="home-city" label={label('city')} required />
            <Field name="home-state" label={label('state')} required />
            <Field name="home-zip" label={label('zip')} required />
            <Field name="home-phone" label={label('homePhone')} type="tel" />
            <Field name="cell-phone" label={label('cellPhone')} type="tel" required />
            <Field name="date-of-birth" label={label('dateOfBirth')} />
            <Field name="place-of-birth" label={label('placeOfBirth')} required wide />
          </div>
          <RadioChoices
            name="cfl-member"
            label={label('member')}
            required
            onChange={setMember}
            choices={[{ value: 'Yes', label: label('yes') }, { value: 'No', label: label('no') }]}
          />
          {member === 'Yes' && (
            <div className="seminarian-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field name="chapter-number" label={label('chapter')} required />
              <Field name="chapter-city-state" label={label('chapterLocation')} required />
            </div>
          )}
        </section>

        <section className="seminarian-form-section space-y-3">
          <h4 className="font-serif text-lg font-bold text-brand-blue">{label('seminaryInformation')}</h4>
          <div className="seminarian-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field name="seminary-name" label={label('seminary')} required wide />
            <Field name="seminary-address" label={label('seminaryAddress')} required wide />
            <Field name="seminary-city" label={label('seminaryCity')} required />
            <Field name="seminary-state" label={label('seminaryState')} required />
            <Field name="seminary-zip" label={label('seminaryZip')} required />
          </div>
          <RadioChoices
            name="theological-study-year"
            label={label('studyYear')}
            required
            onChange={setStudyYear}
            choices={['first', 'second', 'third', 'fourth', 'special'].map((key) => ({ value: key, label: label(key as CopyKey) }))}
          />
          {studyYear === 'special' && <Field name="special-study-explanation" label={label('specialExplain')} required wide />}
          <TextArea name="accepted-diocese-or-order" label={label('diocese')} required />
          <Field name="expected-ordination-date" label={label('ordinationDate')} required />
        </section>

        <section className="seminarian-form-section seminarian-continuation space-y-3">
          <h4 className="font-serif text-lg font-bold text-brand-blue">{label('family')}</h4>
          <RadioChoices
            name="previous-sjbef-aid"
            label={label('previousAid')}
            required
            onChange={setPreviousAid}
            choices={[{ value: 'Yes', label: label('yes') }, { value: 'No', label: label('no') }]}
          />
          {previousAid === 'Yes' && <Field name="previous-aid-years" label={label('previousYears')} required wide />}

          {([1, 2] as const).map((parent) => (
            <fieldset key={parent} className="seminarian-parent-group space-y-2">
              <legend className="font-semibold text-gray-800">{label(parent === 1 ? 'parent1' : 'parent2')}</legend>
              <div className="seminarian-fields-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field name={`parent-${parent}-name`} label={label('parentName')} required={parent === 1} />
                <Field name={`parent-${parent}-address`} label={label('parentAddress')} required={parent === 1} />
                <Field name={`parent-${parent}-city-state-zip`} label={label('parentCityStateZip')} required={parent === 1} wide />
              </div>
            </fieldset>
          ))}
          <Field name="family-dependents" label={label('dependents')} type="number" min={1} required />
          <TextArea name="scholarship-check-address" label={label('checkAddress')} required rows={3} />
        </section>

        <footer className="seminarian-form-footer border-t border-gray-200 pt-3 text-xs text-gray-600">
          <p>{label('questions')}</p>
        </footer>

        <div className="seminarian-screen-only space-y-3">
          <p className="text-xs text-gray-500">{label('requiredNote')}</p>
          {wasSubmitted && <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700" role="status"><CheckCircle className="h-4 w-4" />{label('success')}</p>}
          {submissionError && <p className="text-sm text-red-700" role="alert">{label('error')} {submissionError}</p>}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handlePrint} className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-blue px-5 py-3 text-sm font-bold text-brand-blue hover:bg-brand-blue/5">
              <Printer className="h-4 w-4" />{label('print')}
            </button>
            <button type="submit" disabled={isSending} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-coral px-5 py-3 text-sm font-bold text-white hover:bg-brand-coral/95 disabled:cursor-wait disabled:opacity-70">
              {isSending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {isSending ? label('submitting') : label('submit')}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
