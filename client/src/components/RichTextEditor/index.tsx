import { useState } from "react";
import LinkEditor from "./LinkEditor";

/**
 * Anar afegint seccions: text, links. Tot son inputs o textareas que fan vertical stacking. Amb preview es veu com queda i es prova, es pot copiar i pujar. Es pot alternar entre text i vista. També copiar text per a modificar coses que ja estan.
 */
const RichTextEditor = () => {
  return (
    <div className="richtexteditor">
      <h2>Editor</h2>
      <LinkEditor />
    </div>
  );
};

export default RichTextEditor;
