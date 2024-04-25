/*
    Esta "base de datos" es temporal y de ninguna manera
    va a estar en el producto final. En cuanto se pueda, la info estará en un JSON
    y se extraerá de allí. 

*/


class Book {
    constructor(title, cover, stars, synopsis, author, publisher, publication, isbn, pagesAmount, genre, buyLink, sampleLink){
        // Info principal
        this.title = title
        this.cover = cover
        this.stars = stars
        this.synopsis = synopsis
        // Columna Izquierda
        this.author = author
        this.publisher = publisher
        this.publicationDate = publication
        // Columna Derecha
        this.isbn = isbn
        this.pagesAmount = pagesAmount
        this.genre = genre
        // Links
        this.buyLink = buyLink
        this.sampleLink = sampleLink
    }
}


// Elementos de la base de datos. Cada variable

var booksDatabase = {}


let isbn9788490697641 = new Book(
    "Brazales de Duelo",
    "../img/covers/brazales-de-duelo.jpeg",
    4.8,
    "Brazales de Duelo es el sexto libro de la saga «Nacidos de la Bruma [Mistborn]», una obra iniciada con El imperio final y parte imprescindible del Cosmere, el universo destinado a convertirse en la serie más extensa y fascinante jamás escrita en el ámbito de la fantasía épica.",
    "Brandon Sanderson",
    "NOVO",
    "21/07/2017",
    9788490697641,
    512,
    ["Ciencia Ficción", "Apocaliptico"],
    "https://play.google.com/store/books/details/Brandon_Sanderson_Brazales_de_Duelo_Wax_Wayne_3?id=e1YlDwAAQBAJ&hl=es-419",
    ""
)

booksDatabase["isbn9788490697641"] = isbn9788490697641