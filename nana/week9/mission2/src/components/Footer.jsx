import styled from "styled-components";

const Footer = () => {
    return (
        <nav>
            <Wrapper style={{display: 'flex', justifyContent: 'center'}}>
                <h3>University MakeUs Challenge</h3>
            </Wrapper>
        </nav>
    )
}

export default Footer;

// css 

const Wrapper = styled.footer`
    background: #f4f4f4;
    padding: 1rem 0;
    text-align: center;

    h3 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: bold;
        color: #333;
    }
`;