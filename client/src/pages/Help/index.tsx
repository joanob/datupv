import { Link } from "react-router-dom"
import { textParser } from "../../helpers/textParser"
import TableSection from "../../features/Posts/TableSection"

const HelpPage = () => {
    const clientUrl = import.meta.env.VITE_CLIENT_URL

    // TODO: editor (previsualizar páginas y noticias)

    // TODO: m'he quedat per parrafos, imagenes, tablas y listas. Posar dins dels parrafos les negrites i els links. No oblidar-me dels encabezados

    return (
        <main className="main newspage">
            <header>
                <h2>Ayuda</h2>
                <p className="subtitulo">{textParser(`Esta página es la referencia para gestionar el contenido de esta web. Si tu duda no se resuelve aquí me puedes preguntar por {"url": "https://instagram.com/ob.joan", "texto": "Instagram"}.`)}</p>
            </header>
            <article className="article">
                <h3>Índice de contenidos</h3>
                <ul>
                    <li><Link to="#admin">Panel de administración</Link></li>
                    <li><Link to="#editor">Editor</Link></li>
                    <li><Link to="#nav">Páginas y navegación</Link></li>
                    <li><Link to="#noticias">Noticias</Link></li>
                    <li><Link to="#cuerpo">Párrafos, imágenes, tablas y listas</Link></li>
                    <li><Link to="#multimedia">Multimedia</Link></li>
                </ul>

                <h3 id="admin">Panel de administración</h3>
                <p>{textParser(`Para acceder al {"url": "` + clientUrl + `/admin", "texto": "panel de administración"} se necesita una cuenta de administrador. Hay dos secciones: content manager y media library. En la primera podremos modificar los enlaces de navegación, las noticias y las páginas, además de acceder a las consultas que los visitantes dejan en el formulario de contacto. La sección Users está vacía porque nuestra web no permite que los usuarios se registren. En media library están los archivos multimedia que podemos utilizar en nuestras páginas y noticias.`)}</p>

                <h3 id="editor">Editor</h3>
                <p>El <Link to={"/editor"} target="__blank">editor</Link> actualmente solo permite ver las páginas y noticias. Se utiliza para previsualizar los borradores de páginas y noticias. Para ver los cambios es importante guardar la página o noticia que se está editando.</p>

                <h3 id="nav">Páginas y navegación</h3>

                <p>Se pueden crear, modificar y publicar páginas en Content Manager / Paginas. Las páginas solamente tienen título y cuerpo. El cuerpo está compuesto por componentes como encabezados, párrafos e imágenes que se detallan más tarde. No tienen url porque por sí mismas no son visitables: para poder ver una página debe estar enlazada en la navegación.</p>

                <p>En la parte superior de la web se muestran los enlaces. Cada enlace tiene una url, el texto que muestra, un índice de ordenación y la referencia a la página que enlaza. El enlace de contacto es un caso especial porque la página de contacto no es editable y por lo tanto no aparece en páginas pero el enlace existe para que se pueda modificar su orden.</p>

                <h4>Subenlaces</h4>

                <p>Los enlaces se pueden agrupar utilizando subenlaces. Al añadir subenlaces a una página, en enlace principal se desactiva. Estos subenlaces también están ordenados y permiten mostrar el contenido en una página o varias páginas.</p>

                <p>Supongamos un enlace "Delegación" con tres subenlaces: "Qué es la delegación", "Qué hacemos" y "El equipo". Como todo este contenido está relacionado podemos mostrar todas estas páginas en una página activando la opción de una página. En una misma página se mostrarán las diferentes páginas como secciones de una misma página.</p>

                <p>Al pulsar uno de los subenlaces se cargará toda la página y automáticamente se desplazará la pantalla hasta el contenido del subenlace seleccionado. En este caso aunque el enlace principal esté desativado el contenido de la página a la que haga referencia se mostrará en la parte superior como si fuera el encabezado de la página.</p>

                <p>Si por el contrario queremos que cada subenlace sea completamente independiente podemos desmarcar la opción de una página. Cada enlace abrirá su propia página independiente de la otra.</p>

                <h4>Posibles errores</h4>

                <h5>Página no encontrada</h5>

                <p>Para que las páginas sean accesibles deben estar publicadas. Si un enlace redirige a una página no encontrada el error puede ser que esa página no esté publicada o el enlace no tenga ninguna referencia a una página.</p>

                <h5>Comportamientos extraños</h5>

                <p>Algunas url no se pueden utilizar porque se utilizan para otras cosas. Las más destacables son noticias, actividades, contacto, ayuda, politica-privacidad, editor y admin pero puede haber otras.</p>

                <p>Si una url tiene comportamientos extraños quizá es una url reservada, prueba otra.</p>

                <h3 id="noticias">Noticias</h3>

                <p>Cada noticia tiene título, subtítulo, url, fecha de publicación y la imagen que se muestra en la página de inicio junto a la noticia.</p>

                <p>El subtítulo puede contener texto en negrita y enlaces como se describe en el apartado a continuación.</p>

                <p>La fecha de publicación, además de para ordenar las noticias, sirve para programar cuándo se hará publica una noticia. No confundir el estado de publicación de la parte superior derecha con la fecha de publicación: el estado define si la noticia es un borrador o está terminada y la fecha se refiere al momento en el que estará disponible para el usuario.</p>

                <h3 id="cuerpo">Párrafos, imágenes, tablas y listas</h3>

                <p>El cuerpo de las páginas y noticias está compuesto por una lista de elementos: encabezados, texto, imagenes, imágenes con texto, tablas y listas. Utilizando las flechas se puede cambiar su orden. Algunos de estos elementos tienen propiedades especiales o requieren que los datos se introduzcan de una forma concreta. Además todo el texto (incluido los subtítulos de las noticias) permite enlaces y texto en negrita utilizando secuencias especiales.</p>

                <h4>Enlaces y texto en negrita</h4>

                <p>Según el enlace sea a una página dentro de esta web o a una web externa utiliza un código diferente. El contenido entre [] es el contenido editable (quitar []). Es muy importante dejar las comillas dobles y las aperturas y cierres de llaves como están.</p>

                <ul>
                    <li>Enlaces internos: &#123;"link": "[enlace]", "texto": "[texto]"&#125;</li>
                    <li>Enlaces externos: &#123;"url": "[enlace]", "texto": "[texto]"&#125;</li>
                    <li>Texto en negrita: &#123;"boldText": "[texto]"&#125;</li>
                </ul>

                <h4>Listas</h4>

                <p>Las listas están rodeadas por corchetes []. Cada elementos está encerrado entre comillas dobles y los elementos se separan mediante comas. Ejemplo: ["Elemento 1", "Elemento 2"]</p>

                <h4>Tablas</h4>

                <p>Las tablas tienen una sintaxis más complicada. Cada fila es una lista. La cabecera solo tiene una fila y el contenido es una lista de listas.</p>

                <p>
                    &#123; <br />
                    &nbsp;"header": [ <br />
                    &nbsp;&nbsp;"Columna 1", <br />
                    &nbsp;&nbsp;"Columna 2" <br />
                    &nbsp;], <br />
                    &nbsp;"content": [ <br />
                    &nbsp;&nbsp;[ <br />
                    &nbsp;&nbsp;&nbsp;"Fila 1 Col 1", <br />
                    &nbsp;&nbsp;&nbsp;"Fila 1 Col 2" <br />
                    &nbsp;&nbsp;], <br />
                    &nbsp;&nbsp;[ <br />
                    &nbsp;&nbsp;&nbsp;"Fila 2 Col 1", <br />
                    &nbsp;&nbsp;&nbsp;"Fila 2 Col 2" <br />
                    &nbsp;&nbsp;] <br />
                    &nbsp;] <br />
                    &#125;
                </p>

                <TableSection header={["Columna 1", "Columna 2"]} rows={[[
                    "Fila 1 Col 1",
                    "Fila 1 Col 2"
                ],
                [
                    "Fila 2 Col 1",
                    "Fila 2 Col 2"
                ]]} />

                <h3 id="multimedia">Multimedia</h3>

                <p>Todo el contenido multimedia está en Media Library. Se puede organizar por carpetas y tiene filtros por tipo, nombre y fecha de modificación.</p>

                <p>Para utilizar las imágenes en las noticias y páginas hay que seleccionarlas con el cuadrado que tienen arriba a la derecha. Haciendo click sobre la imagen se muestra la información de la imagen pero no se selecciona.</p>
            </article>
        </main>
    )
}

export default HelpPage