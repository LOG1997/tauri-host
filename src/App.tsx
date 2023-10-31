import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import { RouterProvider,HashRouter } from 'react-router-dom';

import  Router  from '@/router';
// import { AliveScope } from 'react-activation';
function App() {
  return (
    <HashRouter>
      <Router></Router>
    </HashRouter>
  );
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  // return (
  //   <div className="container">
  //     <h1 className="text-blue-500">Welcome to Tauri!</h1>

  //     <div className="row">
  //       <div className="i-logos-react text-8xl hover:drop-shadow-xl"></div>
  //       <div className="i-logos-tauri text-8xl"></div>
  //       <div className="i-logos-vitejs text-8xl"></div>
  //     </div>

  //     <p>Click on the Tauri, Vite, and React logos to learn more.</p>

  //     <div className="row">
  //       <form
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           greet();
  //         }}
  //       >
  //         <input
  //           id="greet-input"
  //           onChange={(e) => setName(e.currentTarget.value)}
  //           placeholder="Enter a name..."
  //         />
  //         <button type="submit">Greet</button>
  //       </form>
  //     </div>
  //     <p>{greetMsg}</p>
  //   </div>
  // );
}

export default App;
