fetch("https://pokeapi.co/api/v2/pokemon/rattata")
.then(response => response.json().then(data =>{
    console.log(data);
    console.log(data.name);
    const main = document.getElementsByClassName("main")[0]
/*    main.innerHTML =  `<img src="${data['sprites']['front_default']}" alt="${data.name}" width="200" height="200">`*/
}))
.catch(err =>{
    console.log(err);
    window.alert('Aconteceu algum erro um erro: ' + err.message, 'Procure por outro Pokemon ')

})

