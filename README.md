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

### Modos de Juego (GameStates)

- Modo Empezar (START): Es la etapa inicial del juego donde el jugador determina los datos básicos del personaje y escoge la primera criatura para su equipo.
- Modo Informacion: Es la pantalla que muestra las estadisticas y ataques de la criatura.
- Modo Batalla (BATTLE): Es el desarrollo del combate, en donde los jugadores atacaran e intercambiaran criaturas segun la situacion.
- Modo Ganar (WIN): Se desencadena al derrotar a todas las criaturas del oponente, se elige entre varias recompensas para fortalecerse para la siguiente batalla.
- Modo Nuevo Objeto (NEW_ITEM): Pantalla en la que tras obtener un nuevo elemento para añadir al equipo (criatura o ataque) se decidira por que otros elementos sustituirlo.
- Modo Perder (LOSE): Tras perder a todas las criaturas en combate se muestra el resumen final del estado del jugador y suscriaturas, solo queda iniciar otra partida.
- Modo Comprar (SHOPPING): Pantalla extra que aparecera cada varias rondas donde se podrán obtener criaturas y ataques con mas informacion disponible a cambio de monedas.
- Modo Ayuda: Pantalla accesible en cualquier momento para consultar informacion relevante sobre el juego.

### Acciones

**Siempre Disponibles**

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
| - Estar en la Vista Previa de la Batalla | **Curar Criaturas** | Regenerar la vida de todas las Criaturas antes de la Batalla | - La vida actual de las Criaturas es su Vida Máxima |
| - Estar En Batalla <br/> - Rival NPC | **Generar accion de ataque aleatorio** | El Rival elige un ataque aleatorio | - Se genera un indice aleatorio de la lista de ataques de la criatura actual del Rival |
| - Estar en Batalla <br/> - Criatura del Jugdor o Rival debilitada <br/> - Quedan ciraturas disponibles | **Cambio Forzado** | Cambiar la criatura por otra debido a debilitamiento | - Ir a la mochila para elegir nueva criatura <br/> Si NPC se elige automaticamente una criatura aleatorio de entre las disponibles |
| - Estar en Batalla <br/> - No quedan criaturas al Rival | **Ganar** | Ir a la Seleccion de Recompensas | - Avanzar a la pantalla de Ganar |
| - Estar en Batalla <br/> - No quedan criaturas al Jugador | **Perder** | Terminar el juego e ir al resumen final | - Se avanza a la pantalla de Perder |

**Interacciones del Fin**

| Limitaciones | Interacciones | Descripción | Resultados |
| :--- | :---: | :--- | :--- |
| | **Guardar Informacion del Jugador** | Almacenar informacion del jugador en el cliente | - Guardar nombre, Avatar y record en el cliente |

### Reglas

**Relacionadas a Acciones**

Modo Ganar:

| Objetivo | Regla |
| :--- | :--- |
| Ir a Eleccion de Criatura Enemiga | Si el Rival derrotado era un Jefe, entonces las Criaturas disponibles seran 3 criaturas aleatorias de las 6 que tenía |
| Ir a Eleccion de Ataque Enemigo | Si el Rival derrotado era un Jefe, entonces los Ataques disponibles seran de 3 criaturas aleatorias de las 6 que tenía |
| Conseguir Monedas | Si el Rival derrotado era un Jefe, entonces se recibirá una cantidad mayor de Monedas |

Modo Nuevo Objeto:

| Objetivo | Regla |
| :--- | :--- |
| Enseñar Ataque | Si el ataque es Neutro, del mismo Tipo Elemental que la Criatura o del Tipo Elemental contra el que la Criatura es debil, entonces puede ser aprendido por la Criatura |
| Olvidar Ataque | Si al olvidar el ataque seleccionado y aprender el nuevo la Criatura no se queda sin ataques que Inflijan daño al enemigo, entonces puede Olvidar el Ataque seleccionado |
| Avanzar Siguiente Batalla (accion secundaria de varios botones) | Si la ultima ronda terminada es multiplo de 10, entonces se avanza a la Tienda antes de la Siguiente Batalla |

**Relacionadas a Interacciones**

Interacciones de las Criaturas:

