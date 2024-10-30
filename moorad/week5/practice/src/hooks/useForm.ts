import { useState, useEffect } from "react";

const useForm = ({ initialValues, validate }) => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChangeInput = (name: string, value: string) => {
        setValues((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleBlur = (name: string) => {
        setTouched((prev) => {
            return {
                ...prev,
                [name]: true,
            };
        });
    };

    const getTextInputProps = (name) => {
        const value = values[name];
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return { values, touched, errors, getTextInputProps };
};

export default useForm;
