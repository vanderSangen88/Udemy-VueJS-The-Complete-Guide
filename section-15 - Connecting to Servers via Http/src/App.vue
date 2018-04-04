<template>
  <div class="container">
   <div class="row">
     <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
       <h1>Http</h1>
        <label for="moviesearch">Search in movies:</label>
        <div class="input-group">
          <input type="text" class="form-control" v-model="title" id="moviesearch">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="searchMovies">Go!</button>
          </span>
        </div>
     </div>
   </div>
   <div class="row">
     <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
       <ul class="list-group">
         <li class="list-group-item" v-for="movie in movieSearch" :key="movie.id">
           {{ movie.Title }} ({{ movie.Year }})
         </li>
       </ul>
       <div class="alert alert-danger" v-if="errorMessage">
         <p class="alert-text">{{ errorMessage }}</p>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: "?apikey=5618957d",
      title: "Avengers",
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
};
</script>

<style>

</style>
