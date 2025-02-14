const listaPokemon = $("#listaPokemon");
const botonesHeader = $(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];

// Función para cargar todos los Pokémon
function cargarPokemon() {
  for (let i = 1; i <= 151; i++) {
    $.ajax({
      url: URL + i,
      method: "GET",
      success: function (data) {
        pokemons.push(data);

        if (pokemons.length === 151) {
          pokemons.sort((a, b) => a.id - b.id);
          pokemons.forEach((poke) => mostrarPokemon(poke));
        }
      },
      error: function (error) {
        console.error("Error fetching Pokémon data:", error);
      },
    });
  }
}

// Función para mostrar un Pokémon
function mostrarPokemon(poke) {
  let tipos = poke.types
    .map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`)
    .join("");

  let pokeId = poke.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = $("<div>").addClass("pokemon").html(`
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `);

  listaPokemon.append(div);
}

// Cargar todos los Pokémon al inicio
cargarPokemon();

// Eventos para los botones de filtrado
botonesHeader.on("click", function (event) {
  const botonId = $(this).attr("id");
  listaPokemon.empty();

  if (botonId === "ver-todos") {
    pokemons
      .sort((a, b) => a.id - b.id)
      .forEach((poke) => mostrarPokemon(poke));
  } else {
    pokemons
      .filter((poke) =>
        poke.types.some((type) => type.type.name.includes(botonId))
      )
      .sort((a, b) => a.id - b.id)
      .forEach((poke) => mostrarPokemon(poke));
  }
});
