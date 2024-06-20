let trash = `<div class="banner">
            <!-- Banner -->
            <h1><a href="/index.html">CAC - Books</a></h1>
        </div>`;

export const cacHeader = {
    props: ["userData"],
    template: `
    <header>
        <nav class="menu">
            <!-- Menu -->
            <h1><a href="/index.html">CAC - Books</a></h1>
                
            <form action="/content/search.html" class="book-menu" id="search-form">
                <input type="search" id="search" name="search" required>
                <input type="hidden" id="page-input" name="page" value="1">
                <input type="submit" id="search-button" value="Buscar">
            </form>
                
            <div class="profile-menu">
                <a href="/content/profile.html" v-if="isUserLogged">Perfil</a>
                <a href="/content/Login.html" v-else>Iniciar Sesión</a>
                <a href="/content/about.html">Sobre Nosotros</a>
            </div>
        </nav>
    </header>`,
    data(){
        return {
        }
    },
    computed: {
        isUserLogged(){
            return parseInt(localStorage.getItem("isLogged"))
        }
    }
}

export const cacFooter = {
    template: `
    <footer>
        <nav>
            <div class="footer-menu">
                <div class="footer-link" style="text-align: end;">
                    <a href="./terminosycondiciones.html">Términos y condiciones</a>
                    <a href="./mision-vision.html">Valores Institucionales </a>
                </div>
                <div class="footer-wp">
                    <a id="whatsapp-link" href="https://wa.me/3764270900" target="_blank">
                        <span>Contáctenos</span>
                        <!-- <i class="fab fa-whatsapp" style="font-size: 30px; color: #25D366; margin-bottom: -10px;"></i> -->
                    </a>
                </div>
            </div>
        </nav>
    </footer>`
}

