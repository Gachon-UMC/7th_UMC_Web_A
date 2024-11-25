import React from 'react';
import styled from 'styled-components';

const CastList = ({ credits }) => {
    return (
      <List>
        {(credits?.cast || []).map((cast) => (
          <ListItem key={cast.id}>
            {cast.profile_path ? (
              <Image 
                src={`https://image.tmdb.org/t/p/w1280${cast.profile_path}`} 
                alt={cast.name} 
              />
            ) : (
              <ImagePlaceholder />
            )}
            <Name>{cast.name}</Name>
            <Role>{cast.character}</Role>
          </ListItem>
        ))}
      </List>
    );
  };
  

export default CastList;

// 출연진 목록 스타일
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  min-height: 100%;
  justify-content: left;
`;

const ListItem = styled.li`
  margin: 20px;
  text-align: center;
`;

const Name = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const Role = styled.p`
  margin: 0;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #212121;
`;

const ImagePlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #212121;
`;
