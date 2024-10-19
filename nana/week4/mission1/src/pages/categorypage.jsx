// categorypage.jsx
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const CategoryPage = () => {
    return (
        <>
            {/* 카테고리 페이지 outlet 정의 */}
            <PageContainer>
                <Outlet />
            </PageContainer>
        </>
    );
};

export default CategoryPage;


const PageContainer = styled.div`
    margin-left: 30px;
`
