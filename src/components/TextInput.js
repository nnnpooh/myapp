function TextInput(props) {
  const { inputLabel, inputId, inputField, inputValue, setInputValue } = props;

  return (
    <div>
      <label htmlFor={inputId}>{inputLabel}</label>
      <input
        id={inputField}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
    </div>
  );
}

export default TextInput;
