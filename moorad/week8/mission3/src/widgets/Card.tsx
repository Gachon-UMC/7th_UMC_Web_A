import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MovieType } from "../shared/\btypes";

const imgURL = "https://image.tmdb.org/t/p/w200";

const Card = ({ movie }: { movie: MovieType }) => {
    const navigate = useNavigate();

    return (
        <CardContainer onClick={() => navigate(`/movies/${movie.id}`)}>
            <img src={`${imgURL}/${movie.poster_path}`} alt={movie.title} />
            <CardInfo>
                <div>{movie.title}</div>
                <div>{movie.release_date}</div>
            </CardInfo>
        </CardContainer>
    );
};

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center
    width: 90px;
    height: 250px;
    border: 1px solid black;
    overflow:hidden;
    cursor:pointer;

    &>img{
        width:100%;
        height:200px;
        border-radius: 10px;
    }
`;

const CardInfo = styled.footer`
    display: flex;
    flex-direction: column;
    height: 50px;

    & > div {
        border: 1px solid black;
        width: 100%;
        display: flex;
        align-items:center
        // img요소의 크기를 뺀 값의 50%
        height: 50%;
        color:white;
        white-space:nowrap;
    }
    &>div:first-child{
        font-size:15px;
    }
    &>div:last-child{
        font-size:12px;
    }
`;
export default Card;
