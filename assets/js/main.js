// Elementos del DOM
const listaPokemon = document.querySelector("#listaPokemon");
const listaTipos = document.querySelector("#listaTipos");
const listaTiposDetails = document.querySelector("#listaTiposDetails");

const containerDetails = document.getElementById("containerDetails");
const nameDetails = document.getElementById("nameDetails");
const idDetails = document.getElementById("idDetails");
const spriteDetails = document.getElementById("spriteDetails");
const weightDetails = document.getElementById("weightDetails");
const heightDetails = document.getElementById("heightDetails");

const hpDetails = document.getElementById("hpDetails");
const attackDetails = document.getElementById("attackDetails");
const defenseDetails = document.getElementById("defenseDetails");
const specialAttackDetails = document.getElementById("specialAttackDetails");
const specialDefenseDetails = document.getElementById("specialDefenseDetails");
const velocityDetails = document.getElementById("velocityDetails");

const hpStat = document.getElementById("hpStat");
const attackStat = document.getElementById("attackStat");
const defenseStat = document.getElementById("defenseStat");
const specialAttackStat = document.getElementById("specialAttackStat");
const specialDefenseStat = document.getElementById("specialDefenseStat");
const velocityStat = document.getElementById("velocityStat");

const hpBar = document.getElementById("hpBar");
const attackBar = document.getElementById("attackBar");
const defenseBar = document.getElementById("defenseBar");
const specialAttackBar = document.getElementById("specialAttackBar");
const specialDefenseBar = document.getElementById("specialDefenseBar");
const velocityBar = document.getElementById("velocityBar");



const search = document.getElementById("search");
const searchResponsive = document.getElementById("search-responsive");
const modal = document.getElementById("modal");

// URL de la API
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Arrays de tipos y colores asociados a los tipos
const tiposArray = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
const coloresTiposArray = ['#aeab8f', '#c80000', '#a990ff', '#ad01cb', '#e6bb61', '#c59101', '#9cc21d', '#653993', '#a6a9c5', '#ff7111', '#717ffe', '#3bcb02', '#ffd625', '#fe509b', '#88dced', '#6622ef', '#494949', '#faa5d2'];

// Traducciones de tipos
const traducciones = {
    normal: 'normal',
    fighting: 'lucha',
    flying: 'volador',
    poison: 'veneno',
    ground: 'tierra',
    rock: 'roca',
    bug: 'bicho',
    ghost: 'fantasma',
    steel: 'acero',
    fire: 'fuego',
    water: 'agua',
    grass: 'planta',
    electric: 'eléctrico',
    psychic: 'psíquico',
    ice: 'hielo',
    dragon: 'dragón',
    dark: 'siniestro',
    fairy: 'hada',
};

// Array para almacenar los tipos seleccionados
const tiposSeleccionados = [];

// Función para pintar tipos en el DOM
function pintarTipos(posTipo) {
    // Crear un nuevo elemento div
    const div = document.createElement("div");

    // Configurar el contenido HTML del div con datos dinámicos
    div.innerHTML = `
        <div id="${tiposArray[posTipo]}" data-tooltip-target="tooltip-${tiposArray[posTipo]}" data-tooltip-placement="bottom" class="btn-tipo flex flex-wrap flex-col cursor-pointer items-center justify-center opacity-25 hover:opacity-100 transition ease-in-out duration-200">
            <img src="assets/icons/types/${tiposArray[posTipo]}.svg" style="background-color:${coloresTiposArray[posTipo]}; border-color:${coloresTiposArray[posTipo]}" class="size-[40px] border-solid border-[5px] rounded-full" />
            <div id="tooltip-${tiposArray[posTipo]}" role="tooltip" class="capitalize absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
                ${traducciones[tiposArray[posTipo]]}
            </div>
        </div>
    `;

    // Obtener el div interno dentro del div
    const divInterno = div.querySelector('.btn-tipo');

    // Agregar un evento click para añadir o eliminar tipos seleccionados
    divInterno.addEventListener("click", () => {
        const tipoSeleccionado = tiposArray[posTipo];
        const index = tiposSeleccionados.indexOf(tipoSeleccionado);

        if (index === -1) {
            // Si no está en la lista, se añade
            tiposSeleccionados.push(tipoSeleccionado);
        } else {
            // Si ya está en la lista, se elimina
            tiposSeleccionados.splice(index, 1);
        }

        // Alternar la clase de opacidad para reflejar la selección
        divInterno.classList.toggle("opacity-100");
    });

    // Agregar el div al contenedor de listaTipos en el DOM
    listaTipos.append(div);
}


