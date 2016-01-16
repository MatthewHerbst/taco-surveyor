import createHistory from 'history/lib/createHashHistory';

let hashHistory = createHistory({
  queryKey: false
});

export default hashHistory;
