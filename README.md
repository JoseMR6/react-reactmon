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
- Tercera persona.
- Gestion de recursos.
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

### Mecánicas

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
- Escribir nombre.

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

### Acciones

### Interacciones

### Reglas


## Elementos Gráficos

### Interfaz de Usuario (UI / HUD)

### Criaturas

### Fondos de Pantalla

### Aspectos de Jugadores

### Iconos


## Detalles de Implementación

### Tecnologías Utilizadas

### Preparación del Entorno de Desarroyo

### Entidades y Atributos

### Estados

### Despliegue

### Tests


## Posibles Futuras Mejoras


## Creditos
