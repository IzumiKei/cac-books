import {cacHeader, cacFooter} from "./Components/CacNavigation.js"
import { SearchApp } from "./Components/SearchApp.js"
import {fetchVolumesByQuerie} from "./books-api-library.js"

let booksSection = document.getElementsByClassName("books-section")[0]

let rawData = window.location.search
let parsedData = new URLSearchParams(rawData)
let startIndex = parsedData.get("page")*20 - 20  // 1 * 20 - 20 = 0, 2 * 40 - 20 = 20 

const {createApp} = Vue;


createApp({
    components: {
        "navegacion": cacHeader,
        "pie": cacFooter,
        "search-app": SearchApp
    }
}).mount("#app")

function initPageButtons(totalResults){
    document.getElementById("page-counter-text").innerText = parsedData.get("page")
    
    if (parsedData.get("page") == 1){
        document.getElementById("page-button-left").style.display = "none"
    }

    if (startIndex + 20 >= totalResults) {
        document.getElementById("page-button-right").style.display = "none"
    }
}

// Llama al search cambiando la URL
function advancePage(pageIndexModifier){
    let searchPageURL = "/content/search.html"
    let newPageNum = parseInt(parsedData.get("page")) + pageIndexModifier
    let urlData = "?search=" + parsedData.get("search") + "&page=" + newPageNum
    
    window.location = searchPageURL + urlData
}

/*
fetchVolumesByQuerie(parsedData.get("search"), startIndex)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.items.length)
        for (let i = 0; i < data.items.length; i++){
            booksSection.innerHTML += createBookItem(data.items[i].id, data.items[i].volumeInfo.title)
        }
        
        initPageButtons(data.totalItems)
    })
*/
