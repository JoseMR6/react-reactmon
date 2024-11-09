# Reactmon: Game Design Document (GDD)

## Motivación

Este proyecto empezó como una forma de practicar mis habilidades de programacion y aprender/asentar conocimientos de React.

No hay entenciones de comercializar este proyecto y no me importa que otras personas lo utilicen o mejoren.


## Temática

### Concepto

La idea inicial es un juego de combates por turnos entre oponentes que cuentan con equipos de criaturas variadas en el que el gandor puede quedarse con parte del equipo del perdedor para hacerse mas fuerte.

El perdedor pierde el avance y debe empezar desde el principio, conservando solo el record de la ronda mas avanzada a la que ha llegado.

El objetivo principal es ganar todos los combates posibles para ver cuantas rondas puede aguantar e intentar establecer records cada vez mas altos.

### Generos

- Combate por turnos.
- Estrategia.
- Roguelike.
- Juego de navegador.

### Mundo

El juego no cuenta con un mapa sobre el que desplazarse mas allá de los menus que se presentan al usuario para hacer elecciones. Lo mas parecido es la pantalla del Campo de Batalla en el que combaten las criaturas donde todos los elementos son estaticos en 2D tratando de simular una perspectiva 3D.

El Campo de Batalla es solo una representacion visual de las acciones tomadas por los usuarios durante la batalla a traves del Menu de Batalla.

Los elementos principales de este Campo de Batalla son el fondo de pantalla que ayuda a ambientar el escenario, las criaturas que combaten y una pequeña representacion del suelo cuyo color depende del fondo.

### Perspectiva del Jugador

La vista del jugador durante el combate es en tercera persona viendo con una ligera perspectiva tanto a la criatura que maneja como a la criatura del enemigo. Se podría considerar primera persona si se considera que el jugador ve la accion a traves de los ojos del personaje elegido en lugar de espectar a su criatura en combate.

### Aspecto general

![imagen de batalla](./gdd_images/battle.png)

El estilo general que se ha buscado en los elementos gráficos consiste en dibujos de estilo cartoon para crear una ambientacion amigable.

La ambientación de los fondos es principalmente de ambientes naturales para dar sensacion de aventura, aunque tambien hay un fondo principal de ciudad actual. Los dibujos de los personajes que puedes elegir como avatar tambien tienen vestimentas actuales lo que refuerza la sensacion de estar en una epoca similar a la actual.

Todo esto en conjunto trata de generar un ambiente de aventura tranquila situada en el presente pero desarrollada en la naturaleza.


## Jugabilidad

### Resumen de Mecánicas

- El jugador es un actor externo al juego que toma decisiones sobre las acciones y organizacion de las criaturas de su equipo.
- En la pantalla de Elegir Avatar (la primera), el jugador elige un personaje que lo represente durante la partida, tras esto se cambia a la pantalla de Escribir Nombre.
- En la pantalla de Escribir Nombre se decide el nombre del jugador y se pulsa continuar para avanzar a la pantalla de Elegir primera criatura.
- En la pantalla de Elegir Criatura se dan tres criaturas entre las que elegir una para que el jugador la añada a su equipo, tras lo cual se avanza a la pantalla de Vista Previa de la Batalla.
- En la pantalla de Elegir Criatura el jugador puede pulsar el boton de ver para consultar las estadisticas y ataques de cada criatura.
- En la Vista Previa de la Batalla se muestra la informacion básica de los dos jugadores y sus criaturas, cada uno debe elegir una criatura con la que iniciará el combate y avanzaran a la pantalla de Campo de Batalla.
- El jugador elige la accion que realizará su criatura en cada turno de combate, tras lo cual el combate avanzará teniendo en cuenta el ataque decidido por el enemigo y las caracteristics de las criaturas y los ataques reduciendo la vida de las criaturas en consecuencia.
- El jugador puede utilizar su turno para cambiar su criatura por otra de su equipo, pero esto gastará el turno por lo que el enemigo puede realizar un ataque a la criatura nueva.
- El jugador puede decidir rendirse para terminar la partida y guardar su record actual.
- Si el jugador vence a todas las criaturas enemigas avanzará a la pantalla de Elección de Recompensas donde puede elegir entre quedarse con una criatura enemiga, quedarse con un ataque de una criatura enemiga para enseñarselo a una de sus criaturas o recibir monedas, tras lo cual se avanza a la Vista Previa de la siguiente Batalla o a la Tienda.
- Cada cierto numero de rondas aparecerá una Tienda en la que el jugador puede comprar una criatura, pagar por cambiar las criaturas disponibles y ver la información de las criaturas que puede comprar, al terminar puede pulsar el boton salir para avanzar a la Vista Previa de la siguiente Batalla.

