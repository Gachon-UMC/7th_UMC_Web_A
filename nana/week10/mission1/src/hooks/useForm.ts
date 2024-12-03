import { useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValue: T;                    // 초기값 객체
    validate: (values: T) => Partial<T>; // 유효성 검사 함수, 에러 객체 반환
}

interface UseFormReturn<T> {
    values: T;                          // 입력값 상태
    errors: Partial<T>;                 // 에러 상태
    touched: Record<keyof T, boolean>;  // 입력 필드의 터치 상태
    getTextInputProps: (name: keyof T) => {
        value: T[keyof T];              // 입력 필드 값
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 변경 이벤트
        onBlur: () => void;             // 포커스 해제 이벤트
    };
    setValues: React.Dispatch<React.SetStateAction<T>>; // 값 업데이트 함수
    resetForm: () => void; // resetForm 메서드를 반환 타입에 추가
}

function useForm<T extends Record<string, any>>({
    initialValue,
    validate,
}: UseFormProps<T>): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValue); // 값 상태
    const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>); 
    const [errors, setErrors] = useState<Partial<T>>(validate(initialValue)); // 초기 에러 상태

    // 입력값 변경 시 호출
    const handleChangeInput = (name: keyof T, value: T[keyof T]) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // 입력 필드에서 포커스 해제 시 호출
    const handleBlur = (name: keyof T) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    // 입력 필드 props 반환
    const getTextInputProps = (name: keyof T) => {
        const value = values[name];
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeInput(name, event.target.value as T[keyof T]);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur };
    };

    // 유효성 검사
    useEffect(() => {
        const newErrors = validate(values); // 유효성 검사 결과
        setErrors(newErrors);              // 에러 상태 업데이트
    }, [values, validate]);

    // 폼 초기화 함수
    const resetForm = () => {
        setValues(initialValue); 
        setTouched({} as Record<keyof T, boolean>);
        setErrors(validate(initialValue)); // 초기 값으로 에러 상태도 재설정
    };

    return { values, errors, touched, getTextInputProps, setValues, resetForm };
}

export default useForm;
