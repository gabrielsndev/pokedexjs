
const URL = "https://pokeapi.co/api/v2/pokemon/"
fetch(URL + "eevee" )
.then(response => response.json().then(data =>{
    console.log(data);
    console.log(data.name);
    console.log(data.sprites['front_default'])
    console.log(data.id);
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
    .then(response => response.json().then(evolution => {
        fetch(evolution.evolution_chain["url"])
        .then(response => response.json().then(evolution2 => {
            const processEvolution = (chain) => {
                console.log(`Pokémon: ${chain.species.name}`);
                
                chain.evolves_to.forEach(nextEvolution => {
                  console.log(`  Evolui para: ${nextEvolution.species.name}`);
                  nextEvolution.evolution_details.forEach(detail => {
                    console.log(`    Método de evolução: ${detail.trigger.name}`);
                    console.log(`    Nível mínimo: ${detail.min_level}`);
                  });
                  
                  // Recursivamente processar evoluções subsequentes
                  processEvolution(nextEvolution);
                });
              };
              
              // Inicia a cadeia de evoluções a partir do Pokémon inicial
              processEvolution(evolution2.chain);
        }))
        .catch(err =>{
            console.log(`Error ao buscar a evolução: ${err.message}`);
            window.alert(`Error ao buscar a evolução: ${err.message}`);
        })
    }))
    
    .catch(err =>{window.alert(`Aconteceu um erro:` + (err).message)});


    const main = document.getElementsByClassName("main")[0]
/*    main.innerHTML =  `<img src="${data['sprites']['front_default']}" alt="${data.name}" width="200" height="200">`*/
}))
.catch(err =>{
    console.log(err);
    window.alert('Aconteceu algum erro um erro: ' + err.message, 'Procure por outro Pokemon ')

})