### Habilidades Requeridas

Las habilidades mínimas que se requieren por parte del jugador, que se utilizaran o que se pondran a prueba son las siguientes.

**Habilidades Físicas:**

- Mover el ratón hacia las opciones para seleccionarlas.
- Pulsar los botones del ratón.
- Escribir.

**Habilidades Mentales:**

- Saber analizar la información de las criaturas elegibles para obtener la mas útil segun la situación.
- Planificar como componer el equipo a futuro para obtener combos de estadisticas y ataques efectivos.
- Saber que ataques buscar para enseñar a tus criaturas y cuando buscarlos.
- Saber cuando eliminar criaturas del equipo para reemplazarlas por otras.
- Saber decidir cuando elegir monedas como recompensa.
- Saber cuando comprar criaturas en la tienda.
- Saber realizar cambios de criaturas en combate efectivos para minimizar perdidas.
- Observar la representación de las criaturas enemigas para adivinar sus capacidades y contrarestarlas.
- Predecir las acciones del enemigo en combate.
- Saber elegir los ataques mas efectivos segun la situación del combate.
- Saber elegir la mejor criatura para iniciar un combate segun el equipo enemigo.

**Habilidades Sociales (Si se implementa el Multijugador):**

- Evitar comportamientos tóxicos como hacer esperar al rival a propósito.
- Evitar hacer mal uso de los nombres como escribir insultos.

### Objetivos

El objetivo principal del jugador en una ronda es derrotar a todas las criaturas del oponente, y el objetivo principal general es derrotar a todos los openentes posibles en una partida para aumentar el record de rondas alcanzadas.

Los objetivos secundarios son los que se plantee el jugador, desde conseguir un equipo ideal hasta cumplir con algun reto impuesto por si mismo.

### Retos

- Evitar que la criatura actual pierda toda su vida en combate.
- Evitar perder a todas las criaturas en combate.
- Planificar la incorporacion de criaturas.
- Planificar la incorporacion de ataques.
- Planificar la gestion de las monedas.
- Planificar con criatura iniciar el combate.
- Planificar cambios de criatura en combate.

### Recursos

**Criaturas:**

Las criaturas ademas de ser el medio por el que el jugador interactua con el oponente en combate tambien son un recurso que podemos obtener al derrotar al openente.

El valor de este recurso esta dividido entre las estadisticas de la criatura y sus ataques.

Las estadisticas determinan la mayor parte del valor de una criatura o por lo menos el valor a largo plazo. Esto se debe a que las estadisticas no pueden cambiarse por lo que si una criatura no tiene las estadisticas adecuadas para la estrategia del jugador o se quieren conseguir mejores la única solucion es reemplazar la criatura por otra con las estadisticas deseadas.

**Ataques:**

Forman parte de las criaturas y determinan parte de su valor. Esto se debe a que tener una criatura con buenas estadisticas pero sin ataques utilizables puede considerarse una inversion de futuro, pero si no se cuentan con otras criaturas que puedan mantener el combate el jugador esta condenado a perder la ronda.

Ademas los ataques tambien son un recurso porque pueden obtenerse para cambiar la configuracion de ataques de las criaturas del jugador. Esto permite configurar estrategias con libertad.

**Monedas:**

Este es un recurso extra que sirve para obtener los dos anteriores en las Tiendas. Se comienza el juego con suficientes para comprar una criatura.

### Modos de Juego

