import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render
(
    <App />
);

// - ReactDOM.createRoot(document.getElementById('root'))를 통해 root라는 Root 엘리먼트를 생성
//마지막으로, root.render(element)를 호출하여 element를 root에 렌더링합니다. 이로써 컴포넌트가 root에 렌더링되어 화면에 나타나게 됩니다
// document에서 id가 root인 곳에서 요소를 가져와서 당신이 브라우저 DOM 노드 안에 리액트 컴포넌트들을 보여주도록 하기 위해서 root를 만들수 있도록 해서 
//당신이 브라우저 DOM 노드 안에 리액트 컴포넌트들을 보여주도록 하기 위해서 root를 만들수 있도록 합니다
/**
 * @param
 */