import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

//styled-component
const ListContainer = styled.div`
    width: 100%;
    padding-left: 7%;
    padding-right: 7%;
    height: 300px;
`;
const ListTitle = styled.div`
    font-size: 25px;
`;
const ListCardContainer = styled.ul`
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-snap-points-x: repeat(3rem);
    display: flex;
    padding-top: 5px;
    table-layout: fixed;
`;
const ListCardStyle = styled.li`
    margin-right: 3px;
    margin-left: 3px;
    display: block;
    scroll-snap-align: center;
    height: 250px;
    min-width: 200px;
    background-image: url('${props => props.img}');
    background-repeat: no-repeat;
    background-position: center;
`;

const MovieList = (props) => {
    return (
        <ListContainer>
            <ListTitle>{props.title}</ListTitle>
            <ListCardContainer>
                {props.data.map((result, id) => 
                    <Link to={`/${result.imdbID}`} key={id}>
                        <ListCardStyle img={result.Poster}></ListCardStyle>
                    </Link>
                )}
            </ListCardContainer>
        </ListContainer>
    );
}

export default MovieList;