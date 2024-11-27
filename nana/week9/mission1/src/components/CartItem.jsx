import styled from "styled-components";

import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "../constants/icons";
import { decrease, increase, removeItem } from '../features/cart/cartSlice';

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const dispatch = useDispatch();
    
    return (
        <Wrapper>
            <img src={img} alt={`${title} 이미지`} />
            <div className="details">
                <h4>
                {title} | {singer}
                </h4>

                <h4 className="item-price">\ {price}</h4>
            </div>
            <div>
                <button className="amount-btn" onClick={() => dispatch(increase(id))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>

                <button className="amount-btn" 
                    onClick={() => {
                        if(amount === 1){
                            dispatch(removeItem(id));
                            return;
                        }
                        dispatch(decrease(id));
                    }}
                >
                    <ChevronDown />
                </button>
            </div>
        </Wrapper>
    );
};

export default CartItem;

// css

const Wrapper = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;

    img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        object-fit: cover;
    }

    .details {
        flex: 1;
        margin-left: 1rem;
    }

    h4 {
        margin: 0.2rem 0;
    }

    .item-price {
        color: crimson;
        font-weight: bold;
    }

    .amount-controls {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .amount-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.5rem;
    }

    .amount {
        margin: 0.5rem 0.7rem;
        font-size: 1rem;
        font-weight: bold;
    }
`;