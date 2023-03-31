import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// https://www.learnrxjs.io/learn-rxjs/operators/combination/combineall
// When source observable completes use combineLatest with collected observables.

// emit every 1s, take 2
const sourceEmitter$ = interval(1000).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const exmpl$ = sourceEmitter$.pipe(
  map((val) =>
    interval(1000).pipe(
      map((i) => `Result (${val}): ${i}`),
      take(5)
    )
  )
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
exmpl$.pipe(combineAll()).subscribe(console.log);

/*
  output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
