import { useContext, useMemo, useState } from "react";
import AppContext from "../../providers/app/context";
import { ITerm } from "../../types/IAppContext";

const Viewer = () => {
    const {data, generateLink} = useContext(AppContext);
    const [terms, setTerms] = useState<ITerm[]>(data.fields.map(field => ({
        ...field,
        replaceTerm: field.findableTerm,
    })));

    const replacedHTML = useMemo<string>(() => {
        return terms.reduce((html, term) => {
            return html.split(term.findableTerm).join(term.replaceTerm);
        }, data.html);
    }, [data.html, terms])

    return (
        <section style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <section>
                <a href={generateLink(false)}>Back to edit mode</a>
            </section>
            <section style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <h4>
                    Fields
                </h4>
                {
                    terms.map((term, index) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label>{term.label}</label>
                            {
                                term.multiple ? (
                                    <textarea value={term.replaceTerm.split('<br />').join('\n')} onChange={(e) => setTerms(terms.map((t, i) => i === index ? {
                                        ...t,
                                        replaceTerm: e.target.value.split('\n').join('<br />'),
                                    } : t))} />
                                ) : (
                                    <input key={index} value={term.replaceTerm} onChange={(e) => setTerms(terms.map((t, i) => i === index ? {
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
                <iframe style={{border: '1px solid #000'}} srcDoc={replacedHTML} title="t" />
            </section>
            <section>
                <h4>
                    HTML of the signature
                </h4>
                <pre style={{maxWidth: '100%', backgroundColor: '#CCC', padding: '20px;', overflow: 'auto'}}>
                    {replacedHTML}
                </pre>
            </section>
        </section>
    )
}

export default Viewer;