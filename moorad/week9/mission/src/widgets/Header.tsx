import { CartIcon } from "../shared/constants/icons"
import styled from "styled-components"

const Header = ({ total }: { total: number }) => {
  return (
    <HeaderContainer>
      <div className="logo">Moorad Playlist</div>
      <div className="icon">
        <CartIcon></CartIcon>
        <div className="alarm">{total}</div>
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  width: 100%;
  top: 0;
  position: sticky;
  height: 4rem;
  background-color: skyblue;
  padding: 0rem 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > .logo {
    font-size: 2rem;
    color: white;
    position: relative;
  }

  & > .icon {
    width: 2.5rem;
    height: 2.5rem;

    & > .alarm {
      position: absolute;
      width: 2rem;
      height: 2rem;
      background-color: gray;
      opacity: 0.7;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      border-radius: 100%;
      top: 2px;
      right: 7rem;
    }
  }
`

export default Header
