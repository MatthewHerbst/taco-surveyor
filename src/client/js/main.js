import React from 'react';
import {render} from 'react-dom';
import {Routes} from '../components';

//removeIf(production)
// Here we put our React instance to the global scope. Make sure you do not put
// it into production and make sure that you close and open your console if the
// DEV-TOOLS does not display TODO
window.React = React;
//endRemoveIf(production)

render(Routes, document.getElementById('app'));