| Objetivo | Regla |
| :--- | :--- |
| Generar Criatura | Se reparten 280 puntos totales entre las Estadisticas, siendo 100 el valor máximo de una sola estadistica y 30 el valor mínimo que puede tener la Vida Máxima |
| Generar Criatura | Se escoge el Tipo Elemental de forma aleatoria entre los 3 principales, excluyendo al Neutro |
| Generar Criatura | La Criatura tiene al menos un ataque que inflinja daño al enemigo |
| Generar Criatura | Si la criatura destaca en alguna estadistica concreta, entonces las imagenes de criaturas posibles que se le pueden asignar son aquellas relacionadas con dicha estadistica |
| Generar Criatura | Segun el Tipo Elemental de la criatura se establecerá su patron de colores principal |
| Generar Criatura | Dependiendo los valores de las estadisticas relacionadas con el tipo de la criatura se establecera el tono (mas claro u oscuro) de los colores de la criatura, un tono mas oscuro indica que una de estas estadistica destaca por ser muy baja mientras que un tono mas claro indica que una de estas estadisticas destaca por ser mas alto |
| Generar Criatura | Si la pantalla es la Eleccion de primera Criatura, entonces las criaturas generadas solo tienen un ataque, tienen una estadistica al máximo asegurada y se genera una de cada Tipo Elemental |
| Generar Criatura | La criatura del primer rival es debil contra el Tipo Elemental de la primera Criatura del Jugador |
| Realizar Ataque | Si el ataque es de Categoría Física, entonces la potencia aumenta en funcion del Ataque Físico de la Criatura que lo realiza y se reduce en funcion de la Defensa Física de la Criatura que lo recibe |
| Realizar Ataque | Si el ataque es de Categoría Especial, entonces la potencia aumenta en funcion del Ataque Especial de la Criatura que lo realiza y se reduce en funcion de la Defensa especial de la Criatura que lo recibe |
| Realizar Ataque | Si el ataque es de Categoría Apoyo y es de Mejora de Estadistica, entonces se aplica una mejora acumulable hasta 5 veces en la estadistica a la que se aplica el ataque de la Criatura que lo realiza |
| Realizar Ataque | Si el ataque es de Categoría Apoyo y es de Curacion, entonces la Criatura que realiza el ataque regenera una cantidad fija de puntos de vida |
| Realizar Ataque | Si el ataque realizado es del mismo Tipo Elemental que la criatura que lo realiza, entonces la potencia del ataque aumenta, tambien se aplica a ataques de apoyo |
| Realizar Ataque | Si el ataque realizado es de un Tipo Elemental fuerte contra el Tipo Elemental de la Criatura que lo recibe, entonces la potencia aumenta |
| Realizar Ataque | Si el ataque realizado es de un Tipo Elemental debil contra el Tipo Elemental de la Criatura que lo recibe, entonces la potencia se reduce |

Interacciones de los Jugadores:

| Objetivo | Regla Operativa |
| :--- | :--- |
| Generar Rival | El primer Rival tiene una sola Criatura |
| Generar Rival | El numero de Criaturas del Rival aumenta con cada ronda hasta llegar al máximo, una vez alcanzado el maximo de criaturas se aumenta el numero de ataques totales conocidos por sus criaturas hasta llegar al maximo |
| Generar Rival | Si la ronda no es multiplo de 10, entonces se genera un rival con 3 Criaturas máximo |
| Generar Rival | Si la ronda es multiplo de 10 y mayor o igual que 20, entonces se genera un rival con 6 Criaturas máximo, esto se considera un Jefe |
| Generar Rival | Los jefes tienen una criatura con una estadistica con valor máximo asegurada y otra Criatura con 2 estaditicas con valor máximo aseguradas |
| Curar Criaturas | Si la ronda es mayor que 20, entonces las criaturas solo se curan antes y despues de un Jefe |

### Relacion de Tipos Elementales

Fuego > Planta > Agua > Fuego

Neutro no es fuerte ni debil contra ningun otro Tipo Elemental.

### Cálculo de daño de Ataques Físicos y Especiales

`Damage = (A * T * E * P * Ax) / Dx`

- Ajuste (A = 0.15): Ajuste de balanceo para equilibrar ataque y defensa.
- Tipo (T = 1.5): Aumento por Ataque del mismo Tipo Elemental que la Criatura que lo realiza.
- Efectividad (E):
  - Alta (E = 2): Criatura debil contra Ataque recibido.
  - Baja (E = 0.5): Criatura fuerte contra Ataque recibido.
- Potencia Base (P = 100): Todos los atques que inflinjen daño tienen la misma potencia base.
- Ataque (Ax): Ataque Especial o Ataque Físico de la Criatura, dependiendo de la Categoría del Ataque.
- Defensa (Dx): Defensa Especial o Defensa Físico de la Criatura, dependiendo de la Categoría del Ataque.

### Estadisticas de las Criaturas (CreatureStats)

