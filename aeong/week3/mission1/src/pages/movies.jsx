import styled from "styled-components";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  return (
    <Movies>
      <CategoriesContainer>
        <Category>카테고리</Category>
        <Link to="/movies/now-playing">
          <CategoryImage
            src="https://img.freepik.com/free-vector/flat-design-abstract-background_23-2149116112.jpg?ga=GA1.1.1977795800.1723247691&semt=ais_hybrid"
            alt="현재 상영중"
          />
        </Link>

        <Link to="/movies/popular">
          <CategoryImage
            src="https://img.freepik.com/free-vector/botanical-pattern-frame-beige-background_53876-115166.jpg?ga=GA1.1.1977795800.1723247691&semt=ais_hybrid"
            alt="인기있는"
          />
        </Link>

        <Link to="/movies/top-rated">
          <CategoryImage
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-abstract-doodle-background_23-2149320112.jpg?ga=GA1.1.1977795800.1723247691&semt=ais_hybrid"
            alt="높은 평가"
          />
        </Link>

        <Link to="/movies/up-coming">
          <CategoryImage
            src="https://img.freepik.com/free-vector/memphis-patterned-blue-background_53876-98999.jpg?ga=GA1.1.1977795800.1723247691&semt=ais_hybrid"
            alt="개봉 예정"
          />
        </Link>
      </CategoriesContainer>
    </Movies>
  );
};

export default MoviesPage;

const Movies = styled.h1`
  background-color: black;
  color: white;
  margin-left: 10px;
`;

const CategoriesContainer = styled.div``;

const Category = styled.div``;

const CategoryImage = styled.img`
  width: 192px;
  height: 108px;
  border-radius: 10px;
  margin: 10px;
`;
