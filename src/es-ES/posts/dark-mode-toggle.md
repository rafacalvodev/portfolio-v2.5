---
title: 'Crea una alternador/botón de modo oscuro con CSS y JavaScript'
date: 2021-05-05
description: Vamos a hacer un alternador (o botón que active/desactive) de modo oscuro usando CSS y un poco de JavaScript. Aquí se guardará la preferencia del usuario usando localStorage para que así el navegador se acuerde la próxima vez que alguien vuelva a visitar el sitio.
keywords: 'CSS, JavaScript, HTML, Dark Mode, Toggle, dark mode toggler, dark mode button, button'
banner: 'https://i.ibb.co/7QW0y5v/andre-benz-Jn-B8-Gio4-GZo-unsplash.jpg'
social: 'https://i.ibb.co/PTXgyZV/Remodeling-Part-2.png'
tags:
  - general
  - recent_es
  - blog_es
  - español
  - reciente
---

Probablemente ha escuchado o leido comentarios sobre Modo Oscuro, has usado aplicaciones y sitios web que lo usa, e incluso en el sistema operativo de tu computador or teléfono móvil lo tienes activado. Seguramente, como desarrollador te has preguntado "¿Cómo implemento esto en un proyecto?", o seguramente lo has implementado de alguna manera. Bueno, aquí haré lo posible por hacer un guía utilizando HTML, CSS, en su mayoría, y la propiedad localStorage de JavaScript.
\
\
**NOTA:** Para una guía más detallada del Modo Oscuro recomiendo leer [este artículo](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#using-a-body-class) (en inglés) de [CSS Tricks](https://css-tricks.com/)
\
\
**Aviso:** No haremos un sitio web completo, solo una simple hero section con su texto y un botón que alterna el modo oscuro en la parte superior de la sección.
\
\
Muy bien, ¡comencemos!
<br>
<br>
<br>

### Configurando el HTML

<br>
Empecemos creando la base/plantilla del HTML:

```html
<body>
  <nav class="nav">
    <p>¡Cliquea el botón! →</p>
    <button
      id="dark-mode-toggle"
      class="dark-mode-toggle"
      aria-label="Icon-only Button"
      role="button"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0 101.705-82.311 184-184 184z"
        ></path>
      </svg>
    </button>
  </nav>
  <section class="section">
    <h1>El título de va acá</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, unde
      tenetur! Error veniam tempore vel voluptatem temporibus quisquam ex iusto?
    </p>
    <div class="btn-group">
      <a href="#" class="btn btn-primary">Acción Principal</a>
      <a href="#" class="btn btn-secondary">Acción Secundaria</a>
    </div>
  </section>
</body>
```

<br>

Muy bien, esto debería ser suficiente. Ahora, resaltemos algunas cosas:

1. Primero que nada, usamos las etiquetas `<button></button>` porque, bueno, **es un botón** y su función es hacer que algo pase dentro del sitio y no nos ,amda a otro sitio web o a alguna parte dentro del mismo sitio web.
2. Por temas de accesibilidad, y porque es un botón de icono, tenemos que especificar que es un botón de icono. Por eso le pusimos `aria-label="Icon-only Button"` y `role="button"`.
3. Dado que el SVG es un elemento decorativo y no provee ningún valor semántico le agregamos el atributo `aria-hidden="true"` para que sea ignorado/omitido por cualquier tecnología de asistencia utilizada por el usuario/lector. También le ponemos el atributo `focusable="false"` para que cuando el botón esté enfocado se evite un "doble enfoque". También le agregamos `fill="currentColor"` para que de esta manera, el color del SVG sea el mismo que el del color del contenido del cuerpo.

<br>
<br>

### Añadiendo algo de estilo

<br>

Para el estilo tenemos lo siguiente:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Rubik:wght@400;600;700;800;900&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --clr-light: #ffea64;
  --clr-dark: #212121;
  --clr-accent: #e63838;

  --foreground: var(--clr-dark);
  --background: var(--clr-light);

  --ff-title: 'Rubik', sans-serif;
  --ff-body: 'Poppins', sans-serif;
}

.darkmode {
  --clr-light: #ffea64;
  --clr-dark: #212121;
  --clr-primary: #202302;
  --clr-secondary: #fdf9dc;
  --clr-accent: #e63838;

  --foreground: var(--clr-light);
  --background: var(--clr-dark);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--ff-body);
  font-size: 18px;
  line-height: 1.6;
}

