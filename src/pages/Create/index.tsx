import { useCallback, useContext } from "react";
import Field from "../../component/Field";
import InputHTML from "../../component/InputHTML";
import AppContext from "../../providers/app/context";

const Create = () => {
    const { data, setData, generateLink } = useContext(AppContext);

    const handleHTMLChange = useCallback((value: string) => {
        setData({
            ...data,
            html: value,
        });
    }, [data, setData]);

    const removeFieldByIndex = useCallback((index: number) => {
        setData({
            ...data,
            fields: data.fields.filter((_, i) => i !== index),
        });
    }, [data, setData]);

    return (
        <section style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <header>
                <h1>Create a email signature</h1>
            </header>
            <section>
                <InputHTML label="HTML base" value={data.html} onChange={handleHTMLChange} />
            </section>
            <section style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {
                    data.fields.map((field, index) => (
                        <Field key={index} field={field} onChange={field => (
                            setData({
                                ...data,
                                fields: data.fields.map((f, i) => i === index ? field : f),
                            })
                        )} remove={() => removeFieldByIndex(index)} />
                    ))
                }
            </section>
            <section>
                <button onClick={() => setData({
                    ...data,
                    fields: [...data.fields, {
                        label: `label_${data.fields.length}`,
                        findableTerm: `findableTerm_${data.fields.length}`,
                        multiple: false,
                    }],
                })}>Add field</button>
            </section>
            <section>
                <a href={generateLink(true)}>Go to viewer mode</a>
            </section>
        </section>
    )
}

export default Create;