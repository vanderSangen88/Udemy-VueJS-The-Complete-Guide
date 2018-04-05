<template>
    <div class="container">
   <div class="row">
     <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
       <h1>Movie Searcher</h1>
        <label for="moviesearch">Search in movies:</label>
        <div class="input-group">
          <input type="text" class="form-control" v-model="title" id="moviesearch">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="searchMovies">Go!</button>
          </span>
        </div>
     </div>
   </div>
   <div class="row mt-5">
     <!-- <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"> -->
       <!-- <ul class="list-group">
         <router-link class="list-group-item" 
                    v-for="movie in movieSearch" 
                    :key="movie.id"
                    :to="movie.imdbID"
                    tag="li"
                    >
            <a>
                {{ movie.Title }} ({{ movie.Year }})
            </a>
         </router-link>
       </ul> -->
        <div class="col col-sm-4" v-for="movie in movieSearch" :key="movie.id">

            <div class="card bg-light mb-3">
                <img class="card-img-top" 
                    :src="movie.Poster" 
                    :alt="movie.Title + ' [' + movie.Year + ']'">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.Title }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                    <router-link :to="'movie/' + movie.imdbID"
                        class="btn btn-primary">View Movie</router-link>
                </div>
            </div>

        <!-- </div> -->

       <div class="alert alert-danger" v-if="errorMessage">
         <p class="alert-text">{{ errorMessage }}</p>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
export default {
    props: {
        searchInit: {
            type: String
        }
    },
   data() {
    return {
      auth: "?apikey=5618957d",
      title: this.searchInit,
      movieSearch: [],
      errorMessage: "",
      resource: {}
    };
  },
  created() {
    const customActions = {
      searchMovie: {method: 'GET', url: '' + this.auth + '&s={title}' }
    };
    this.resource = this.$resource('', {}, customActions);
  },
  mounted() {
    this.searchMovies();
  },
  methods: {
    searchMovies() {
      this.resource.searchMovie({title: this.title})
      .then(response => {
          console.log("Promise succeeded!");
          return response.json();
        }, reject => {
          console.log("Promise failed...");
          return reject.json();
        })
      .then(data => {
          console.log(data);
          this.movieSearch = data.Search;
          this.errorMessage = data.Error;
      });
    }
  }
}
</script>