- Vida Máxima: Cantidad máxima de puntos de vida que puede tener la criatura completamente curada.
- Velocidad: Establece que criatura ataca primero durante el combate.
- Ataque Físico: Determina la potencia de los ataques Físicos.
- Ataque Especial: Determina la potencia de los ataques Especiales.
- Defensa Física: Determina la reducción de daño de los ataques Físicos recibidos.
- Defensa Especial: Determina la reducción de daño de los ataques Especiales recibidos.

Cada tipo Elemental tiene dos estadísticas relacionadas:

- Planta: Vida Máxima y Velocidad.
- Fuego: Ataque Físico y Ataque Especial.
- Agua: Defensa Física y Defensa Especial.

### Lista de Ataques (AttackList)

| Identificador | Nombre | Categoría | Tipo | Descripcion |
| :--- | :--- | :--- | :--- | :--- |
| FireFist | Puño Fuego | Físico | Fuego | El enemigo recibe un puñetazo envuelto en llamas. |
| Flamethrower | Lanzallamas | Especial | Fuego | El enemigo es abrasado por una intensa explosión de fuego. |
| ThermalSharpening | Afilado Térmico | Apoyo | Fuego | Aumenta el daño físico puliendo sus garras con calor. |
| Ignition | Ignición | Apoyo | Fuego | Aumenta el daño especial aumentando su energía elemental. |
| FluidSlash | Cuchillada Fluida | Físico | Agua | El enemigo recibe una cuchillada lubricada con agua. |
| WaterCanon | Hidrocañón | Especial | Agua | El enemigo recibe un potente chorro de agua a presión. |
| FrozenShield | Blindaje Helado | Apoyo | Agua | Aumenta su defensa física rodeando su cuerpo con hielo. |
| AquaticAura | Aura acuática | Apoyo | Agua | Aumenta su defensa especial manipulando el agua a su alrededor. |
| ImpalingSpike | Espina Empaladora | Físico | Planta | El enemigo es impactado por una espina grande y afilada. |
| AcidBomb | Bomba Ácida | Especial | Planta | El enemigo recibe una explosión química corrosiva. |
| Doping | Autoestimulante | Apoyo | Planta | Aumenta su velocidad generando sustancias estimulantes dentro de su cuerpo. |
| Absorption | Absorber Nutrientes | Apoyo | Planta | Regenera parte de su vida absorbiendo nutrientes del terreno. |
| Headbutt | Cabezazo | Físico | Neutro | El enemigo recibe un cabezazo a gran velocidad. |
| AuraRay | Rayo de Aura | Especial | Neutro | El enemigo recibe un rayo generado a partir de pura energía. |


## Elementos Gráficos

### Interfaz de Usuario (UI / HUD)

**Elegir Avatar**

![imagen de Elegir Avatar](./UI_design/SelectSkin.png)

1. Icono del juego: Icono del juego y enlace al proyecto en GitHub.
2. Boton de Ayuda: Al pulsar este botón se accede a la pantalla de Ayuda.
3. Boton de Reinicio: Al pulsar este boton se empieza el juego desde el principio, la pantalla de Elegir Avatar.
4. Boton de Idioma Inglés: Al pulsar este boton se cambia el idioma a Ingles y se sustituye el boton por Idioma Español.
5. Avatar Seleccionado: Aspecto de personaje marcado por defecto, al pulsar en él se guarda como aspecto del jugador y avanza a la pantalla de Escribir nombre.
6. Avatar no Seleccionado: Aspectos de personaje no seleccionados por defencto. Mismo efecto al pulsar que el Seleccionado.
7. Record: Ronda máxima registrada a la que ha llegado el jugador en partidas anteriores.
8. Ronda: Ronda actual en la que se encuentra el juego.
9. Monedas: Cantidad de monedas disponibles para gastar en la Tienda.

**Escribir Nombre**

![imagen de Escribir Nombre](./UI_design/WriteName.png)

10. Avatar del Jugador: Imagen que representa al jugador en el juego.
11. Indroducir Nombre: Cuadro de texto preparado para introducir el nombre del jugador.
12. Boton de Continuar: Al pulsar se guarda el nombre del jugador y avanza a la pantalla de Elegir primera Criatura.

**Elegir Criatura**

![imagen de Elegir Criatura](./UI_design/ChooseCreature.png)

