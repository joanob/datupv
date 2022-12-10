# Historia de desarrollo de DATUPV

## Web antigua

La web anterior estaba hecha con WP. No había contenido, únicamente un header con el logo y algunos links desactivados.

## Requisitos

La nueva web se iba a componer de:

- una sección de noticias tipo blog
- unas páginas estáticas con información sobre la delegación, guías y asuntos académicos
- una línea temporal de actividades
- un formulario de contacto

Hacer todo esto únicamente con WordPress era inviable. Era necesario utilizar otras tecnologías más modernas y versátiles pero considerando que debían ser fáciles de utilizar y de mantener para que los próximos responsables de la web no tengan problemas para modificarla.

## Tecnologías

La primera idea fue utilizar React como un tema del WP y WP como una API REST. Esto permite un mayor control de los estilos para cada una de las secciones manteniendo los beneficos de utilizar el panel de administración de WordPress.

La principal desventaja de utilizar WP como una API REST es que las estructuras de datos son demasiado fijas y no tengo los conocimientos de PHP para modificar WP a mi antojo. Descarté utilizar muchos plugins para conseguir las características deseadas por seguridad. WordPress es muy popular y por eso sus plugins más usados tienen muchas brechas de seguridad conocidas.

Una opción que me gustaba mucho era crear mi propia API. Utilizando Go podía crear una API muy rápida y eficiente. Sin embargo, no era una buena idea por dos motivos: debería desarrollar también un panel de administración y no es mantenible porque muy poca gente conoce Go.

La siguiente opción era crear mi propia API utilizando Node. El conjunto de tecnologías de la web sería MERN (Mongo, Express, React y Node). Con un único lenguaje, JS, sería capaz de desarrollar todo el proyecto y los futuros encargados tendrían más fácil su mantenimiento. Pero también implica mucho trabajo y había formas más rápidas y sencillas de tener una web operativa.

Firebase, o su versión open source Supabase, fueron mis siguientes opciones. Supabase puede ser autohospedada. Esto abarataría los costes pero seguía necesitando desarrollar un panel de administración.

Entonces me puse a buscar y encontré Strapi, un CMS desarrollado en Node que es open source y se puede autohostear. Es muy fácil de gestionar, da completa libertad para crear estructuras y colecciones de datos y utiliza SQLite así que no necesitaría un servidor de bases de datos corriendo como postgres.

## Estructura de la web

Las páginas principales, representadas en la barra de navegación, son:

1. Inicio
2. La delegación
   2.1 Que es la delegación
   2.2 Que hacemos
   2.3 Equipo
3. Asuntos Académicos
   3.1 Normativa
   3.2 Mistral
4. Actividades
5. Guías
6. Contacto

Algunos de los links de segundo nivel corresponden a páginas por sí mismos mientras que otros son enlaces a secciones dentro de una página

**Inicio**
Contiene el listado de noticias, paginado para que todas se puedan leer. Carousel con las útimas noticias.
