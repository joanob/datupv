import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <h1>
      Datupv
    </h1>
  );
});

export const head: DocumentHead = {
  title: 'Inicio | DATUPV',
  meta: [
    {
      name: 'description',
      content: 'Delegación de Alumnos de Teleco',
    },
  ],
};