// Pintar tipos en el DOM
for (let i = 0; i <= tiposArray.length - 1; i++) {
    pintarTipos(i);
}

// Array para almacenar promesas de fetch
const promesasPokemon = [];

// Realizar fetch para obtener información de los primeros 151 Pokémon
for (let i = 1; i <= 151; i++) {
    const promesa = fetch(URL + i)
        .then((response) => response.json());
    promesasPokemon.push(promesa);
}

// Procesar todas las promesas y mostrar cada Pokémon en orden
Promise.all(promesasPokemon)
    .then((pokemones) => {
        pokemones.forEach((pokemon) => pintarPokemon(pokemon));
    });

// Función para mostrar la información de un Pokémon en el DOM
function pintarPokemon(pokemon) {

    // Imprimir tipos
    let tipos = pokemon.types.map((type) => {
        const tipoColor = coloresTiposArray[tiposArray.indexOf(type.type.name)];
        return `<img src="assets/icons/types/${type.type.name}.svg" style="background-color: ${tipoColor}; border-color: ${tipoColor}" class="size-[25px] inline me-1 border-solid border-[5px] rounded-full" />`;
    });

    tipos = tipos.join('');

    // Imprimir identificador
    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crear div para insertar la información del Pokémon en el DOM
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="bg-${pokemon.types[0].type.name} p-3 rounded-lg h-[100px] transition ease-in-out duration-200 overflow-hidden hover:-translate-y-1  hover:scale-105 relative cursor-pointer">
        <div class="-mt-[16px]">
            <div class="id-${pokemon.types[0].type.name} font-bold text-[35px] break-words">#${pokeId}</div>
            <div class="capitalize -mt-[10px] text-xl font-medium text-[#2b2b2b] break-words">${pokemon.name}</div>
            <div>
                ${tipos}
            </div>
        </div>
        <img class="h-[154px]   absolute -top-[18px] -right-[8px] md:-right-[28px] lg:-right-[8px]" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        </div>
    `;

    // Agregar evento click para mostrar detalles del Pokémon
    div.addEventListener("click", () => {
        // Crear un array con los strings de los tipos (máximo 2)
        const tiposPokemon = pokemon.types.map(type => type.type.name).slice(0, 2);
        // Mostrar información y tipos del Pokémon seleccionado
        pintarDetalles(pokemon, tiposPokemon);
    });

    // Insertar div en el elemento del DOM referenciado
    listaPokemon.append(div);

}

// Función para mostrar los detalles del Pokémon seleccionado en el DOM
function pintarDetalles(pokemon, tiposPokemon) {
    // Verificar y actualizar la clase de fondo en containerDetails según el tipo de Pokémon
    if (containerDetails.classList.item(containerDetails.classList.length - 1).startsWith("bg-card-")) {
        containerDetails.classList.remove(containerDetails.classList.item(containerDetails.classList.length - 1));
    }
    containerDetails.classList.add(`bg-card-${pokemon.types[0].type.name}`);

    // Actualizar información de detalles del Pokémon en el DOM
    nameDetails.innerText = pokemon.name;
    let pokeId = pokemon.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }
    idDetails.innerText = "#" + pokeId;

    spriteDetails.onload = function() {
        modal.showModal();
    };

    spriteDetails.src = `${pokemon.sprites.other["official-artwork"].front_default}`;
    pintarDetallesTipos(tiposPokemon);
    weightDetails.innerText = pokemon.weight + "hg";
    heightDetails.innerText = pokemon.height + "dm";


    hpStat.innerText = pokemon.stats[0].base_stat;
    attackStat.innerText = pokemon.stats[1].base_stat;
    defenseStat.innerText = pokemon.stats[2].base_stat;
    specialAttackStat.innerText = pokemon.stats[3].base_stat;
    specialDefenseStat.innerText = pokemon.stats[4].base_stat;
    velocityStat.innerText = pokemon.stats[5].base_stat;

    // Actualizar las barras de estadísticas del Pokémon
    actualizarBarra(hpBar, pokemon.stats[0].base_stat, 255);
    actualizarBarra(attackBar, pokemon.stats[1].base_stat, 190);
    actualizarBarra(defenseBar, pokemon.stats[2].base_stat, 230);
    actualizarBarra(specialAttackBar, pokemon.stats[3].base_stat, 194);
    actualizarBarra(specialDefenseBar, pokemon.stats[4].base_stat, 230);
    actualizarBarra(velocityBar, pokemon.stats[5].base_stat, 180);

}

// Función auxiliar para actualizar la barra de estadísticas
function actualizarBarra(bar, statValue, maxValue) {
    const porcentaje = ~~((statValue / maxValue) * 100);
    bar.style.width = `${porcentaje}%`;
}

// Función auxiliar para pintar tipos del Pokémon seleccionado
function pintarDetallesTipos(tiposPokemon) {
    // Limpiar contenido previo
    listaTiposDetails.innerHTML = "";

    const div = document.createElement("div"); // Crear un elemento div

    for (let i = 0; i < tiposPokemon.length; i++) {
        div.innerHTML += `
            <span style="background-color: ${coloresTiposArray[tiposArray.indexOf(tiposPokemon[i])]}; border-color: ${coloresTiposArray[tiposArray.indexOf(tiposPokemon[i])]};" class="uppercase py-2 px-4 no-underline rounded-full text-white text-sm hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">${traducciones[tiposPokemon[i]]}</span>
        `;
    }

    listaTiposDetails.append(div); // Agregar el elemento div con todos los spans
}

const botonesHeader = document.querySelectorAll(".btn-tipo");

// Obtener todos los botones del encabezado y asignarles un listener para el evento click
botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {

    // Limpiar el contenido de la lista de Pokémon cada vez que se hace clic en un botón
    listaPokemon.innerHTML = "";

    // Inicializar un array para almacenar las promesas de las solicitudes fetch
    const fetchPromises = [];

    // Iterar sobre los primeros 151 Pokémon
    for (let i = 1; i <= 151; i++) {
        // Realizar una solicitud fetch para obtener información del Pokémon correspondiente
        const response = await fetch(URL + i);
        const data = await response.json();
        fetchPromises.push(data); // Agregar la promesa al array
    }

    // Esperar a que se completen todas las solicitudes fetch
    const results = await Promise.all(fetchPromises);

    // Iterar sobre los resultados de las solicitudes fetch
    results.forEach(data => {
        // Obtener los tipos del Pokémon actual
        const tipos = data.types.map(type => type.type.name);

        // Verificar si no se han seleccionado tipos o si al menos uno de los tipos coincide
        if (tiposSeleccionados.length === 0 || tipos.some(tipo => tiposSeleccionados.includes(tipo))) {
            // Llamar a la función para pintar el Pokémon en la lista
            pintarPokemon(data);
        }
    });

}));

// Agrega un event listener para el evento 'keydown' en el input
search.addEventListener("keydown", function (event) {
    // Comprueba si la tecla presionada es "Enter"
    if (event.key === "Enter") {
        realizarBusqueda(search.value.toLowerCase());
    }
});

// Agrega un event listener para el evento 'keydown' en el input
searchResponsive.addEventListener("keydown", function (event) {
    // Comprueba si la tecla presionada es "Enter"
    if (event.key === "Enter") {
        realizarBusqueda(searchResponsive.value.toLowerCase());
    }
});

// Función auxiliar que realiza la búsqueda
function realizarBusqueda(filtro) {
    // Obtiene el valor del filtro en minúsculas desde un input con id "miInput"

    // Limpia la lista actual de Pokémon en el HTML
    listaPokemon.innerHTML = "";

    // Array para almacenar todas las promesas de fetch
    const fetchPromises = [];

    // Realiza iteraciones para obtener datos de los primeros 151 Pokémon
    for (let i = 1; i <= 151; i++) {
        // Añade cada promesa de fetch al array de promesas
        fetchPromises.push(
            fetch(URL + i)
                .then((response) => response.json())
                .then(data => {
                    // Extrae información relevante del Pokémon obtenido
                    const tipos = data.types.map(type => type.type.name);
                    const nombrePokemon = data.name.toLowerCase();
                    const idPokemon = data.id.toString();

                    // Verifica si el Pokémon cumple con los criterios de búsqueda
                    if ((tiposSeleccionados.length === 0 || tiposSeleccionados.some(tipo => tipos.includes(tipo))) &&
                        (nombrePokemon.includes(filtro) || idPokemon.includes(filtro))) {
                        // Llama a la función pintarPokemon para mostrar el Pokémon en la interfaz
                        pintarPokemon(data);
                    }
                })
        );
    }

    // Espera a que todas las promesas de fetch se completen antes de continuar
    Promise.all(fetchPromises)
        .then(() => {
            // Puedes realizar cualquier acción adicional aquí si es necesario después de completar todas las llamadas a la API
        })
        .catch(error => console.error('Error en las llamadas a la API:', error));
}