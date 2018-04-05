import Home from './components/Home.vue';
import Movie from './components/Movie.vue';

export const routes = [
    { path: '', component: Home }, 
    { path: '/movie/:imdbID', component: Movie }
];