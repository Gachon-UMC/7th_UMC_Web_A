const Button = (props) => {
  return (
    <button className="add-button" type="submit" onClick={props.onClick}>
      {props.text}
    </button>
  );
};
export default Button;
