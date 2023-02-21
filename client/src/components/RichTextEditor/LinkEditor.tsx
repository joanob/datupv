import { useState, useEffect } from "react";
import { linkParser } from "../../helpers/linkParser";

const LinkEditor = () => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [external, setExternal] = useState(true);
  const [parsed, setParsed] = useState("");

  useEffect(() => {
    if (external) {
      setParsed(`{"url": "${link}", "texto": "${text}"}`);
    } else {
      setParsed(`{"link": "${link}", "texto": "${text}"}`);
    }
  }, [text, link, external]);

  return (
    <div>
      <label>Enlace</label>
      <input
        type="text"
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <label>Texto</label>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <input
        type="checkbox"
        checked={external}
        onChange={(e) => {
          setExternal(e.target.checked);
        }}
      />
      <label>Enlace externo</label>
      <button
        onClick={() => {
          navigator.clipboard.writeText(parsed);
        }}
      >
        Copiar
      </button>
      <h3>Resultado</h3>
      <div>{linkParser(parsed)}</div>
    </div>
  );
};

export default LinkEditor;
