// props를 호출했을 때
const List = (props) => {
  console.log(props);
  return <li>{props.tech}</li>;
};
