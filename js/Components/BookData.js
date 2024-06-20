import { fetchVolumeById, fetchVolumesBySubject } from "../books-api-library.js"
import { BookList } from "./BookList.js"

export const BookDetail = {
    components: {
        "book-list": BookList
    },
    template: `
        {{init()}}
        <section class="book-detail">

            <!-- Book Cover -->
            <div class="book-detail-cover">
                <img id="cover" :src="getCover" alt="book-cover" v-if="initialized">
                <!-- Buy Book -->
                <div class="book-buying">
                    <a :href="volumeInfo.canonicalVolumeLink" class="buy-button">
                        <span>Comprar en Google Books</span>
                    </a>
                </div>
            </div>
            
            <!-- Book Data -->
            <div class="book-data">
                <div class="book-main-data">

                    <div>
                        <h2 id="title">{{volumeInfo.title}}</h2>

                    </div>

                    <h4 class="author-name" id="author" v-if="initialized">{{volumeInfo.authors.toString()}}</h4>  
                      
                </div>
                
                <div class="book-synopsis">
                    <h2>Descripción</h2>
                    <h3 id="synopsis" v-html="volumeInfo.description"></h3>
                </div>
                <button id="synopsis-button" @click="changeSynopsisDisplayState()" v-if="showSynopsisBtn">Mostrar más</button>  
            </div>

        </section>

        <section class="data-sheet">
            <!-- Data Sheet -->
            <div class="sheet-left">
                <div class="data">
                    <h2>Formatos</h2>
                    <h3 id="formats">{{getFormats}}</h3>
                </div>
                <div class="data">
                    <h2>Editorial</h2>
                    <h3 id="publisher">{{volumeInfo.publisher}}</h3>
                </div>
                <div class="data">
                    <h2>Fecha de Publicación</h2>
                    <h3 id="publication-date">{{volumeInfo.publishedDate}}</h3>
                </div>
            </div>
            <div class="sheet-right">
                <div class="data">
                    <h2>ISBN</h2>
                    <h3 id="isbn">{{getISBN}}</h3>
                </div>
                <div class="data">
                    <h2>Páginas</h2>
                    <h3 id="pages">{{volumeInfo.pageCount}}</h3>
                </div>
                <div class="data">
                    <h2>Géneros</h2>
                    <h3 id="genres" v-if="initialized">{{volumeInfo.categories.toString()}}</h3>
                </div>
            </div>
        </section>
        <book-list v-if="initialized" section-title="Recomendaciones" :section-topic="recomendationTopic"></book-list>
        `,
    data() {
        return {
            searchParams: {},
            initialized: false,
            isFullSynopsisDisplayed: false,
            volumeInfo: {},
            volumeData: {},
            recomendationTopic: "",
            showSynopsisBtn: true
        }
    },
    methods: {
        init() {
            if (this.initialized) {
                return
            }
            let rawData = window.location.search
            this.searchParams = new URLSearchParams(rawData)


            fetchVolumeById(this.searchParams.get("id"))
                .then(response => response.json())
                .then(data => {

                    this.volumeInfo = data.volumeInfo
                    this.volumeData = data
                    this.initialized = true;

                    if (data.volumeInfo.hasOwnProperty("categories")) {
                        let category = data.volumeInfo.categories[0]
                        fetchVolumesBySubject(category, "relevance")
                            .then(response => response.json())
                            .then(data => {
                                if (data.totalItems > 0) {
                                    this.recomendationTopic = category;
                                } else {
                                    document.getElementById("section-recommendations").style.display = "none"
                                }

                            })
                    } else {
                        console.log("No categories for this book")
                        document.getElementById("section-recommendations").style.display = "none"
                    }
                    
                })
        },
        changeSynopsisDisplayState() {
            let bookSynopsis = document.getElementsByClassName("book-synopsis")[0]
            let synopsisButton = document.getElementById("synopsis-button")
            
            if (this.isFullSynopsisDisplayed) {
                bookSynopsis.style.height = "320px";
                synopsisButton.innerText = "Mostrar más"
                this.synopsisHeight = parseInt(bookSynopsis.style.height)
            } else {
                bookSynopsis.style.height = "auto";
                synopsisButton.innerText = "Mostrar menos"
            }

            this.isFullSynopsisDisplayed = !this.isFullSynopsisDisplayed

        },
        initSynopsisButton(){
            let elem = document.getElementById("synopsis")
                console.log(elem.offsetHeight)
                if (elem.offsetHeight >= 280) {
                    this.showSynopsisBtn = true
                } else {
                    this.showSynopsisBtn = false
                }
        }
    },
    computed: {
        getCover(){
            return "https://books.google.com/books/publisher/content/images/frontcover/"+ this.searchParams.get("id") + "?fife=w240-h345"
        },
        getFormats(){
            if (!this.initialized){
                return "..."
            }

            let text = "";
            if (this.volumeData.accessInfo.epub.isAvailable){
                text = "EPUB"
                if (this.volumeData.accessInfo.pdf.isAvailable){
                    text += ", PDF"
                }
            } else {
                if (this.volumeData.accessInfo.pdf.isAvailable){
                    text = "PDF"
                }
            }
            return text
        },
        getISBN(){
            let text = ""

            if (this.volumeInfo.hasOwnProperty("industryIdentifiers")){
                this.volumeInfo.industryIdentifiers.forEach(identifier => {
                    if (identifier.type == "ISBN_13"){
                        text = identifier.identifier
                    } 
                })
            } else {
                text = "Sin definir"
            }

            return text
        },
        showSynopsisButton(){
            if (this.initialized){
                let elem = document.getElementById("synopsis")
                print(elem.offsetHeight)
                if (elem.offsetHeight >= 280) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
        }
    }

} 