import { fetchVolumesByQuerie } from "../books-api-library.js"
import { BookItem } from "./BookList.js"

export const SearchApp = {
    components:{
        "book-item": BookItem
    },
    template: `
        <main> 
            <div class="books-section">
                <book-item v-for="item in data.items" :book-id="item.id" :book-title="item.volumeInfo.title"></book-item>
            </div>
    
            <div id="page-buttons-container">
                <button class="page-button" id="page-button-left" @click="advancePage(-1)" v-if="getPage != 1">Anterior</button>
                <div id="page-counter">
                    <h4 id="page-counter-text">{{params.get("page")}}</h4>
                </div>
                <button class="page-button" id="page-button-right" @click="advancePage(1)" v-if="this.startIndex + 20 >= data.totalItems">Siguiente</button>
            </div>
        </main>
    `,
    data() {
        return {
            params: null,
            startIndex: 0,
            data: null
        }
    },
    created() {
        let rawData = window.location.search
        this.params = new URLSearchParams(rawData)
        this.startIndex = this.params.get("page") * 20 - 20

        fetchVolumesByQuerie(this.params.get("search"), this.startIndex)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.data = data
        })
    },
    methods: {
        advancePage(pageIndexModifier){
            let searchPageURL = "/content/search.html"
            let newPageNum = parseInt(this.params.get("page")) + pageIndexModifier
            let urlData = "?search=" + this.params.get("search") + "&page=" + newPageNum
            
            window.location = searchPageURL + urlData
        }
    },
    computed: {
        getPage(){
            return this.params.get("page")
        }
    }

}