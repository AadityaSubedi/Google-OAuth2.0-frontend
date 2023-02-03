import logo from './logo.svg';
import './App.css';

import GoogleAuth from './components/GoogleSignIn';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
const CLIENTID = "1020532829824-8cir171h9s0426f122etjm7ai2795dsm.apps.googleusercontent.com"

function App() {


  return (
    <GoogleAuth />
  );
}

export default App;
