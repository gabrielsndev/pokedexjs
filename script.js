
const URL = "https://pokeapi.co/api/v2/pokemon/"
const input = document.getElementById('input')
const search = document.getElementsByClassName('button')[0]
const def = document.getElementsByClassName("default")[0]
const nome  = document.getElementById('nome')
const main = document.getElementsByClassName('main')[0]


function requisição(){
    const valor = input.value
    const valorMin = valor.toLowerCase()
    const nomeCap = valorMin.charAt(0).toUpperCase() + valorMin.slice(1);
    fetch(URL + valorMin )
    .then(response => response.json().then(data =>{
        console.log(data);
        console.log(data.name);
        const gif = data.sprites.versions["generation-v"]['black-white']['animated'].front_default
        const types = data.types.map(typeInfo => typeInfo.type.name)
        console.log(types)
        console.log(data.id);
        /**/
        nome.innerText = nomeCap
        def.innerHTML =  `<img src="${gif}" alt="${data.name}" width="200" height="200">`

        /*Declarando elementos que virão*/
        const pPEso = document.createElement('p')
        const pAltura = document.createElement('p')
        const h2sh = document.createElement('h2')
        const shyni = document.createElement('div')
        const shynii = document.createElement('div')

        /*Dando classes aos elementos*/
        pPEso.className = 'text'
        pAltura.className = 'text'
        shyni.className = 'default'
        shynii.className = 'default'

        /*Adicionando eles ao elmento Pai*/
        main.appendChild(pPEso)
        main.appendChild(pAltura)
        main.appendChild(h2sh)
        main.appendChild(shyni)
        main.appendChild(shynii)

        /*Adicionando efetivamente eles*/
        pAltura.innerText = `Altura do ${nomeCap}: ${data.height}`
        pPEso.innerText = `Peso do ${nomeCap}: ${data.weight}`
        h2sh.innerText = `${nomeCap} Shyni:`
        shyni.innerHTML = `<img src="${data.sprites.versions["generation-v"]['black-white']['animated'].front_shiny}" alt="${data.name}" width="200" height="200">`
        shynii.innerHTML = `<img src="${data.sprites.versions["generation-v"]['black-white']['animated'].front_shiny}" alt="${data.name}" width="200" height="200">`
        



        fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
        .then(response => response.json().then(evolution => {
            fetch(evolution.evolution_chain["url"])
            .then(response => response.json().then(evolution2 => {
                const processEvolution = (chain) => {
                    console.log(`Pokémon: ${chain.species.name}`)

                    chain.evolves_to.forEach(nextEvolution => {
                        console.log(`  Evolui para: ${nextEvolution.species.name}`)
                        nextEvolution.evolution_details.forEach(detail => {
                            console.log(`    Método de evolução: ${detail.trigger.name}`)
                            console.log(`    Nível mínimo: ${detail.min_level}`)
                            fetch(URL + nextEvolution.species.name)
                            .then(response => response.json().then(img =>{
                                console.log(img.sprites.versions["generation-v"]['black-white']['animated'].front_default)
                        }))
                        .catch(err => window. alert(err.message))
                      });

                      // Recursivamente processar evoluções subsequentes
                      processEvolution(nextEvolution);
                    });
                  };

                  // Inicia a cadeia de evoluções a partir do Pokémon inicial
                  processEvolution(evolution2.chain);
                  console.log(evolution2.chain)
            }))
            .catch(err =>{
                console.log(`Error ao buscar a evolução: ${err.message}`);
                window.alert(`Error ao buscar a evolução: ${err.message}`);
            })
        }))

        .catch(err =>{window.alert(`Aconteceu um erro:` + (err).message)});


    }))
    .catch(err =>{
        console.log(err);
        window.alert('Aconteceu algum erro um erro: ' + err.message, 'Procure por outro Pokemon ')

    })
}



// Event listener para chamar a função


search.addEventListener('click', requisição)

search.addEventListener('touchend', function(event){
    event.preventDefault()
    requisição()
})

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        requisição()
    }
})




