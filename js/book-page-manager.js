

function updateData(bookObject){
    // Referencia a las etiquetas html
        // Data: Información principal
    let title = document.querySelector("#title") // ID
    let cover = document.querySelector("#cover")
    let starRating = document.querySelector("#start-rating-text")
    let synopsis = document.querySelector("#synopsis")
        // Data: Columna izquierda
    let author = document.querySelector("#author")
    let publisher = document.querySelector("#publisher")
    let publicationDate = document.querySelector("#publication-date")
        // Data: Columna derecha
    let isbn = document.querySelector("#isbn")
    let pages= document.querySelector("pages")
    let genre = document.querySelector("genre")
        // Botones
    let buyButton = document.querySelector(".buy-button") // Class
    let sampleButton = document.querySelector(".sample-button")


    title.innerHTML = bookObject.title
    cover.setAttribute("src", bookObject.cover)
    starRating.innerHTML = bookObject.stars
    synopsis.innerHTML = bookObject.synopsis
    
    author.innerHTML = bookObject.author
    publisher.innerHTML = bookObject.publisher
    publicationDate.innerHTML = bookObject.publicationDate

    isbn.innerHTML = bookObject.isbn
    pages.innerHTML = bookObject.pagesAmount
    //genre = bookObject.genre // Esto tiene que leer el array de géneros y hacer otras cosas.
    
    buyButton.setAttribute("href", bookObject.buyLink)
    sampleButton.setAttribute("href", bookObject.sampleLink)
}


updateData(booksDatabase["isbn9788490697641"])

console.log(booksDatabase["isbn9788490697641"].author)
