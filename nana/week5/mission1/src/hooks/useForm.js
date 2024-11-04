import { useEffect, useState } from "react";

function useForm({initialValue, validate}) {

  const [values, setValues] = useState(initialValue)

  const [touched, setTouched] = useState({})

  const [errors, setErrors] = useState(validate(initialValue))

  // 입력값이 변경될 때 호출되는 함수
  const handleChangeInput = (name, value) => {
    setValues({
        ...values,
        [name]: value
    });
  }

  // 입력 필드에서 포커스가 벗어날 때 호출되는 함수
  const handleBlur = (name) => {
    setTouched({
        ...touched,
        [name]: true
    })
  }

  // 입력 필드에 필요한 props을 반환하는 함수
  const getTextInputProps = (name) => {
    const value = values[name];
    const onChange = (event) => handleChangeInput(name, event.target.value);
    const onBlur = () => handleBlur(name);

    return {value, onChange, onBlur}
  }

  // 유효성 검사
  useEffect( () => {
    const newErrors = validate(values);   // validate 함수를 사용해 에러 객체 생성
    //console.log(newErrors);
    setErrors(newErrors);                 // 에러 상태 업데이트
  }, [values, validate]);

  return {values, errors, touched, getTextInputProps, setValues}
}

export default useForm;