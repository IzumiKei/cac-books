
// ---- URLS ----
//      Local (For testing)
let jsonURL = "../js/books.json"
let coversFolderURL = "../img/covers/"
//      GoogleAPI
let volumesURL = "https://www.googleapis.com/books/v1/volumes"


// Crea un BookItem
function createBookItem(id, title){
    let bookItem = `
    <div class="book-item" id="${id}">
        <a href="/content/book.html?id=${id}">
            <img class="book-item-cover" src="https://books.google.com/books/publisher/content/images/frontcover/${id}?fife=w480-h690" alt="${title}">
        </a>
    </div>`

    return bookItem
}

// Crea un BookList
function createBookList(sectionElement, data, limit = 5){
    let items = data.items;
    let bookList = sectionElement.getElementsByClassName("book-list")[0]
    for (i = 0; i < limit; i++){
        bookList.innerHTML += createBookItem(items[i].id, items[i].volumeInfo.title)
    } 
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
function fetchVolumesBySubject(subject, orderBy = "newest",limit = 10){
    let formatedSubject = subject.replaceAll(" & ", "+").replaceAll(" / ", "/").replaceAll(" ", "+")
    return fetch(volumesURL + '?q=subject:"' + formatedSubject + '"&maxResults=' + limit + "&filter=ebooks&langRestrict=es&orderBy=" + orderBy)
}

// Devuelve un json con una lista de volumenes basado en una querie.
function fetchVolumesByQuerie(q = " ", startIndex){
    console.log(volumesURL + "?q=" + q + "&filter=ebooks&langRestrict=es&maxResults=20" + "&startIndex=" + startIndex)
    return fetch(volumesURL + "?q=" + q + "&filter=ebooks&langRestrict=es&maxResults=20" + "&startIndex=" + startIndex)
}

// Usado para cargar la información en la book page.
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
}

// Panda (Base de datos), Matplotlib (Graficar); 
// scikit-learn (Modelos de ciencia de datos); keras (Redes neuronales)


