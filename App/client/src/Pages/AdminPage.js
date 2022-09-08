import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider
 (
'https://jsonplaceholder.typicode.com'
 );
const App = () => <Admin dataProvider={dataProvider} />;

export default App;