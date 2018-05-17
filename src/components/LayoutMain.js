import Vue from 'vue';

Vue.component('layout-main', {
    props: ['headed'],
    template: `
    <div>
        <header>
            <div class="blog-masthead">
                <div class="container">
                    <div class="row no-gutters">
                        <nav class="nav col">
                            <a class="nav-link active" href="/">Home</a>
                            <a class="nav-link" href="programming.html">Programming</a>
                            <a class="nav-link" href="stuff.html">Another stuff</a>
                            <a class="nav-link" href="about.html">About</a>
                        </nav>
                        <div class="col-2 ext-links">
                            <a href="https://twitter.com/tomas_tulka"><img src="img/twitter.png"></a>
                            <a href="https://github.com/ttulka"><img src="img/github.png"></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="blog-header" v-if="headed">
                <div class="container">
                    <h1 class="blog-title">Tomas Tulka's Blog</h1>
                    <p class="lead blog-description">A small blog about programming and stuff.</p>
                </div>
            </div>
        </header>

        <main role="main" class="container">
            <slot></slot>
        </main>

        <footer class="blog-footer">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col">© Tomas Tulka, NET21 s.r.o. </div>
                    <div class="col text-right">
                        <a href="/">Home</a> |
                        <a href="privacypolicy.html">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    `
})