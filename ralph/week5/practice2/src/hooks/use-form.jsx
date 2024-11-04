import { useEffect } from "react";
import { useState } from "react";
//재사용을 위해 hook으로 만들어 보면 좋을 거 같다
// 우리가 hook으로 만들어서 쓰려면 만약 우리가 email 과 password 말고 다른 데이터를 받을 때도 써야하기 때문에 email과 password 로 고정 시키지 말고 initialValue 로 값을 받아오자
function useForm({ initialValue, validate }) {
    const [values, setvalues] = useState(initialValue);

    // 사용자가 입력도 안했는데 에러 표시가 떠있으면 안되니까 그때 사용하는 것
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name, value) => {
        setvalues({
            ...values,
            [name]: value,
        });
    };

    const handleBlur = (name) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };
    // 여기서 name 이라는 건 email 이나 password 같은 것을 말함
    const getTextInputProps = (name) => {
        const value = values.name; // values[name]하고 같은 것
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name); // 이 함수를 실행하면 input 태그를 클릭 했는지 안했는지 boolean 형태로 나오게 됨
        return { value, onChange, onBlur };
    };

    useEffect(() => {
        const newErrors = validate(values);
        console.log(newErrors);

        setErrors(newErrors);
    }, [validate, values]);

    return { values, errors, touched, getTextInputProps };
}

export default useForm;
