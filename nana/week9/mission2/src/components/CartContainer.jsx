import styled from "styled-components";

import CartItems from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
    const { cartItems, total, amount } = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <header>
                <h2>당신이 선택한 음반</h2>
            </header>
            <div>
                {cartItems.map((item) => {
                    return <CartItems key={item.id} {...item} />;
                })}
            </div>
            <footer>
                <div className="cart-total">
                    <h4>
                        총 가격 <span>\ {total}원</span>
                    </h4>
                </div>
                <button className="btn clear-btn" 
                    onClick={() => { dispatch(openModal()); }}>
                    장바구니 초기화
                </button>
            </footer>
        </Wrapper>
    )
}
export default CartContainer;

// css

const Wrapper = styled.section`
    margin: 2rem auto;
    max-width: 50rem;

    header {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: bold;
    }

    .cart-items {
        margin-bottom: 2rem;
    }

    hr {
        margin: 1rem 0;
    }

    .cart-total {
        font-weight: bold;
        text-align: center;
    }

    .cart-total span {
        color: crimson;
    }

    .clear-btn {
        display: block;
        margin: 1.5rem auto;
        padding: 0.5rem 1.5rem;
        background: white;
        color: crimson;
        border-color: crimson;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
    }

    .clear-btn:hover {
        background: #F15F5F;
    }
`;