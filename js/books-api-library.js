
// ---- URLS ----
//      Local (For testing)
let jsonURL = "../js/books.json"
let coversFolderURL = "../img/covers/"
//      GoogleAPI
let volumesURL = "https://www.googleapis.com/books/v1/volumes"


// Añade a todos los elementos de la clase book-item la función que almacena su id cuando se clickea.
function initListeners(sectionObject = document){
    let bookItems = sectionObject.getElementsByClassName("book-item")
    for (i = 0; i < bookItems.length; i++){
        bookItems[i].addEventListener("click", function(){localStorage.setItem("selectedBookID", this.id)}, true)
    }
}


function createBookItem(id, title){
    let bookItem = `
    <div class="book-item" id="${id}">
        <a href="/content/book.html">
            <img class="book-item-cover" src="https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w480-h690" alt="${title}">
        </a>
    </div>`

    return bookItem
}


function createBookList(sectionElement, data, limit = 5){
    let items = data.items;
    let bookList = sectionElement.getElementsByClassName("book-list")[0]
    for (i = 0; i < limit; i++){
        bookList.innerHTML += createBookItem(items[i].id, items[i].volumeInfo.title)
    } 
    initListeners(bookList)
}

// Devuelve un JSON con el volumen correspondiente a este ISBN.
function fetchVolumeByISBN(ISBN){
    return fetch(volumesURL + "?q=+isbn:" + ISBN)
}

// Devuelve un JSON con el volumen correspondiente a este Google Id.
function fetchVolumeById(id){
    return fetch(volumesURL + "/" + id)
}

// Devuelve un JSON con una lista de volumenes pertenecientes a dado género.
function fetchVolumesBySubject(subject, limit = 10){
    console.log(volumesURL + "?q=subject:" + subject + "&maxResults=" + limit + "&filter=paid-ebooks&langRestrict=es&orderBy=newest")
    return fetch(volumesURL + "?q=subject:" + subject + "&maxResults=" + limit + "&filter=paid-ebooks&langRestrict=es&orderBy=newest")
}


// Les da la función click a los objetos 
function updateBookPageData(bookObject){
    // Se usa para crear un string con todos los elementos del array "genre".
    let selectedBookGenres = ""
    // Referencia a las etiquetas html
        // Data: Información principal
    let title = document.querySelector("#title") // ID
    let authorMD = document.querySelector("#author-md")
    let cover = document.querySelector("#cover")
    let starRating = document.querySelector("#star-rating-number")
    let synopsis = document.querySelector("#synopsis")
        // Data: Columna izquierda
    let authorLC = document.querySelector("#author-lc")
    let publisher = document.querySelector("#publisher")
    let publicationDate = document.querySelector("#publication-date")
        // Data: Columna derecha
    let isbn = document.querySelector("#isbn")
    let pages= document.querySelector("#pages")
    let genre = document.querySelector("#genres")
        // Botones
    let buyButton = document.querySelector(".buy-button") // Class
    let sampleButton = document.querySelector(".sample-button")

    // Actualización de la página.
        // Información principal
    title.innerHTML = bookObject.title
    authorMD.innerHTML = bookObject.author
    cover.setAttribute("src", coversFolderURL + bookObject.cover)
    starRating.innerHTML = bookObject.stars
    synopsis.innerHTML = bookObject.synopsis
        // Columna izquierda
    authorLC.innerHTML = bookObject.author
    publisher.innerHTML = bookObject.publisher
    publicationDate.innerHTML = bookObject.publicationDate
        // Columna derecha
    isbn.innerHTML = bookObject.isbn
    pages.innerHTML = bookObject.pagesAmount
        // Código para convertir los elementos de un array en un solo string separado por coma.
    selectedBookGenres = ""
    for (i = 0; i < bookObject.genre.length; i++){
        selectedBookGenres += bookObject.genre[i]
        // Separa por coma todos los items excepto el último, para que no quede una coma adicional.
        if (i != bookObject.genre.length - 1){
            selectedBookGenres += ", "
        }
    }
    genre.innerHTML = selectedBookGenres
        // Botones
    buyButton.setAttribute("href", bookObject.buyLink)
    sampleButton.setAttribute("href", bookObject.sampleLink)
}

function loadBookDataFromAPI(volumeData){
    console.log("Loaded Data:")
    console.log(volumeData)
    let info = volumeData.volumeInfo
    // Referencia a las etiquetas html
        // Data: Información principal
    let title = document.querySelector("#title") // ID
    let authorElement = document.querySelector("#author")
    let cover = document.querySelector("#cover")
    let synopsis = document.querySelector("#synopsis")
        // Data: Columna izquierda
    let formats = document.querySelector("#formats")
    let publisher = document.querySelector("#publisher")
    let publicationDate = document.querySelector("#publication-date")
        // Data: Columna derecha
    let isbn = document.querySelector("#isbn")
    let pages= document.querySelector("#pages")
    let genre = document.querySelector("#genres")
        // Botones
    let buyButton = document.querySelector(".buy-button") // Class
    let sampleButton = document.querySelector(".sample-button")

    // Actualización de la página.
        
        // Titulo
    title.innerHTML = info.title
        // Autores
    authorElement.innerHTML = ""
    if (info.hasOwnProperty("authors")){
        info.authors.forEach(author => {
            authorElement.innerHTML += author
            authorElement.innerHTML += " "
        });
    }
    
        // Portada
    cover.setAttribute("src", "https://books.google.com/books/publisher/content/images/frontcover/"+ volumeData.id + "?fife=w240-h345")
        // Synopsis
    if (info.hasOwnProperty("description")){
        synopsis.innerHTML = info.description
    } else {
        synopsis.innerHTML = "No se encontró ninguna descripción."
    }
    
        // Formatos
    if (volumeData.accessInfo.epub.isAvailable){
        formats.innerHTML = "EPUB"
        if (volumeData.accessInfo.pdf.isAvailable){
            formats.innerHTML += ", PDF"
        }
    } else {
        if (volumeData.accessInfo.pdf.isAvailable){
            formats.innerHTML = "PDF"
        }
    }
        // Editorial
    publisher.innerHTML = info.publisher
        // Fecha de Publicación
    if (info.hasOwnProperty("publishedDate")){
        publicationDate.innerHTML = info.publishedDate
    }
        // ISBN
    if (info.hasOwnProperty("industryIdentifiers")){
        info.industryIdentifiers.forEach(identifier => {
            if (identifier.type == "ISBN_13"){
                isbn.innerHTML = identifier.identifier
            } 
        })
    } else {
        isbn.innerHTML = "Sin definir"
    }
        // Cantidad de páginas
    pages.innerHTML = info.pageCount
        // Géneros
    if (info.hasOwnProperty("categories")){
        genre.innerHTML = ""
        for (i = 0; i < info.categories.length; i++){
            genre.innerHTML += info.categories[i]
            if (i != info.categories.length - 1){ // Separa por coma todos los items excepto el último, para que no quede una coma adicional.
                genre.innerHTML += ", "
            }
        }
    } else {
        genre.innerHTML = "General"
    }
    
        // Botones
    buyButton.setAttribute("href", info.canonicalVolumeLink)
    sampleButton.setAttribute("href", bookObject.sampleLink)
}