- Modo Empezar: Es la etapa inicial del juego donde el jugador determina los datos básicos del personaje y escoge la primera criatura para su equipo.
- Modo Informacion: Es la pantalla que muestra las estadisticas y ataques de la criatura.
- Modo Batalla: Es el desarrollo del combate, en donde los jugadores atacaran e intercambiaran criaturas segun la situacion.
- Modo Ganar: Se desencadena al derrotar a todas las criaturas del oponente, se elige entre varias recompensas para fortalecerse para la siguiente batalla.
- Modo Nuevo Objeto: Pantalla en la que tras obtener un nuevo elemento para añadir al equipo (criatura o ataque) se decidira por que otros elementos sustituirlo.
- Modo Perder: Tras perder a todas las criaturas en combate se muestra el resumen final del estado del jugador y suscriaturas, solo queda iniciar otra partida.
- Modo Comprar: Pantalla extra que aparecera cada varias rondas donde se podrán obtener criaturas y ataques con mas informacion disponible a cambio de monedas.
- Modo Ayuda: Pantalla accesible en cualquier momento para consultar informacion relevante sobre el juego.

### Acciones

**Simpre Disponibles**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Reiniciar Juego** | Volver al inicio del juego | - Se vuelven a inicializar las variables internas y se cambia a la pantalla de Seleccion de Avatar |
| | **Ver Ayuda** | Mostrar informacion relevante del juego a modo de guía | - Cambia a la pantalla de Ayuda |
| - El nuevo Idioma no es el actual | **Cambiar Idioma** | Cambiar el idioma de los textos del juego | - Establece el idioma elegido como el actual |

**Modo Empezar**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Elegir Avatar** | Seleccionar uno de los aspectos de personaje disponibles para el jugador mostrados en pantalla | - Se guarda el personaje como avatar del jugador |
| - Tiene al menos 3 letras <br/> - Tiene 13 letras maximo <br/> - No tiene solo espacios en blanco | **Escribir Nombre** | Escribir el nombre que utiliza el juego para referirse al jugador en la entra de texto disponible | - Se muestra el nombre escrito por el jugador |
| - Hay un nombre válido | **Confirmar Nombre** | Al hacer click en continuar se guarda el nombre | - Guardar nombre y avanzar a la Eleccion de Criatura si es válido <br/> - Seguir en la pantalla actual si no es válido |
| | **Elegir Criatura** | Seleccionar una criatura y empezar el combate | - Añadir la criatura indicada al equipo del jugador y Avanzar al modo de Batalla |
| | **Ver Informacion de Criatura** | Abre la pantalla de Informacion de la criatura | - Cambia a la pantalla de Información de la criatura |

**Modo Informacion**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Ver Estadisticas** | Mostrar la informacion de las estadisticas de la criatura seleccionada | - Mostrar los valores numericos de las estadisticas de la criatura |
| | **Ver Ataque** | Mostrar la informacion del ataque seleccionado de la criatura | - Mostrar todos los datos relacionados con el ataque seleccionado |
| | **Volver** | Regresar a la pantalla anterior | - Regresar a la pantalla donde se muestra la criatura que se seleccionó |

**Modo Batalla**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Estar en la Vista Previa de la Batalla <br/> - La criatura seleccionada no debe estar debilitada | **Elegir Primera Criatura** | Decidir cual de las criaturas del equipo iniciará el combate | - Avanza a la pantalla de Batalla y la criatura que en combate es la elegida |
| - No estar en el menu de Mensajes de Batalla | **Luchar** | Ver los ataques para elegir realizar uno | - Muestra los ataques de la criatura en combate |
| - No estar en el menu de Mensajes de Batalla | **Elegir Ataque** | Seleccionar un ataque de la criatura para ejecutarlo en el combate | - El ataque seleccionado se guarda como la accion que se realizará en combate y se avanza al menu de Mensajes de Batalla donde se describirá el curso del combate mediante texto |
| - No estar en el menu de Mensajes de Batalla | **Cambiar** | Ver las criaturas del equipo para poder cambiar la actual | - Cambia a la pantalla Mochila en la que se muestran todas las criaturas del equipo |
| - No estar en el menu de Mensajes de Batalla <br/> - La criatura seleccionada no debe estar debilitada | **Elegir Criatura** | Seleccionar una criatura del equipo para cambiarla por la actual | - La criatura elegida sale al combate intercambiandose por la que había y se avanza al menu de Mensajes de Batalla donde se describirá el curso del combate mediante texto |
| - No estar en el menu de Mensajes de Batalla | **Ver Informacion de Criatura** | Mostrar la información de una criatura concreta del equipo | - Cambia a la pantalla de Información de la criatura |
| - No estar en el menu de Mensajes de Batalla | **Volver** | Volver al menu general de Luchar o Cambiar | - Cambia al menu general de batalla con las opciones de Luchar y Cambiar |
| - Estar en el menu de Mensajes de Batalla | **Siguiente Mensaje de Batalla** | Ver el siguiente mensaje que describe el avance del combate | - Se ejecuta la siguiente accion del combate y se muestra el texto que la describe |
| - No estar en el menu de Mensajes de Batalla | **Rendirse** | Terminar el juego e ir al resumen final | - Se avanza a la pantalla de Perder |

