import { FC } from "react";

export interface InputHTMLProps {
    label: string;
    value?: string;
    onChange: (value: string) => void;
}

const InputHTML: FC<InputHTMLProps> = ({ label, value, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <label>{label}</label>
            <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} style={{minHeight: '300px'}} />
        </div>
    );
}

export default InputHTML;