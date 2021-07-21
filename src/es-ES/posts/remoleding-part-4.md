---
title: 'Remodelando my sitio web - Parte 4: Estilismo'
date: 2021-04-18
description: 'Esta es la parte donde me divertí más. Y tengo que decirlo: Me gusta escribir CSS.'
banner: 'https://i.ibb.co/Mfd1pBP/luis-alfonso-orellana-Wj-IB-6-Ux-A5-Q-unsplash.jpg'
social: 'https://i.ibb.co/bb7Sxbn/Remodeling-Part-4.png'
tags:
  - general
  - recent_es
  - CSS
  - blog_es
  - español
  - reciente
---

Esta es la parte donde me divertí más. Y tengo que decirlo: Me gusta escribir CSS. Claro, no he llegado al nivel en el que puedo hacer ilustraciones en CSS, como las que hace [Jhey Tompkins](https://twitter.com/jh3yy). Pero, sin embargo, disfruto mucho trabajar con CSS (y Sass).
\
\
Una vez más, cuando estaba explorando ideas sobre cómo darle estilo al sitio, tenía, nuevamente, mi buena parte de opciones. Exploré los "chicos geniales" de los frameworks CSS como Tailwind y Bootstrap (cuya última versión me tiene emocionado), o Bulma y Materialize. Pero al final me decidí por La Vieja Confiable: CSS/Sass.
\
\
¿Por qué? Nuevamente, libertad y familiaridad (aunque si es por familiaridad, iría con Bootstrap 😂). Me siento más cómodo escribiendo CSS/Sass puro que usando cualquier framework (por supuesto, los seguiré usando), e incluso después de un tiempo, uno "desarrolla un ojo" para ver casi inmediatamente cuando se ha usado un framework, como el radio del borde de algunos botones o cómo se ven algunas barras de navegación, incluso la paleta de colores de algunos sitios te hace decir: "Ah, esto se hizo con Bootstrap". Pero al final, es una preferencia personal y decidí ir así.
\
\
Para la estructura de la carpeta de Sass decidí inspirarme en [Sass Guidelines - Ejemplo de Arquitectura](https://sass-guidelin.es/es/#arquitectura), solo que para este proyecto le dí un toque más personal y adecuado para lo que quería.
\
\
Para la parte modular de Sass, me acordé del [video](https://www.youtube.com/watch?v=CR-a8upNjJ0) de Kevin Powell en el que habla que hay que dejar de usar `@import` y agarrar el hábito/costumbre de usar`@use` y `@forward`, y empecé a aplicar lo que dijo para este sitio. También estoy usando varios mixins para la parte responsiva. Por supuesto, estoy enfocándome en hacer que este sitio sea lo más accesible posible siguiendo las guías publicadas [aquí](https://a11y-style-guide.com/style-guide/) y [acá](https://www.a11yproject.com/).
\
\
Basicamente estoy usando este sitio como un patio de recreo en donde pruebo un montón de cosas. De hecho, en el portafolio tengo una sección llamada 'Patio de Recreo' donde voy a estar montando varios proyectos que hago por práctica o diversión.
