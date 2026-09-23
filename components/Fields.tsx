import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

type Option = { value: string; label: string };

type FieldProps = {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  options?: readonly Option[];
  defaultValue?: string;
  variant?: 'line';
  maxLength?: number;
};

/* Champ de formulaire : libellé 14 px, champ pilule 35 px (zone de texte arrondie 21 px). */
export function Field({ id, name, label, type = 'text', required, placeholder, autoComplete, multiline, options, defaultValue, variant, maxLength }: FieldProps) {
  let input: ReactNode;
  if (options) {
    input = (
      <select id={id} name={name} className="hk-field__input" required={required} defaultValue={defaultValue}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else if (multiline) {
    input = (
      <textarea
        id={id}
        name={name}
        className="hk-field__input hk-field__input--multiline"
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        maxLength={maxLength ?? 3000}
      />
    );
  } else {
    input = (
      <input
        id={id}
        name={name}
        type={type}
        className="hk-field__input"
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        maxLength={maxLength ?? 160}
      />
    );
  }
  return (
    <div className={cx('hk-field', variant === 'line' && 'hk-field--line')}>
      <label className="hk-field__label" htmlFor={id}>
        {label}
        {required ? ' *' : null}
      </label>
      {input}
    </div>
  );
}

/* Case à cocher carrée de 16 px */
export function Checkbox({ id, name, label, required }: { id: string; name: string; label: ReactNode; required?: boolean }) {
  return (
    <label className="hk-check" htmlFor={id}>
      <input id={id} name={name} type="checkbox" className="hk-check__box" required={required} value="oui" />
      <span>
        {label}
        {required ? ' *' : null}
      </span>
    </label>
  );
}
