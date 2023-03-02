import { FC } from 'react';
import { IField } from '../../types/IAppContext';

export interface FieldProps {
  field: IField;
  onChange: (field: IField) => void;
  remove: () => void;
}

const Field: FC<FieldProps> = ({ field, onChange, remove }) => {
  return (
    <div className="flex items-end gap-3">
      <label className="flex flex-col gap-2">
        Label
        <input
          value={field.label}
          onChange={(e) =>
            onChange({
              ...field,
              label: e.target.value,
            })
          }
        />
      </label>
      <label className="flex flex-col gap-2">
        Term to replace
        <input
          value={field.findableTerm}
          onChange={(e) =>
            onChange({
              ...field,
              findableTerm: e.target.value,
            })
          }
        />
      </label>
      <button
        className={`bg-green-800 border-green-800 ${
          !field.multiple ? 'opacity-60' : ''
        }`}
        onClick={() =>
          onChange({
            ...field,
            multiple: !field.multiple,
          })
        }
      >
        Multiline
        {field.multiple ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      <button className="bg-red-500 border-red-500" onClick={() => remove()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Field;
