import { FC } from "react";

export interface InputHTMLProps {
    label: string;
    value?: string;
    onChange: (value: string) => void;
}

const InputHTML: FC<InputHTMLProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex flex-col">
            <label>{label}</label>
            <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} className="h-80" />
        </div>
    );
}

export default InputHTML;