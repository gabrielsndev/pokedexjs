
fetch("https://pokeapi.co/api/v2/pokemon/rattata")
.then(response => response.json().then(data =>{
    console.log(data);
    console.log(data.name);
    const h4 = document.getElementById("name")
    h4.innerHTML = data.name
}))
.catch(err =>{
    console.log(err);
    window.alert('Aconteceu algum erro um erro: ' + err.message, 'Procure por outro Pokemon ')

})