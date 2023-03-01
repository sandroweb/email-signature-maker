import { FC } from "react";
import { IField } from "../../types/IAppContext";

export interface FieldProps {
    field: IField;
    onChange: (field: IField) => void;
    remove: () => void;
}

const Field: FC<FieldProps> = ({ field, onChange, remove }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', gap: '15px'}}>
            <label style={{display: 'flex', flexDirection: 'column'}}>
                Label
                <input value={field.label} onChange={(e) => onChange({
                    ...field,
                    label: e.target.value,
                })} />
            </label>
            <label style={{display: 'flex', flexDirection: 'column'}}>
                Term to replace
                <input value={field.findableTerm} onChange={(e) => onChange({
                    ...field,
                    findableTerm: e.target.value,
                })} />
            </label>
            <button onClick={() => onChange({
                ...field,
                multiple: !field.multiple,
            })}>{field.multiple ? 'Multiple line' : 'Single line'}</button>
            <button onClick={() => remove()}>X</button>
        </div>
    );
}

export default Field;