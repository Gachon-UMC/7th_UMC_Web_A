import styled from "styled-components"
import { ChevronDown, ChevronUp } from "../shared/constants/icons"

interface ItemType {
  id: string
  title: string
  singer: string
  price: string
  img: string
  amount: number
}

const Item = ({
  item,
  onIncrease,
  onDecrease,
}: {
  item: ItemType
  onIncrease: () => void
  onDecrease: () => void
}) => {
  return (
    <ItemContainer id={item.id}>
      <div className="img_container">
        <img src={item.img} width={100} />
      </div>
      <div className="item_info">
        <div className="song_info">
          {item.title} | {item.singer}
        </div>
        <div className="price">₩ {item.price}</div>
      </div>
      <div className="count">
        <div className="icon" onClick={onIncrease}>
          <ChevronUp></ChevronUp>
        </div>
        <span>{item.amount}</span>
        <div className="icon" onClick={onDecrease}>
          <ChevronDown></ChevronDown>
        </div>
      </div>
    </ItemContainer>
  )
}

const ItemContainer = styled.div`
  width: 100%;
  height: 6rem;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;

  & > .img_container {
    display: flex;
    justify-content: center;
  }

  & > .item_info {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    font-weight: 700;

    & > .song_info {
      height: 50%;
      display: flex;
      align-items: center;
    }

    & > .price {
      height: 50%;
      display: flex;
      align-items: center;
    }
  }
  & > .count {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    & > .icon {
      width: 2rem;
      height: 2rem;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
`

export default Item
