import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const CategoryListPage = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <>
            <PageContainer>
                <h2 style={{ color: "white" }}>카테고리</h2>

                <SelectCategorydiv>

                    {/* 현재 상영중인 클릭 시 /category/now-playing 페이지로 이동 */}
                    <NowPlaying onClick={() => navigate('/category/now-playing')} style={{ cursor: 'pointer' }}>
                        <TextOverlay>현재 상영중인</TextOverlay>
                    </NowPlaying>

                    {/* 인기있는 클릭 시 /category/popular 페이지로 이동 */}
                    <Popular onClick={() => navigate('/category/popular')} style={{ cursor: 'pointer' }}>
                        <TextOverlay>인기있는</TextOverlay>
                    </Popular>

                    {/* 높이 평가를 받은 클릭 시 /category/top-rated 페이지로 이동 */}
                    <TopRated onClick={() => navigate('/category/top-rated')} style={{ cursor: 'pointer' }}>
                        <TextOverlay>높은 평가를 받은</TextOverlay>
                    </TopRated>
                    
                    {/* 개봉 예정중인 클릭 시 /category/up-coming 페이지로 이동 */}
                    <Upcoming onClick={() => navigate('/category/up-coming')} style={{ cursor: 'pointer' }}>
                        <TextOverlay>개봉 예정중인</TextOverlay>
                    </Upcoming>
                </SelectCategorydiv>
                <Outlet />
            </PageContainer>
        </>
    );
};

export default CategoryListPage;

const PageContainer = styled.div`
    margin-left: 30px;
`
const SelectCategorydiv = styled.div`
    display: flex;
    height: 150px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap; /* 화면이 작아지면 카드들이 자동으로 줄바꿈되게 함 */
`
const NowPlaying = styled.div`
    background-color: white;
    width: 300px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px; /* 카드의 둥근 모서리 */

    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3E2hS-Dpx9qIcUWN-ax9bEFlHQE2BUjv1vp4TB1hNVOFfCq2OEpT2kDnyBnFewr1mB38&usqp=CAU'); /* 배경 이미지 */
    background-size: cover; /* 이미지를 div 크기에 맞게 조정 */
    background-position: center; /* 이미지 가운데 맞춤 */
    position: relative;
`
const Popular = styled.div`
    background-color: white;
    width: 300px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px; /* 카드의 둥근 모서리 */

    background-image: url('data:image/jpeg;base64,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'); /* 배경 이미지 */
    background-size: cover; /* 이미지를 div 크기에 맞게 조정 */
    background-position: center; /* 이미지 가운데 맞춤 */
    position: relative;
`
const TopRated = styled.div`
    background-color: white;
    width: 300px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px; /* 카드의 둥근 모서리 */

    background-image: url('https://www.shutterstock.com/image-vector/rainbow-iridescent-holographic-gradient-background-260nw-2370421071.jpg'); /* 배경 이미지 */
    background-size: cover; /* 이미지를 div 크기에 맞게 조정 */
    background-position: center; /* 이미지 가운데 맞춤 */
    position: relative;
`
const Upcoming = styled.div`
    background-color: white;
    width: 300px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    border-radius: 10px; /* 카드의 둥근 모서리 */

    background-image: url('https://img.freepik.com/premium-vector/abstract-colorful-background-with-pink-yellow-gradient-effect-graphic-design-decoration_120819-473.jpg'); /* 배경 이미지 */
    background-size: cover; /* 이미지를 div 크기에 맞게 조정 */
    background-position: center; /* 이미지 가운데 맞춤 */
    position: relative;
`
const TextOverlay = styled.div`
    padding: 3px;
    background-color: rgba(0,0,0,0.6);
    border-radius: 5px; /* 카드의 둥근 모서리 */
    position: absolute;
    bottom: 7px;
    left: 10px;
    color: white;
    font-size: 12px;
    font-weight: bold;
`