**Modo Ganar**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Ir a Eleccion de Criatura Enemiga** | Elegir Añadir una criatura enemiga al equipo | - Cambia a la pantalla de Eleccion de criatura |
| | **Elegir Criatura Enemiga** | Añadir criatura seleccionada al equipo | - Añade la criatura al equipo y avanza a la siguiente Batalla o a la Tienda <br/> - Si no hay espacio la guarda como criatura a añadir y avanza a la pantalla de Nueva Criatura |
| | **Ver Informacion de Criatura** | Mostrar la informacion de la criatura seleccionada | - Cambia a la pantalla de Información de la criatura |
| | **Ir a Eleccion de Ataque Enemigo** | Elegir Añadir un ataque de una criatura enemiga a una criatura del equipo | - Cambia a la pantalla de Eleccion de Ataque |
| | **Elegir Ataque Enemigo** | Añadir ataque seleccionado a una criatura del equipo | - Guarda el ataque como ataque a añadir y avanza a la pantalla de Nuevo Ataque |
| | **Ver Descripcion de Ataque** | Mostrar la descripción del ataque seleccionado | - Hace visible la descripcion del Ataque |
| | **Conseguir Monedas** | Elegir aumentar las monedas para la tienda | - Aumenta monedas y avanza a la siguiente Batalla o a la Tienda |

**Modo Nuevo Objeto**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Nueva criatura | **Eliminar Criatura** | Descarta la criatura elegida para añadir la nueva | - Elimina la criatura del equipo y añade la nueva si no era la seleccionada, avanza a la siguiente Batalla o a la Tienda |
| | **Ver Informacion de Criatura** | Mostrar la informacion de la criatura seleccionada | - Cambia a la pantalla de Información de la criatura, si el nuevo objeto es un Ataque Muestra la opcion Enseñar u Olvidar |
| - Nuevo Ataque | **Enseñar Ataque** | Añadir ataque a la criatura seleccionada | - Añade el ataque nuevo a la criatura seleccionada y avanza a la siguiente Batalla o a la Tienda |
| - Nuevo Ataque | **Olvidar Ataque** | Eliminar ataque seleccionado para añadir el nuevo | - Elimina el ataque seleccionado para cambiarlo por el ataque nuevo y avanza a la siguiente Batalla o a la Tienda |
| - Nuevo Ataque | **Ver Descripcion de Ataque** | Mostrar la descripción del ataque que se quiere añadir | - Hace visible la descripcion del Ataque que se quiere añadir |

**Modo Perder**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Reiniciar Juego** | Volver al inicio del juego | - Se vuelven a inicializar las variables internas y se cambia a la pantalla de Seleccion de Avatar |

**Modo Comprar**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Tener Suficientes Monedas | **Comprar** | Gastar Monedas para obtener una criatura | - Cambia a la pantalla de Información de la criatura con las opciones de Añadir Criatura y Extraer Ataque |
| - Haber Comprado una Criatura | **Añadir Criatura** | Añadir la criatura comprada al equipo | - Cambia a la pantalla de Nueva Criatura con la criatura seleccionada |
| - Haber Comprado una Criatura | **Extraer Ataque** | Añadir el ataque seleccionado de la criatura comprada a una criatura del equipo | - Cambia a la pantalla de Nuevo Ataque con el ataque seleccionado |
| | **Ver Informacion de Criatura** |  Mostrar la informacion de la criatura seleccionada | - Cambia a la pantalla de Información de la criatura |
| - Tener Suficientes Monedas | **Actualizar Tienda** | Gastar monedas para cambiar las criaturas disponibles | - Genera nuevas criaturas disponibles en la Tienda |
| | **Ver Criaturas para Vender** | Ver el equipo del Jugador | - Cambiar a la pantalla de la Mochila con la opcion de Vender Criatura incluida |
| - No haber vendido ninguna criatura en esta tienda todavia | **Vender Criatura** | Eliminar una criatura del equipo para obtener Monedas | - Elimina una criatura del equipo y aumenta las monedas |
| | **Salir** | Avanzar a la siguiente Batalla | - Avanzar a la siguiente Batalla |

