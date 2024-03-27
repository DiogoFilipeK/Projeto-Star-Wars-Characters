let currentPageUrl = 'https://swapi.dev/api/people/' //Aonde irá colocar o link da API das imagens e informações//

window.onload = async () => { //Toda vez que a página carregar ou recarregar irá chamar uma função
    try{ //Try = Tente fazer o que está nessa função
        await loadCharacters(currentPageUrl);

    } catch (error){ // Catch = Caso contrário faça isso
        console.log(error);
        alert("Erro ao carregar os cards!");
    }

    //para os botões 

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage) // Vai monitorar eventos no elemento, toda vez que clicar, vai dar next
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadCharacters(url){ // Irá chamar a URL da página, quando mudar para próxima, ira carragar outra URL da API
    const mainContent = document.getElementById('main-content') // getElementByID pega uma id do html e bota para rodar no JavaScript
    mainContent.innerHTML = ''; // Limpa os resultados anteriores.

    try{ // Estamos fazendo o comando para as imagens irem apra os cards.

        const response = await fetch(url) //aonde essas urls serão utilizadas
        const responseJson = await response.json(); //pega todas as informações da API

        responseJson.results.forEach((character) => {  // pega somente uma parte das informações da API (A que eu quero)
            const card = document.createElement("div") // Cria um elemento HTML
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}` // Para mudar automaticamente os nomes, ele pega direto da API 
       
            characterNameBG.appendChild(characterName) // appendChild insere um elemento dentro do characterNameBG
            card.appendChild(characterNameBG)

            // sobre as informações do click para personagem
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ""

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}` 
                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)
            }

            mainContent.appendChild(card)      
        });

        //Verificação dos botões

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next //Desabilita o botão quando chegar no final
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        // comando para o anterior ficar visível ou não

      currentPageUrl = url


    } catch (error){
        alert("Erro ao carregar os personagens.")
        console.log(error)
    }
} 

//código para os cliques funcionarem

async function loadNextPage(){
    if (!currentPageUrl) rDartheturn; // Se o valor dessa variavel for falso, interrompe a função.

    try {
        const response = await fetch(currentPageUrl) 
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a próxima página.")
    }
}

async function loadPreviousPage(){
    if (!currentPageUrl) return; // Se o valor dessa variavel for falso, interrompe a função.

    try {
        const response = await fetch(currentPageUrl) 
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert("Erro ao carregar a página anterior.")
    }
}

// códigos para fazer as informações aparecerem

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"

}

// função para deixar em português as cores

function convertEyeColor(eyeColor){
  const cores = {
    blue: 'azul',
    brown:'castanho',
    green: 'verde',
    yellow: 'amarelo',
    black:'preto',
    pink: 'rosa',
    red:'vermelho',
    orange: 'laranja',
    hazel: 'avela',
    bluegray: 'cinza azulado',
    unknown: 'desconhecida'
  };
  return cores[eyeColor.toLowerCase()] || eyeColor;
}

// conversor de altura

function convertHeight(height){
    if (height === 'unknown') {
        return "Altura Desconhecida"
    }

    return (height/100).toFixed(2);
}

// Conversor para KG

function convertMass(mass){
    if (mass === 'unknown') {
        return "Desconhecido"
    }

    return `${mass}kg`

}

// Conversor Nascimento

function convertBirthYear(birthYear){
    if (birthYear === 'unknown') {
        return "Desconhecido"
    }

    return birthYear
}