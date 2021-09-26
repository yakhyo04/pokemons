const elPage = selectElem("#page")
const elTemplate = selectElem("#template").content


function renderPokimons(pokimon , element){
    element.innerHTML = null
    
    pokimon.map(elem => {
        
        let newLi = createElem("li")
        newLi.setAttribute("id" , "page__item")
        newLi.innerHTML = `
        <img id="page__img" alt="img" src="${elem.img} ">
        <hr id="page__line">
        <span id="page__firstList">
        <div>
        <h4 id="page__title">${elem.name}</h4>
        <p id="page__genre">${elem.type}</p>
        </div>
        <div id="pageSaver" >
        <img id="page__icon" class="love__icon"  data-uuid = "${elem.id}"   src="./img/love.svg"  alt="search">
        
        </div>
        
        </span>
        <div class="divider">
        <p id="page__weight">${elem.weight}</p>
        <p id="page__age">${elem.height}</p>
        </div>
        
        
        
        `
        page.appendChild(newLi) 
        newLi.addEventListener("click" , (e) =>{
            let pokimonsId = e.target.dataset.uuid
            let x = pokemons.findIndex((e) => pokimonsId == e.id)
            let newSecondLI = createElem("li")
            newSecondLI.setAttribute("id" , "page__item")
            newSecondLI.setAttribute("class" , "myItem")
            
            newSecondLI.innerHTML = `
            
            <img id="page__img"alt="img" src="${elem.img}" >
            <hr id="page__line">
            <span id="page__firstList">
            <div>
           <h4 id="page__title">${elem.name}</h4>
            <p id="page__genre">${elem.type}</p>
            </div>
            <div id="pageSaver" >
            <img id="page__icon" class="myIcon"   src="./img/love.svg" alt="search">
            </div>
            
            </span>
            <div class="divider">
            <p id="page__weight">${elem.weight}}</p>
            <p id="page__age">${elem.height}</p>
            </div>
            
            
            
            
            
            `
            
            
            newLi.addEventListener("click" , (e) =>{
                let pokimonsId = e.target.dataset.uuid
                let x = pokemons.find((e) => pokimonsId == e.id)
                newSecondLI.style.display = "none"
            })
          
           canvas__list.appendChild(newSecondLI)
        })
    });
   
    
}
renderPokimons(pokemons, elPage)

const elGenreSelect = selectElem("#select__genre")

function renderGenres(dataPokimon  , element){
    let result = []
    dataPokimon.forEach((elem)=>{
        elem.type.map((genre) =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })
    result.forEach((genres) =>{
        const newOption = createElem("option")
        
        newOption.value = genres
        newOption.textContent = genres
        element.appendChild(newOption)
    })
}
renderGenres(pokemons , elGenreSelect)


elGenreSelect.addEventListener("change" , (e) =>{
    e.preventDefault()
    const selectGenres = elGenreSelect.value.trim()
    let foundPokemons = []
    if(selectGenres === 'all'){
     foundPokemons = pokemons
    }else{
        foundPokemons = pokemons.filter((pokemon) =>{
            return pokemon.type.includes(selectGenres)
        })
    }
    renderPokimons(foundPokemons , elPage)
})

let selectSort = selectElem("#select__sort")
selectSort.addEventListener("change" , (e) =>{
    e.preventDefault()
    function sortPokemons(pokiArr, format){
        if(format === 'all'){
            return pokemons
        }
        let pokemonSort = pokiArr.sort((a,b) =>{
            if(a.name > b.name){
                return 1
            }else if(a.name < b.name){
                return -1
            }else {
                return 0
            }
        })
        if(format === 'a_z'){
            return pokemonSort
        }else if(format === 'z_a'){
            return pokemonSort.reverse()
        }

    }
    let filteredPokimons = sortPokemons(pokemons , selectSort.value.trim())
    renderPokimons(filteredPokimons , elPage)
})

let elForm = selectElem("#form")
let elInput = selectElem("#main__input")
elForm.addEventListener("submit" , (evt) =>{
    evt.preventDefault()
    let regex = new RegExp(elInput.value.trim() , "gi")
    let foundPokimons = []
      pokemons.forEach((elem) =>{
       if(elem.name.match(regex)){
          foundPokimons.push(elem)
       }
   })
    
   renderPokimons(foundPokimons , elPage)


elInput.value = ''
})


function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("love-icon").style.marginLeft = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("love-icon").style.marginLeft= "0";
}

