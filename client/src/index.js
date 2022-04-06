import React from 'react';
// import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client'
import App from './App';
import { ContextProvider } from './context/Context';


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById('root');

// 18. ContextProvider로 context를 줄 컴포넌트 감싸기 -> App을 감싸게 되면 모든곳에서 사용가능
const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App callback={() => console.log("rendered")}/>
    </ContextProvider>
  </React.StrictMode>
);