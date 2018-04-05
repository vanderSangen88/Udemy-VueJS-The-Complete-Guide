<template>
<div class="container">
    <div class="row">
        <router-link to="/" class="mt-3">Back to Movie Searcher</router-link>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <div class="alert alert-danger mt-3" v-if="errorMessage">
                <p class="alert-text">{{ errorMessage }}</p>
            </div>

            <div class="card bg-light my-5">
                <img class="card-img-top" 
                    :src="movie.Poster" 
                    :alt="movie.Title + ' [' + movie.Year + ']'">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.Title }}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{ movie.Year }}</h6>
                    <p class="card-text">{{ movie.Plot }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
      return {
        auth: "?apikey=5618957d",
        imdbID: this.$route.params.imdbID,
        movie: {},
        errorMessage: ""
      }
  },
  created() {
    const customActions = {
      getMovie: {method: 'GET', url: '' + this.auth + '&i=' + this.imdbID }
    };
    this.resource = this.$resource('', {}, customActions);
  },
  mounted() {
    this.fetchMovie();
  },
  methods: {
      fetchMovie(){
        this.resource.getMovie()
        .then(response => {
            console.log("Promise succeeded!");
            return response.json();
            }, reject => {
            console.log("Promise failed...");
            return reject.json();
            })
        .then(data => {
            console.log(data);
            this.movie = data;
            this.errorMessage = data.Error;
        });
      }
  }
}
</script>