13. Contenedor de Criatura: Engloba todas las opciones e informacion de una criatura.
14. Imagen de Criatura: Imagen que representa a la criatura.
15. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.
16. Boton de Elegir: Al pulsar añade la criatura al equipo del jugador y avanza a la siguiente pantalla, si el equipo esta completo avanza a la pantalla de Mochila con la criatura elegida como Nueva Criatura.
17. Boton de Ver: Al pulsar muestra la pantalla de Informacion de la criatura.

**Informacion de Criatura (Estadisticas)**

![imagen de Informacion de Estadisticas de Criatura](./UI_design/InfoStats.png)

18. Imagen de Criatura: Imagen que representa a la criatura.
19. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.
20. Barra de Vida: Representacion visual de la vida restante.
21. Valor de Vida: Representación numerica de la vida restante.
22. Boton de Estadisticas: Al pulsar muestra la Informacion de las Estadisticas de la criatura.
23. Boton de Volver: Al pulsar Vuelve a la pantalla anterior.
24. Nombre de Estadistica: Nombre de estadistica de la criatura.
25. Valor de Estadistica: Valor de la estadistica en esta criatura.
26. Maximo Valor Posible: Valor maximo posible de estadistica para comparacion.
27. Boton de Info de Ataque: Al pulsar Muestra la Información del Ataque seleccionado.
28. Nombre de Ataque: Nombre del Ataque de la criatura.
29. Categoria de Ataque: Icono que indica la Categoria del Ataque.
30. Tipo Elemental de Ataque: Icono que indica el tipo Elemental del Ataque.

**Informacion de Criatura (Ataque Seleccionado)**

![imagen de Informacion de Ataque de Criatura](./UI_design/InfoAttack.png)

31. Nombre de Ataque: Nombre del Ataque de la criatura.
32. Tipo Elemental de Ataque: Icono que indica el tipo Elemental del Ataque.
33. Categoría de Ataque: Icono que indica la Categoría del Ataque.
34. Descripcion de Categoría: Explicacion de como funcionan los ataques que pertenecen a esta Categoría.
35. Descripcion de Ataque: Breve descripcion de como funciona el Ataque seleccionado.


**Informacion de Criatura (Tipos Elementales)**

![imagen de Informacion de Tipos Elementales](./UI_design/InfoTypes.png)

Pantalla descartada como parte de Informacion de Criatura, en su lugar se ha añadido esta informacion a la pantalla de Ayuda. La pantalla de Ayuda contaría solo con el contenedor de la información y el Boton de Volver.

**Batalla (Vista Previa)**

![imagen de la Vista Previa de la Batalla](./UI_design/BattlePreview.png)

36. Información del Jugador: Contenedor con todos los datos del jugador principal y la lista de sus criaturas.
37. Avatar del Jugador: Imagen que representa al jugador en el juego.
38. Nombre del Jugador: Nombre guardado por el que se hace referencia al jugador dentro del juego.
39. Record del Jugador: Máxima ronda a la que ha llegado el Jugador en partidas anteriores.
40. Selecion de Criatura: Botones que muestran las criaturas del equipo del jugador, al pulsar se inicia la batalla con esa criatura como inicial.
41. Imagen de Criatura: Imagen que representa a la criatura.
42. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.
43. Información del Rival: Contenedor con todos los datos del Rival y la lista de sus criaturas.

**Batalla (Menu General)**

![imagen del Menu General de la Batalla](./UI_design/BattleGeneralMenu.png)

44. Imagen de Criatura del Jugador: Imagen que representa a la criatura actual en Batalla del Jugador principal.
45. Tipo Elemental: Icono que indica el tipo Elemental de la criatura actual del jugador principal.
46. Barra de Vida: Representacion visual de la vida restante de la criatura del jugador principal.
47. Valor de Vida: Valor numerico de la vida restante de la criatura del jugador principal.
48. Terreno: Representacion básica del terreno de combate.
49. Barra de Vida de Rival: Representacion visual de la vida restante de la criatura del Rival.
50. Tipo Elemental del Rival:  Icono que indica el tipo Elemental de la criatura actual del Rival.
51. Imagen de Criatura del Rival: Imagen que representa a la criatura actual en Batalla del Rival.
52. Boton de Luchar: Al pulsar se cambia al menu de Seleccion de Ataques.
53. Boton de Cambiar: Al pulsar se cambia a la pantalla de Mochila para seleccionar una criatura del equipo.
54. Boton de Rendirse. Al pulsar se termina el juego y se avanza a la pantalla de Perder.

**Batalla (Menu de Ataques)**

![imagen del Menu de Seleccion de Ataques de la Batalla](./UI_design/BattleAttacksMenu.png)

