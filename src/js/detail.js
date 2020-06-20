import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components'
import { MovieWrapper, MovieTitle, Footer } from './moviepage';

// styled-component
const DetailContainer = styled.div`
    @media (max-width: 4097px) {
        margin-left: 20%;
        display: flex;
        margin-top: 50px;
    }
    @media (max-width: 769px) {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
`;
const DetailPoster = styled.div`
    background-image: url(${props => props.img});
    height: 480px;
    width: 320px;
    background-repeat: no-repeat;
    background-position: center;
`;
const DetailData = styled.div`
    font-size: 30px;
    padding-left: 40px;
    padding-top: 40px;
    @media (max-width: 769px) {
        font-size: 25px;
        padding-top: 0;
    }
    @media (max-width: 426px) {
        font-size: 23px;
        padding-top: 0;
    }
`;
const DetailContext = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
`;
const DetailButton = styled.button`
    border: 1px solid black;
    margin-left: 40%;
    margin-top: 50px;
    trasform: translateX(-50%);
    height: 50px;
    width: 100px;
    border-radius: 30%;
    &:hover{
        background-color: #C0C0C0;
        cursor: pointer;
    }
    @media (max-width: 769px) {
        margin-top: 0;
    }
    @media (max-width: 426px) {
        margin-bottom: 10px;
    }
`;

const Detail = (path) => {
    const login = path.location.pathname.slice(1);
    const [data, setdata] = useState([]);
    const [isDetailLoading, setisDetailLoading] = useState(true);
    useEffect(() => {
        const fetchAPI = () => {
            fetch(`https://www.omdbapi.com/?i=${login}&apikey=69931bf9&plot=full`)
            .then(response => response.json())
            .then(response => {
                setdata(response);
            })
            .catch(error => {
              console.log(error);
            });
        }
        fetchAPI();
    }, [login]);
    useEffect(() => console.log(data),[data]);
    useEffect(() => {if(data.Title) setisDetailLoading(false)}, [data]);

    return (
        <div>
            { isDetailLoading ? <span>Loading...</span> :
                <MovieWrapper>
                    <MovieTitle>Moviepage</MovieTitle>
                    <DetailContainer>
                        <DetailPoster img={data.Poster}></DetailPoster>
                        <DetailData>
                            <DetailContext>電影名稱：{data.Title}</DetailContext>
                            <DetailContext>電影年份：{data.Year}</DetailContext>
                            <DetailContext>電影總長：{data.Runtime}</DetailContext>
                            <DetailContext>導演：{data.Director}</DetailContext>
                            <DetailContext>IMDB評分：{data.imdbRating}</DetailContext>
                        </DetailData>
                    </DetailContainer>
                    <Link to={{ pathname: `/`, }} >
                        <DetailButton>回上一頁</DetailButton>
                    </Link>
                    <Footer>Copyright (c) 李彥杰</Footer>
                </MovieWrapper>
            }
        </div>
    );
}

export default Detail;
