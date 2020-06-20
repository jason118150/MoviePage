import React, { useState, useEffect } from 'react';
import MovieList from './movielist';
import styled from 'styled-components'

//styled-component
export const MovieWrapper = styled.div`
    font-family: "IBM Plex Mono", Futura, sans-serif;
    min-width: 100%;
`;
export const MovieTitle = styled.div`
    width: 100%;
    height: 80px;
    font-size: 50px;
    @media(max-width: 4097px){
      padding-left: 5%;
      padding-top: 15px;
    }
    @media (max-width: 426px) {
      padding-left: 50%;
      transform: translateX(-40%);
    }
`;
export const Footer = styled.div`
    position: fixed;
    font-size: 18px;
    bottom: 0;
    right: 0;
    color: #C0C0C0;
    background-color: (0, 0, 0);
    margin-right: 20px;
    margin-bottom: 5px;
    @media (max-width: 426px) {
      display: none;
    }
`;

// const MovieBackground = styled.div`
//     position: fixed;
//     width: 100vw;
//     height: 100vh;
//     background: url('https://unsplash.com/photos/2uwFEAGUm6E') no-repeat center center fixed;
//     border: 1px solid black;
// `;

const Moviepage = () => {
  const [soonMovie, setsoonMovie] = useState([]); // 即將上映
  const [favoMovie, setfavoMovie] = useState([]); // 最喜愛
  const [nowMovie, setnowMovie] = useState([]);   // 正在上映
  const [isLoading, setisLoading] = useState(true); // 資料到了沒
  const PAGESIZE = 3; // 需要的資料數量

  useEffect(() => {
    const fetchOMDB = (pagesize) => {
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=69931bf9&s=love&type=movie&y=2019&page=${pagesize}`)
      .then(response => response.json())
      .then(response => {
        setsoonMovie(soonMovie => [...soonMovie, ...response.Search]);
      })
      .catch(error => {
        console.log(error);
      });
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=69931bf9&s=love&type=movie&y=2018&page=${pagesize}`)
      .then(response => response.json())
      .then(response => {
        setnowMovie(nowMovie =>[...nowMovie, ...response.Search]);
      })
      .catch(error => {
        console.log(error);
      });
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=69931bf9&s=love&type=movie&y=2017&page=${pagesize}`)
      .then(response => response.json())
      .then(response => {
        setfavoMovie(favoMovie => [...favoMovie, ...response.Search]);
      })
      .catch(error => {
        console.log(error);
      });
    }
    // 根據pagesize存取pagesize*10的資料
    for(let i = 1; i <= PAGESIZE; i++){
      fetchOMDB(i);
    }
  }, []);
  // 由於hook的set不同步，所以加入底下的useEffect確定state都已經更新完成
  useEffect(() => console.log(soonMovie),[soonMovie]);
  useEffect(() => console.log(favoMovie),[favoMovie]);
  useEffect(() => console.log(nowMovie),[nowMovie]);
  // 若API都順利存取完資料，就可以顯示Movie頁面
  useEffect(() => {
    if(soonMovie.length === PAGESIZE*10 && favoMovie.length === PAGESIZE*10 && nowMovie.length === PAGESIZE*10)
      setisLoading(false);
  }, [soonMovie.length, favoMovie.length, nowMovie.length]);
  return (
    <div>
    { isLoading ? <span>Loading...</span> :
      <MovieWrapper>
        <MovieTitle>Moviepage</MovieTitle>
        <MovieList title="近期上映" data={soonMovie} />
        <MovieList title="喜愛的電影" data={favoMovie} />
        <MovieList title="上映中電影" data={nowMovie} />
        <Footer>Copyright (c) 李彥杰</Footer>
      </MovieWrapper>
    }
    </div>
  );
}

export default Moviepage;
