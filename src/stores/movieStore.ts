import { BehaviorSubject } from 'rxjs';

const movieSubject = new BehaviorSubject([]);

function updateMovies(newMovies: any[]) {
  movieSubject.next(newMovies);
}

export { movieSubject, updateMovies };