**Modo Ayuda**

| Limitaciones | Acciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Volver** | Volver a la pantalla anterior | - Cambia a la pantalla anterior |

### Interacciones

**Interacciones del Inicio**

| Limitaciones | Interacciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Hay Informacion local guardada | **Cargar Informacion del Jugador** | Iniciar los datos del jugador con informacion guardada de anteriores partidas | - Se inicializa el nombre, el Avatar y el record del jugador con la informacion almacenada en el cliente |

**Interacciones de las Criaturas**
| Limitaciones | Interacciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Estar en la Eleccion de Primera Criatura <br> - Estar en la Vista Previa de La Batalla <br> - Estar en la Tienda | **Generar Criatura** | Crear una nueva criatura de forma aleatoria | - Se genera una nueva criatura para ser utilizada en la pantalla correspondiente  |
| - Estar en Batalla <br/> - Perder todos los puntos de vida | **Debilitarse** | La criatura queda fuera de combate | - Disminuyen las criaturas disponibles del jugador |
| - Estar en Batalla <br/> - Jugador a seleccionado un ataque | **Realizar Ataque** | La criatura ejecuta un ataque indicado por el jugador | - Reduccion de vida de la criatura enemiga si es ataque Físico o Especial <br/> - Mejora de Estadisticas si es Ataque de Apoyo de Mejora <br/> - Regeneracion de vida si es Ataque de Apoyo de Curación |

**Interacciones de los Jugadores**
| Limitaciones | Interacciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| - Estar en la Vista Previa de la Batalla <br/> - No es Batalla Multijugador | **Generar Rival** | Generar un Rival NPC para la Batalla de forma aleatoria | - Generar Nombre, Avatar, Record y Criaturas |
| - Estar En Batalla <br/> - Rival NPC | **Generar accion de ataque aleatorio** | El Rival elige un ataque aleatorio | - Se genera un indice aleatorio de la lista de ataques de la criatura actual del Rival |
| - Estar en Batalla <br/> - Criatura del Jugdor o Rival debilitada <br/> - Quedan ciraturas disponibles | **Cambio Forzado** | Cambiar la criatura por otra debido a debilitamiento | - Ir a la mochila para elegir nueva criatura <br/> Si NPC se elige automaticamente una criatura aleatorio de entre las disponibles |
| - Estar en Batalla <br/> - No quedan criaturas al Rival | **Ganar** | Ir a la Seleccion de Recompensas | - Avanzar a la pantalla de Ganar |
| - Estar en Batalla <br/> - No quedan criaturas al Jugador | **Perder** | Terminar el juego e ir al resumen final | - Se avanza a la pantalla de Perder |

**Interacciones del Fin**

| Limitaciones | Interacciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Guardar Informacion del Jugador** | Almacenar informacion del jugador en el cliente | - Guardar nombre, Avatar y record en el cliente |

### Reglas


## Elementos Gráficos

### Interfaz de Usuario (UI / HUD)

### Iconos

### Aspectos de Jugadores

### Criaturas

### Fondos de Pantalla


## Detalles de Implementación

### Tecnologías Utilizadas

### Preparación del Entorno de Desarroyo

### Entidades y Atributos

### Estados

### Despliegue

### Tests


## Posibles Futuras Mejoras

- Añadir Animaciones.
- Añadir Sonidos.
- Añadir Multijugador.


## Referencias

- Iconos de Menús y Categorías de [SVG-Repo](https://www.svgrepo.com/).
- Iconos de Tipos Elementales de [duiker101](https://github.com/duiker101/pokemon-type-svg-icons).
- Aspectos de Personaje de [Pokémon-Showdown](https://play.pokemonshowdown.com/sprites/trainers/).
- Imagenes de Criaturas de [jnovack](https://github.com/jnovack/pokemon-svg/tree/master).
- Fondos de Pantalla de [FREEPIK](https://www.freepik.es/).
