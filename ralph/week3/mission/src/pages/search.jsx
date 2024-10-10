import styled from "styled-components";

const search= ()=> {
  return (
    <div style={{
      position:"static"  // 부모 노드 
    }}> 
    <SearchDiv>검색페이지 야호~</SearchDiv>
  </div>  
  );
}

export default search;


//css
const SearchDiv = styled.div`
width:91.5%;
height:86%;
background-color:black;
position:absolute;
top:100px;
left:100px;
color:white;
font-size:30px;
padding-left:5px;
padding-top:5px;
`;