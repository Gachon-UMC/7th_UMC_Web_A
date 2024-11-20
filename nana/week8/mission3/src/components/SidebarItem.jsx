// /components/SidebarItem.jsx
import React from 'react';
import styled from 'styled-components';

const SidebarItem = ({ icon: Icon, text, onClick }) => {
    return (
        <StyledItem onClick={onClick}>
            <Icon size={20} style={{ marginRight: '10px', position: 'relative', top: '5px' }} />
            {text}
        </StyledItem>
    );
};

export default SidebarItem;

const StyledItem = styled.div`
    margin-top: 20px;
    margin-left: 15px;
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    
    &:first-child {
        margin-top: 20px;
    }
    &:not(:first-child) {
        margin-top: 30px;
    }
`;
