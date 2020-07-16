import {
  from,
  timer,
  Observer,
  Observable,
  interval,
  of,
} from 'rxjs';
import { map, take, finalize, mergeMap, tap } from 'rxjs/operators';
import log from './utils/logger';
import logger from './utils/logger';

const subcription = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 100]).pipe(
  take(10),
  map((v) => v + 1),
  map((v) => v.toString()),
  mergeMap((v) =>
    Observable.create((ob: Observer<string>) => {
      setTimeout(() => ob.next(v), 5000);
      setTimeout(() => ob.complete(), 5000);
    })
  ),
  tap((v) => logger.info(`has ${v}`)),
  mergeMap((v) =>
    Observable.create((ob: Observer<string>) => {
      setTimeout(() => ob.next(`the second ${v as string}`), 1000);
      setTimeout(() => ob.complete(), 5000);
    })
  ),
  tap((v) => logger.info(`has ${v}`)),
  finalize(() => logger.info('finally !'))
);
const subcription1 = subcription.subscribe({
  next: (v) => log.info(`final ${v}`),
  complete: () => logger.info('Complete !'),
});

const subcription2 = subcription.subscribe({
  complete: () => logger.info('Complete !'),
  next: (v) => log.info(`final ${v}`),
});

setTimeout(() => {
  subcription1.unsubscribe();
}, 3000);

setTimeout(() => {
  subcription2.unsubscribe();
}, 5000);
