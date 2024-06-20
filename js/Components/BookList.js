import { fetchVolumesBySubject } from "../books-api-library.js"

export const BookItem = {
    template: `
    <div class="book-item" v-bind:id="bookId">
        <a v-bind:href="bookPage">
            <img class="book-item-cover" v-bind:src="imgURL" v-bind:alt="bookTitle">
        </a>
    </div>`,
    data() {
        return {
            imgURL: "https://books.google.com/books/publisher/content/images/frontcover/" + this.bookId + "?fife=w480-h690",
            bookPage: "/content/book.html?id=" + this.bookId,
        }
    },
    props: ["bookId", "bookTitle"]
}

export const BookList = {
    components: {
        "bookItem": BookItem
    },
    template: `
    <section class="book-section">
        {{fetchData()}}
        <!-- Sección de Literatura -->
        <h2 class="section-title">{{sectionTitle}}</h2>

        <div class="book-list">
            <!-- Lista de libros -->
            <div v-for="item in itemsData.items">
                <bookItem v-bind:book-id="item.id" v-bind:book-title="item.volumeInfo.title"></bookItem>
            </div>
        </div>
    </section>`,
    data(){
        return {
            itemsData: {},
            fetched: false
        }
    },
    props: ["sectionTitle", "sectionTopic"],
    methods:{
        fetchData(){
            if (this.fetched) {return}

            fetchVolumesBySubject(this.sectionTopic)
                .then(res => {return res.json()})
                .then(data => {
                    console.log(this.sectionTopic)
                    console.log(data)
                    if (data.totalItems < 2) {
                        return
                    }
                    this.itemsData = data
                    this.fetched = true
                   
                })
        }
    }

}