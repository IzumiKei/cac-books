
// ---- URLS ----
//      Local (For testing)
let jsonURL = "../js/books.json"
let coversFolderURL = "../img/covers/"
//      GoogleAPI
let volumesURL = "https://www.googleapis.com/books/v1/volumes"


// Devuelve un JSON con el volumen correspondiente a este ISBN.
export function fetchVolumeByISBN(ISBN){
    return fetch(volumesURL + "?q=+isbn:" + ISBN)
}

// Devuelve un JSON con el volumen correspondiente a este Google Id.
export function fetchVolumeById(id){
    return fetch(volumesURL + "/" + id)
}

// Devuelve un JSON con una lista de volumenes pertenecientes a dado género.
export function fetchVolumesBySubject(subject, orderBy = "newest",limit = 10){
    let formatedSubject = subject.replaceAll(" & ", "+").replaceAll(" / ", "/").replaceAll(" ", "+")
    return fetch(volumesURL + '?q=subject:"' + formatedSubject + '"&maxResults=' + limit + "&filter=ebooks&langRestrict=es&orderBy=" + orderBy)
}

// Devuelve un json con una lista de volumenes basado en una querie.
export function fetchVolumesByQuerie(q = " ", startIndex){
    console.log(volumesURL + "?q=" + q + "&filter=ebooks&langRestrict=es&maxResults=20" + "&startIndex=" + startIndex)
    return fetch(volumesURL + "?q=" + q + "&filter=ebooks&langRestrict=es&maxResults=20" + "&startIndex=" + startIndex)
}

// Panda (Base de datos), Matplotlib (Graficar); 
// scikit-learn (Modelos de ciencia de datos); keras (Redes neuronales)


