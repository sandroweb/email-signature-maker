import { useCallback, useContext } from 'react';
import Field from '../../component/Field';
import InputHTML from '../../component/InputHTML';
import AppContext from '../../providers/app/context';

const Create = () => {
  const { data, setData, generateLink } = useContext(AppContext);

  const handleHTMLChange = useCallback(
    (value: string) => {
      setData({
        ...data,
        html: value,
      });
    },
    [data, setData]
  );

  const removeFieldByIndex = useCallback(
    (index: number) => {
      setData({
        ...data,
        fields: data.fields.filter((_, i) => i !== index),
      });
    },
    [data, setData]
  );

  return (
    <article>
      <header>
        <h1>Creating an email signature</h1>
      </header>
      <section>
        <InputHTML
          label="HTML base"
          value={data.html}
          onChange={handleHTMLChange}
        />
      </section>
      {data.fields.length > 0 && (
        <section>
          {data.fields.map((field, index) => (
            <Field
              key={index}
              field={field}
              onChange={(field) =>
                setData({
                  ...data,
                  fields: data.fields.map((f, i) => (i === index ? field : f)),
                })
              }
              remove={() => removeFieldByIndex(index)}
            />
          ))}
        </section>
      )}
      <section>
        <button
          className="self-start"
          onClick={() =>
            setData({
              ...data,
              fields: [
                ...data.fields,
                {
                  label: `label_${data.fields.length}`,
                  findableTerm: `findableTerm_${data.fields.length}`,
                  multiple: false,
                },
              ],
            })
          }
        >
          Add field
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </section>
      <section>
        <a className="self-start button" href={generateLink(true)}>
          Go to viewer mode
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
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </a>
      </section>
    </article>
  );
};

export default Create;
