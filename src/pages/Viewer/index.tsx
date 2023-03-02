import { useCallback, useContext, useMemo, useState } from "react";
import AppContext from "../../providers/app/context";
import { ITerm } from "../../types/IAppContext";

const Viewer = () => {
    const {data, generateLink} = useContext(AppContext);
    const [terms, setTerms] = useState<ITerm[]>(data.fields.map(field => ({
        ...field,
        replaceTerm: '',
    })));

    const replacedHTML = useMemo<string>(() => {
        return terms.reduce((html, term) => {
            return html.split(term.findableTerm).join(term.replaceTerm);
        }, data.html);
    }, [data.html, terms])

    const download = useCallback(() => {
        const element = document.createElement("a");
        const file = new Blob([replacedHTML], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }, [replacedHTML]);

    return (
        <article className="flex flex-col gap-3">
            <header>
                <h1>Customizing your email signature</h1>
            </header>
            <section>
                <a className="button self-start" href={generateLink(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to edit mode
                </a>
            </section>
            <section className="flex flex-col gap-3">
                <h4>
                    Fields
                </h4>
                {
                    terms.map((term, index) => (
                        <div className="flex flex-col gap-1">
                            <label>{term.label}</label>
                            {
                                term.multiple ? (
                                    <textarea placeholder={term.findableTerm} value={term.replaceTerm.split('<br />').join('\n')} onChange={(e) => setTerms(terms.map((t, i) => i === index ? {
                                        ...t,
                                        replaceTerm: e.target.value.split('\n').join('<br />'),
                                    } : t))} />
                                ) : (
                                    <input placeholder={term.findableTerm} key={index} value={term.replaceTerm} onChange={(e) => setTerms(terms.map((t, i) => i === index ? {
                                        ...t,
                                        replaceTerm: e.target.value,
                                    } : t))} />
                                )
                            }
                            
                        </div>
                    ))
                }
            </section>
            <section>
                <h4>
                    HTML Preview
                </h4>
                <iframe srcDoc={replacedHTML} title="t" />
            </section>
            <section>
                <h4>
                    HTML of the signature
                </h4>
                <button className="self-start" onClick={download}>
                    Download
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </button>
                <pre>
                    {replacedHTML}
                </pre>
            </section>
        </article>
    )
}

export default Viewer;