55. Boton de Ataque: Al pulsar se inicia el desarrollo del combate con ese ataque como accion del jugador.
56. Nombre de Ataque: Nombre del Ataque de la criatura.
57. Categoría de Ataque: Icono que indica la Categoría del Ataque.
58. Tipo Elemental de Ataque: Icono que indica el tipo Elemental del Ataque.
59. Boton de Volver: Al pulsar vuelve al Menu General de Batalla.

**Batalla (Mensaje de Ataque)**

![imagen del Mensaje de Ataque en la Batalla](./UI_design/BattleMessageAttack.png)

60. Animacion de Ataque: Representacion gráfica de la ejecucion del ataque.
61. Mensaje actual: Descripcion de la ultima accion que se ha ejecutado.
62. Boton de Continuar: Ejecutar la siguiente accion de la Batalla.

**Batalla (Mochila)**

![imagen de Mochila durante la Batalla](./UI_design/BattleBackpack.png)

63. Criatura del equipo: Contenedor con informacion básica y los botones correspondientes a una de las criaturas del equipo del jugador.
64. Imagen de Criatura: Imagen que representa a la criatura.
65. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.
66. Barra de Vida: Representacion visual de la vida restante.
67. Boton de Elegir: Al pulsar se saca la criatura al combate intercambiandola por la que estaba.
68. Boton de Ver: Al pulsar muestra la pantalla de Informacion de la criatura.
69. Boton de Volver: Al pulsar vuelve al Menu General de Batalla.

**Batalla (Mensaje de Cambio)**

![imagen del Mensaje de Cambio en la Batalla](./UI_design/BattleMessageChange.png)

**Ganar (Elegir Recompensa)**

![imagen de Eleccion de Recompensas al Ganar](./UI_design/WinChooseReward.png)

70. Boton de Elegir Criatura: Al pulsar avanza a la pantalla de Eleccion de Criaturas con criaturas del Rival derrotado.
71. Boton de Elegir Ataque: Al pulsar avanza a la pantalla de Eleccion de Ataque con ataques de las criaturas del Rival derrotado.
72. Boton de Elegir Monedas: Al pulsar aumentan las Monedas del jugador y avanza a la siguiente Batalla.

**Ganar (Mochila Nueva Criatura)**

![imagen de Mochila añadiendo Nueva Criatura al Ganar](./UI_design/WinBackpackCreature.png)

73. Nueva Criatura: Criatura del oponente que el jugador quiere añadir al equipo.
74. Boton de Descartar: Al pulsar se descarta la criatura nueva y se avanza a la siguiente Batalla.
75. Boton de Eliminar: Al pulsar se elimina la criatura seleccionada del equipo para añadir la criatura nueva del Rival.

**Ganar (Elegir Ataque)**

![imagen de Eleccion de Ataques del Rival al Ganar](./UI_design/WinChooseAttack.png)

76. Ataque del Rival: Contenedor con informacion básica y botones de uno de los ataques de las criaturas del Rival.
77. Nombre de Ataque: Nombre del Ataque de la criatura del Rival.
78. Tipo Elemental de Ataque: Icono que indica el tipo Elemental del Ataque del Rival.
79. Boton de Elegir: Al pulsar se avanza a la Mochila con el ataque elegido como Nuevo Ataque.
80. Boton de Ver: Al pulsar se muestra la descripcion del ataque en un cuadro de texto flotante que normalmente esta oculto.

**Ganar (Informacion de Ataque)**

![imagen de Informacion de Ataques del Rival al Ganar](./UI_design/WinInfoAttack.png)

Pantalla descartada y sustituida por cuadro de texto flotante al lado del boton correspondiente, normalmente invisible.

**Ganar (Mochila Nuevo Ataque)**

![imagen de Mochila añadiendo Nuevo Ataque al Ganar](./UI_design/WinBackpackAttack.png)

81. Nuevo Ataque: Contenedor de info y botones del Nuevo Ataque que se quiere añadir.
82. Nombre de Ataque: Nombre del Ataque que se quiere añadir a una criatura del equipo.
83. Categoría de Ataque: Icono que indica la Categoría del Ataque.
84. Tipo Elemental de Ataque: Icono que indica el tipo Elemental del Ataque.
85. Boton de Descartar: Descartar el ataque nuevo y avanzar a la siguiente Batalla.
86. Boton de Ver Ataque: Al pulsar se muestra la descripcion del ataque en un cuadro de texto flotante que normalmente esta oculto.
87. Boton de Enseñar: Al pulsar se Muestra la pantalla de Informacion de la criatura con botones añadidos para enseñar el ataque.

