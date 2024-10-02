const Input = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    />
  );
};

export default Input;
