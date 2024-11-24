import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MovieType {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

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

// const Skeleton = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     width: 90px;
//     height: 250px;
//     border: 1px solid black;
//     overflow: hidden;
//     background-color: #e0e0e0;
//     animation: pulse 1.5s infinite ease-in-out;

//     & > div {
//         width: 100%;
//         height: 200px;
//         background-color: #c0c0c0;
//         border-radius: 10px;
//         margin-bottom: 10px;
//     }

//     & > span {
//         width: 80%;
//         height: 10px;
//         background-color: #c0c0c0;
//         border-radius: 5px;
//         margin: 5px 0;
//     }

//     @keyframes pulse {
//         0% {
//             background-color: #e0e0e0;
//         }
//         50% {
//             background-color: #c0c0c0;
//         }
//         100% {
//             background-color: #e0e0e0;
//         }
//     }
// `;

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