**Ganar (Enseñar Ataque)**

![imagen de Enseñar Nuevo Ataque al Ganar](./UI_design/WinTeachAttack.png)

88. Nuevo Ataque: Nuevo ataque que se quiere enseñar, al pulsar se selecciona y se muestra la Informacion del Ataque.
89. Boton de Olvidar: Al pulsar la criatura actual olvida el ataque seleccionado y lo sustituye por el nuevo ataque, y avanza a la siguiente Batalla.

**Tienda**

![imagen de la Tienda](./UI_design/ShopHome.png)

90. Criatura Disponible: Contenedor con informacion y botones de una de las criaturas disponibles en la tienda para comprar.
91. Imagen de Criatura: Imagen que representa a la criatura.
92. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.
93. Precio: Monedas necesarias para comprar la criatura.
94. Boton de Comprar: Al pulsar se descuentan las monedas requeridas y se avanza a la pantalla de Criatura Comprada.
95. Boton de Ver: Al pulsar muestra la pantalla de Informacion de la criatura.
96. Boton de Actualizar Tienda: Al pulsar gasta monedas para cambiar las criaturas disponibles en la Tienda.
97. Boton de Mochila: Al pulsar cambia a la pantalla de Mochila con la posibilidad de vender criaturas del equipo.
98. Boton de Salir: Al pulsar avanza a la siguiente Batalla.

**Tienda (Criatura Comprada)**

![imagen de Criatura Comprada en la Tienda](./UI_design/ShopPurchased.png)

99. Boton de Extraer Ataque: Al pulsar cambia a la pantalla de Mochila con el ataque de la criatura comprada seleccionado para añadirlo a una criatura del equipo.
100. Boton de Añadir Criatura: Al pulsar añade la criatura al equipo, o si ya esta lleno se avanza a la Mochila para sustituir una criatura por la nueva.

**Fin del Juego**

![imagen del resumen al Final del Juego](./UI_design/GameOver.png)

101. Avatar del Jugador: Imagen que representa al jugador en el juego.
102. Nombre del Jugador: Nombre guardado por el que se hace referencia al jugador dentro del juego.
103. Record del Jugador: Máxima ronda a la que ha llegado el Jugador en partidas anteriores, actualizado si en esta partida a llegado mas lejos.
104. Ronda Máxima: Ronda mas alta a la que ha llegado el jugador en esta partida.
105. Criatura del equipo: Contenedor con la informacion visual básica de cada criatura del equipo.
106. Imagen de Criatura: Imagen que representa a la criatura.
107. Tipo Elemental: Icono que indica el tipo Elemental de la criatura.

### Iconos

**Opciones de Menus**

![imagen de iconos de menus](./gdd_images/IconsMenus.png)

