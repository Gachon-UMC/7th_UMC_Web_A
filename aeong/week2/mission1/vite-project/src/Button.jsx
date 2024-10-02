const Button = (props) => {
  return (
    <button type="submit" onClick={props.onClick}>
      {props.text}
    </button>
  );
};
export default Button;
