# API POKEMON - BFF - V1
## URL de Swagger
```http
http://localhost:3000/public/api/v1
```

## Endpoints

### GET /pokemon/:name

#### Descripción
Devuelve un pokemon con sus datos pasando el nombre como parametro.

#### Parámetros
| Nombre | Ubicación | Obligatorio |
| ------ | --------- | ----------- |
| name   | Param     | Sí          |

### Respuesta
- **200 OK**: Devuelve un pokemon con sus datos.
- **404 Not Found**: El pokemon solicitado no fue encontrado en el servicio.
- **400 Bad Request**: Error al pasar parametr, debe ser un string válido. El nombre no debe contener caracteres especiales ni números.

#### Ejemplo
```http://localhost:3000/api/v1/pokemon/pikachu```

```json
{
  "name": "charizard",
  "types": [
    "fire",
    "flying"
  ],
  "numberOfAbilities": 2,
  "abilities": [
    "blaze",
    "solar-power"
  ],
  "frontImage": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  "NumberOfMoves": 131,
  "moves": [
    "mega-punch",
    "fire-punch",
    "thunder-punch",
  ] 
}
```
# nota: 
    - Cantidad de movimientos es más de la que se muestra en el ejemplo.
    - Se muestra solo el nombre, tipo, habilidades, imagen frontal y movimientos del pokemon.
    - El parametro no es case sensitive.

### GET /pokemon/:random

#### Descripción
Devuelve un pokemon aleatorio solo de la primera generación, los 151 primeros.

### Respuesta
- **200 OK**: Devuelve un pokemon aleatorio con sus datos.
- **404 Not Found**: El pokemon solicitado no fue encontrado en el servicio.

### Ejemplo
```http://localhost:3000/api/v1/pokemon/random```

```json
{
  "name": "charizard",
  "types": [
    "fire",
    "flying"
  ],
  "numberOfAbilities": 2,
  "abilities": [
    "blaze",
    "solar-power"
  ],
  "frontImage": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  "NumberOfMoves": 131,
  "moves": [
    "mega-punch",
    "fire-punch",
    "thunder-punch"
  ] 
}
```
# nota: 
    - Cantidad de movimientos es más de la que se muestra en el ejemplo.
    - Se muestra solo el nombre, tipo, habilidades, imagen frontal y movimientos del pokemon.

### GET /pokemon/type/:type

#### Descripción
Devuelve la lista de pokemones de un tipo especifico pasando el nombre del tipo como parametro.

#### Parámetros
| Nombre | Ubicación | Obligatorio |Ejemplo|
| ------ | --------- | ----------- |-------|
| type   | Param     | Sí          |fire   |

### Respuesta
- **200 OK**: Devuelve la lista de pokemones de un tipo especifico.
- **404 Not Found**: Lista de pokemones no encontrada.
- **400 Bad Request**: Error al pasar parametro, debe ser un string válido. El nombre no debe contener caracteres especiales ni números.

### Ejemplo
```http://localhost:3000/api/v1/pokemon/type/fire```

```json
    [
  {
    "name": "charmander",
    "type": "fire"
  },
  {
    "name": "charmeleon",
    "type": "fire"
  },
  {
    "name": "charizard",
    "type": "fire"
  },
  {
    "name": "vulpix",
    "type": "fire"
  },
  {
    "name": "ninetales",
    "type": "fire"
  },
  {
    "name": "growlithe",
    "type": "fire"
  },
  {
    "name": "arcanine",
    "type": "fire"
  },
  {
    "name": "ponyta",
    "type": "fire"
  }
  
]
```
# nota: 
 - Cantidad de pokemones es más de la que se muestra en el ejemplo.
 - Se muestra solo el nombre y el tipo de los pokemones.
 - El parametro no es case sensitive.



# Explicación de las estrategias implementadas 

Utilicé la librería cache-manager junto con Redis usando cache-manager-redis-yet como sistema de caché. La decisión de optar por Redis se basó en su estructura más avanzada para el almacenamiento de datos. A diferencia de un sistema de caché que sólo guarda en memoria, Redis permite manejar la información con mayor detalle y realizar un seguimiento de la expiración de los datos. Esto es importante ya que almacenar únicamente en memoria puede llevar a la pérdida de información en caso de que el servidor se reinicie o se caiga, además de implicar una mayor carga en la memoria.

Creé una clase CacheUtil que me permite manejar los métodos de caché y reutilizarlos en cualquier parte de la aplicación, permitiendo que la clase sea autosuficiente y pueda escalar de manera más sencilla. Dentro de la clase esta el método CheckCache que verifica si la información se encuentra en cache y lo hace buscando un hash que se genera con el método generateHash. Si no se encuentra en cache se llama al método setCache que guarda la información en cache.

## Manejo de Errores
Utilicé el decorador @Catch con las interfaces que proporciona NestJS para manejar los errores de manera global. También incluí en los servicios (por ejemplo, el servicio de Pokémon) las excepciones que consideré pertinentes; esto me permite tener un manejo de errores más limpio y generar un formato de respuesta mejor estructurado al devolver una respuesta al cliente, sin exponer información sensible.  También globalicé los registros de errores con Logger para guardar en mi servidor un log presentable y fácil de encontrar.

Creé una clase HttpExceptionFilter que filtra las excepciones que utiliza NestJS, como NotFoundException, y configura una respuesta al cliente siendo más estándar. Lo que hace el catch es ejecutarse cuando se lanza una excepción, luego va extrayendo datos como el status, request, message y puedo generar nuevos datos como el timestamp. También me permite manejar los errores y generar Logs de manera global sin tener que repetir código.
