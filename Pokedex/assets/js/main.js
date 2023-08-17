const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10
let offset = 0;
const maxRecords = 151
 
// 1,2,3,4,5      
// 6,7,8,9,10     
// 11       

loadPokemonItens(offset, limit)

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.numero}</span>
            <span class="name">${pokemon.name}</span>
                    
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol> 
                <img src="${pokemon.photo}"
                    ="${pokemon.name}">
            </div>               
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {        
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml; 
    })   
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtdeRecordNextPage = offset + limit
  
    if(qtdeRecordNextPage >= maxRecords) {
        
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)  
    }  
})
console.log('done');





