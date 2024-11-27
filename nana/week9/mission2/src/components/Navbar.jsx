import styled from "styled-components";

import { useSelector } from "react-redux";
import { CartIcon } from "../constants/icons";

const Navbar = () => {
    const { amount } = useSelector((state) => state.cart);

    return (
        <Wrapper>
            <div className="nav-center">
                <h3>UMC PlayList</h3>
                <div className="nav-container">
                    <CartIcon />
                    <div className="amount-container">
                        <p className="total-amount">{amount}</p>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;

// css

const Wrapper = styled.nav`
    background: #6799FF;
    color: white;
    padding: 2rem 0;

    .nav-center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
    }

    h3 {
        margin: 0;
        font-size: 2rem;
    }

    .nav-container {
        display: flex;
        align-items: center;
        position: relative;
    }

    .amount-container {
        padding: 0 0.5rem;
        background: #8BBDFF;
        border-radius: 50%;
        color: white;
        font-size: 0.5rem;
        font-weight: bold;
        position: absolute;
        top: -5px;
        right: -5px;
    }
`;