
fetch("https://pokeapi.co/api/v2/pokemon/charmander")
.then(response => {return(console.log(response.json()))})