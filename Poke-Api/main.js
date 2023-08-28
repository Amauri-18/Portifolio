class Pokemon {
    id;
    name;
    skill = [];
    height;
    types = [];
    weight;
    sprite;
}

let offset = 0;

const anterior = window.document.querySelector(".fa-arrow-left");
const proximo = window.document.querySelector(".fa-arrow-right");
const frmId = window.document.querySelector(".id");
const heart = window.document.querySelector(".fa-heart");

anterior.addEventListener("click", previous, false);
proximo.addEventListener("click", next, false);
heart.addEventListener("click", favorite, false);

if(frmId.innerHTML == 0) {
    loadPokemon(0);
}

function next() {
    heart.classList.remove("selected");
    offset += 1;
    loadPokemon(offset);     
}

function previous() {
    if(offset >= 1) {
        heart.classList.remove("selected");
        offset -= 1;
        loadPokemon(offset);
    }
}

function favorite() {
   //heart.style.color = 'red';
   heart.classList.toggle("selected");
}

function loadPokemon(offset) {
    const urlApi = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`;

    fetch(urlApi)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(data => { 
            data.map(item => {
                const pokeURL = item.url;
                pokemonDetail(pokeURL);
            })
            
        }) 
        .catch(error => console.log('Erro ao requisitar dados', error));
}

function pokemonDetail(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => render(data))
}

function render(data) {
    //console.log(data);
    const pokemon = new Pokemon();
    
    pokemon.id = data.id;
    pokemon.height = data.height;
    pokemon.weight = data.weight;
    pokemon.name = data.name;
    pokemon.sprite = data.sprites.other.dream_world.front_default;
        
    const habilidade = data.abilities;
    habilidade.forEach(nome => {
        pokemon.skill.push(nome.ability.name);
    })

    const tipos = data.types;
    tipos.forEach(item => {
        pokemon.types.push(item.type.name)
    })

    const frmName = document.querySelector(".name");
    const frmId = document.querySelector(".id");
    const myimg = document.querySelector("img");

    
    myimg.setAttribute("src", pokemon.sprite);
    frmName.innerHTML = pokemon.name;
    frmId.innerHTML = `#00${pokemon.id}`;
    
    //console.log(pokemon.types);
    
    const frmTypes = document.querySelector(".types");
    const frmType01 = document.getElementById("tp01");
    const frmType02 = document.getElementById("tp02");

    const tam = pokemon.types.length;

    if(tam == 1) {
        frmType01.innerHTML = pokemon.types[0];
        frmType02.innerHTML = "";
        frmType02.classList.add("hide");
       
    } else {
        frmType01.innerHTML = pokemon.types[0];
        frmType02.innerHTML = pokemon.types[1];
        frmType02.classList.remove("hide");
    }


    const frmMain = window.document.querySelector("#principal");

    const currentClass = frmMain.classList.value 

    //console.log(frmType01.textContent);

    
    if(currentClass != frmType01.textContent) {        
        frmMain.classList.add(frmType01.textContent);
        frmMain.classList.remove(currentClass);
    }
    
    




    /*
    console.log(pokemon.id)
    console.log(pokemon.height);
    console.log(pokemon.weight)
    console.log(pokemon.name)       
    console.log(pokemon.skill)
    */
}

function updateTypes() {

}