Procedentes de [SVG-Repo](#referencias).

**Categorías**

![imagen de iconos de categorias](./reactmon/guide_images/categories.png)

Procedentes de [SVG-Repo](#referencias).

**Tipos Elementales**

![imagen de iconos de Tipos Elementales](./reactmon/guide_images/typesImg.png)

Procedentes de [duiker101](#referencias).

### Aspectos de Jugadores (PlayerSkins)

![imagen de Personaje de maniac](./reactmon/src/assets/player_skins/maniac.png) ![imagen de Personaje de acetrainer](./reactmon/src/assets/player_skins/acetrainer.png) ![imagen de Personaje de aquagrunt](./reactmon/src/assets/player_skins/aquagrunt.png) ![imagen de Personaje de biker](./reactmon/src/assets/player_skins/biker.png)

![imagen de Personaje de picnicker](./reactmon/src/assets/player_skins/picnicker.png) ![imagen de Personaje de acetrainerf](./reactmon/src/assets/player_skins/acetrainerf.png) ![imagen de Personaje de magmagrunt](./reactmon/src/assets/player_skins/magmagrunt.png) ![imagen de Personaje de battlegirl](./reactmon/src/assets/player_skins/battlegirl.png)

Procedentes de [Pokémon-Showdown](#referencias).

### Criaturas (CreatureList)

![imagenes de criaturas con color original](./gdd_images/OriginalCreatures.png)

(Color Original de las criaturas)

Procedentes de [jnovack](#referencias).

### Fondos de Pantalla (BackgroundList)

**Ciudad**

![fondo de pantalla de ciudad](./reactmon/src/assets/backgrounds/city.jpg)

**Pradera**

![fondo de pantalla de pradera](./reactmon/src/assets/backgrounds/grassland.jpg)

**Bosque**

![fondo de pantalla de bosque](./reactmon/src/assets/backgrounds/forest.jpg)

**Mar**

![fondo de pantalla de mar](./reactmon/src/assets/backgrounds/sea.jpg)

**Desierto**

![fondo de pantalla de desierto](./reactmon/src/assets/backgrounds/desert.jpg)

**Volcan**

![fondo de pantalla de volcan](./reactmon/src/assets/backgrounds/volcano.jpg)

Procedentes de [FREEPIK](#referencias).


## Detalles de Implementación

### Tecnologías Utilizadas

- Ubuntu 22.04.4 LTS, 64 bits, 16 GB RAM.
- Visual Studio Code 1.89.1.
- Firefox Browser 132.0.1 (64-bit).
- npm 8.6.0.
- Vite 5.4.8.
- React 18.3.1.
- Eslint 9.11.1.

### Preparación del Entorno de Desarroyo

Los comandos utilizados en la Terminal de Ubuntu, comenzando en la carpeta raiz del proyecto, para iniciar el proyecto son los mostrados a continuacion.

Inicializar NPM en la carpeta raiz del proyecto:

```
npm init -y
```

Crear la carpeta del codigo del proyecto con Vite preparada para usar React:

```
npm create vite@latest
nombre-proyecto
React
JavaScript + SWC
```

Instalar las dependencias del proyecto:

```
cd ./nombre-proyecto/
npm install
npm install standard -D
```

Iniciar el servidor local, posicionado en la carpeta del codigo del proyecto, para poder acceder al proyecto en el navegador:

```
npm run dev
```

Para acceder al proyecto ejecutado en el servidor local desde el navegador usar la url `http://localhost:5173/react-reactmon/`

### Entidades y Atributos

(Expresion `f()` utilizado para indicar si un atributo depende de otros para su calculo)

**Jugador (Player)**

- Nombre (name). `<string>`
  - Descripcion: Cadena de caracteres con el nombre del Jugador.
- Imagen (image). `<Tag> in PlayerSkins`
  - Descripcion: Nombre de la imagen utilizada como aspecto del Jugador.
- Record (record). `<int>`
  - Descripcion: Maxima ronda alcanzada en partidas anteriores por el jugador.
  - `record = f(Game.round)`
- Criaturas (creatures). `<List<Creature>>`
  - Descripcion: Criaturas que forman el equipo actual del Jugador.
- Criatura en Combate (indexActualCreature). `<int>`
  - Descripcion: Indice de la criatura del jugador actualmente en el campo de Batalla.
- Criaturas Vivas (liveCreatures). `<int>`
  - Descripcion: Criaturas restantes disponibles para el combate.
  - `liveCreatures = f(Player.creatures[].dead)`

**Criatura (Creature)**

- Identificador Interno (id). `<int>`
  - Descripcion: Numero que identifica de forma unica a la criatura.
  - `id = f(Game.contCreatureIds)`
- Imagen (image). `<CreatureImage>`
  - Descripcion: Datos sobre la imagen que representa a la criatura.
  - `image = f(Creature.mainStats, Creature.typeRelatedStats)`
- Tipo (type). `<Tag> in [FIRE, GRASS, WATER]`
  - Descripcion: Tipo Elemental de la Criatura.
- Ataques (attacks).  `<List<Attack>>`
  - Descripcion: Ataques que conoce la criatura para utilizar en combate.
  - `attacks = f(Creature.type)`
- Estadisticas (stats). `<List<(Tag in CreatureStats, int)>>`
  - Descripcion: Valores que describen las capacidades de la Criatura.
- Vida Restante (recordedHealth). `<int>`
  - Descripcion: Puntos de Vida actuales de la criatura para el combate, si llega a 0 se debilita.
- Mejoras de Estadistica (recordedBuffs). `<Buff>`
  - Descripcion: Mejoras de estadistica aplicadas en el combate actual.
- Debilitado (dead). `<bool>`
  - Descripcion: Indica si la Criatura sigue disponible para combatir o no.
  - `dead = f(Creature.recordedHealth)`
- Estadisticas Principales (mainStats). `<List<Tag in CreatureStats>>`
  - Descripcion: Estadistica mas alta de la criatura, si hay varias estadisticas con valores cercanos se incluyen.
  - `mainStats = f(Creature.stats)`
- Estadisticas Relacionadas (typeRelatedStats) `<List<Tag in CreatureStats>>`
  - Descripcion: Estadisticas relacionadas con el tipo de la Criatura.
  - `typeRelatedStats = f(Creature.type)`

**Ataque (Attack)**

- Identificador (key). `<Tag> in AttackList`
  - Descripcion: Etiqueta que identifica el Ataque de forma unica.
- Nombre (name). `<string>`
  - Descripcion: Nombre descriptivo para mostrar en la UI.
- Categoría (category). `<Tag> in [PHYSICAL, SPECIAL, SUPPORT]`
  - Descripcion: Indica el funcionamiento interno general del Ataque.
- Tipo (type). `<Tag> in [FIRE, GRASS, WATER, NEUTRAL]`
  - Descripcion: Tipo Elemental del Ataque.
- Descripcion (description). `<string>`
  - Descripcion: Explicacion de como funciona el Ataque.

**Juego (Game)**

- Idioma (languaje). `<Tag> in [spanish, english]`
  - Descripcion: Indica el idioma actual de los textos de la UI.
- Jugador Principal (player). `<Player>`
  - Descripcion: Es el Jugador principal manejado por el usuario local.
- Jugador Rival (rival). `<Player>`
  - Descripcion: Es el openente generado como NPC o conectado a traves de internet.
- Monedas (coins). `<int>`
  - Descripcion: Monedas disponibles del Jugador Principal para gastar en la tienda.
- Ronda (round). `<int>`
  - Descripcion: Ronda actual en la que se encuentra el Jugador Principal.
- Fondo del Escenario (background). `<Background>`
  - Descripcion: Imagen de Fondo de la pantalla.
  - `background = f(Game.round)`
- Modo Actual (gameState). `<Tag> in GameStates`
  - Descripcion: Estado Actual del Juego.
- Pantalla Actual (actualWindow). `<string>`
  - Descripcion: Pantalla actual del Juego.
  - `actualWindow = f(Game.gameState)`
- Criaturas Generadas (contCreatureIds). `<int>`
  - Descripcion: Numero de criaturas generadas en el juego, utilizado para la generacion de ids de Criaturas. 

**Datos de Imagen de Criatura (CreatureImage)**

- Nombre (name). `<Tag> in CreatureList`
  - Descripcion: Nombre de la imagen que representa a la criatura.
  - `name = f(Creature.mainStats)`
- Tono (dark). `<int> in {0..6}`
  - Descripcion: Cuanto mayor sea mas oscuro sera el tono de los colores de la imagen.
  - `dark = f(Creature.typeRelatedStats)`

**Mejora de Estadistica (Buff)**

- Estadistica Mejorada (stat). `<Tag> in CreatureStats`
  - Descripcion: Estadistica sobre la que se aplica la mejora.
- Capas de Mejora (cont). `<int> in {0..5}`
  - Descripcion: Cantidad de veces que se aplica la mejora.

**Fondo del Escenario (Background)**

- Nombre de la Imagen (image). `<Tag> in BackgroundList`
  - Descripcion: Nombre de la imagen de Fondo.
- Color añadido (color). `<HexColorTr>`
  - Descripcion: Color representativo superpuesto con la imagen de fondo.
  - `color = f(Background.image)`

### Despliegue

Preparacion para desplegar en GitHub Pages.

Añadir al fichero `vite.config.js` en la carpeta de código la siguiente línea:

```
export default defineConfig({
  // añadir siguiente línea a lo que ya haya en este objeto
  base: '/react-reactmon/'
})
```

Desde la Terminal de Ubuntu, estando situado en la carpeta del codigo del proyecto, construir el proyecto para Produccion:

```
npm run build
```

Iniciar proyecto de Produccion en servidor local para comprobar funcionamiento correcto:

```
npm run preview
```

Para acceder al servidor local con el proyecto de Produccion usar `http://localhost:4173/react-reactmon/`

Modificar `.gitignore` comentando la carpeta `dist` para guardar el proyecto construido en GitHub y hacer el `Commit` y `Push` correspondientes con todo.

Desde la página de GitHub en el repositorio del proyecto se accede al menu de `Settings`, a la opcion de `Pages`. En esta opcion, en la seccion `Build and deployment`, se elige como `Source` la opcion de `GitHub Actions`. De entre los tipos recomendados se ha seleccionado `Static HTML` pulsando en `Configure`. Esto genera un archivo de `workflows` por defecto llamado `static.yml` que es modificado de la siguiente forma:

```
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Upload compiled directory
          path: './reactmon/dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Tras guardar este archivo en GitHub se construirá automaticamente el proyecto en un servidor de GitHub Pages y se proporcionará la url a traves de la cual se puede acceder si el Despliegue ha sido correcto.

La url de este proyecto es `https://josemr6.github.io/react-reactmon/`.

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