h1 {
  font-size: calc(3rem + 7vw);
  font-family: var(--ff-title);
  margin: 0 0 0.25em;
  line-height: 1;
}

.container {
  padding: 0 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtitle {
  max-width: 600px;
}

.cta-buttons {
  margin: 2em 0;
  display: relative;
}

.btn {
  padding: 1em 2em;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 0.5rem;
  position: relative;
  display: inline-block;
  line-height: 1;
}

.btn + .btn {
  margin-left: 1rem;
}

.btn-secondary {
  background: var(--background);
  color: var(--foreground);
  border: currentColor solid 2px;
}

.btn-primary {
  background: var(--clr-accent);
  color: var(--foreground);
}

.btn::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border: var(--foreground) 2px solid;
  left: -4px;
  top: 4px;
  border-radius: inherit;
  z-index: -1;
}

.dark-mode-toggle {
  z-index: 100;
  color: var(--foreground);
  border: 2px solid currentColor;
  padding: 4px;
  background: transparent;
  cursor: pointer;
  border-radius: 100%;
  width: 30px;
  height: 30px;
}
```

<br>

Si está familiarizado con CSS, este es un estilo estándar para una sección de héroe con dos botones. Ahora, un par de cosas notables:

1. Usamos [Propiedades personalizadas](https://developer.mozilla.org/es/docs/Web/CSS/--*) dentro de la pseudo-clase `:root` para que puedan usarse en todo el documento y no tengamos que memorizar cosas como` # ffea64` y usar `--clr-light` que puede ser más fácil de memorizar, especialmente si el sitio crece y el CSS junto con él, haciendo que el uso de valores sea más repetitivo.
2. Añadimos la clase `.darkmode` pero no será usada directamente en el HTML ya que será agregada (y removida) utilizando JavaScript cada vez que el botón es cliqueado/presionado.

<br>
<br>

### Agregando JavaScript

<br>

Muy bien, aquí viene la parte jugosa. El código en JavaScript debería verse así:

(**NOTA:** No olvides agregar las etiquetas `<script> </script>` justo encima de la etiqueta de cierre `</body>`).

```js
let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
};

if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');

  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
```

<br>

Analicemos esto, lo quye sucede es lo siguiente:

1. Declaramos la variable `darkMode` y verificamos el almacenamiento local para ver si hay algo llamado `'darkMode'`. Usamos `let` porque la variable cambiará con el tiempo dentro del sitio. Ahora, `localStorage` es básicamente el almacenamiento local dentro del navegador de nuestra computadora que no se cargará en ningún otro lado (para cualquier problema de privacidad,` localStorage` es muy seguro ya que los datos se almacenan solamente dentro de su computadora y no en algún servidor o lugar externo).

2. Ahora, tenemos otra variable llamada `darkModeToggle` que buscará dentro de nuestro documento el elemento con la id de` dark-mode-toggle`.

3. Nuestra tercera variable se llamará `enableDarkMode` que hará lo siguiente:

   - Agrega la clase `darkmode` a todo el documento (el cuerpo). Y,
   - Actualiza el `darkMode` en el almacenamiento local habilitándolo.

4. Nuestra cuarta variable llamada `disableDarkMode` hará lo contrario de` enableDarkMode` y es:

   - Elimina la clase `darkmode` de todo el documento (el cuerpo). Y,
   - Actualiza el `darkMode` en el almacenamiento local desactivándolo.

5. Ahora, si el usuario / visitante ya visitó el sitio y habilitó el modo oscuro, se verifica si eso es cierto con una declaración `if` que verifica el estado y habilita el modo oscuro. Si no estaba habilitado, no pasará nada y el sitio se verá con el modo claro activado.

6. Ahora bien, ¿qué sucede cuando alguien hace clic en el botón? Bueno, aquí usaremos nuestra variable `darkModeToggle` y le agregaremos un event listener (detector de eventos). El evento aquí es `'click'` y cuando se activa, lo que sucederá es lo siguiente:
   - Obtendrá la configuración `darkMode` dentro del almacenamiento local.
   - Si la configuración `darkMode` no está habilitada, habilítela con una declaración` if`. Si está habilitado, apáguelo con una instrucción "else".

Y, ¡terminamos! 😎. Lo que hemos hecho aquí es lo que implementé en este sitio web y, como puedes ver, usamos una cantidad bastante corta de colores. Lo hice en mi sitio web, porque me gusta mantenerlo simple, pero puedes agregar más colores y variables o clases para ver cómo te va.
