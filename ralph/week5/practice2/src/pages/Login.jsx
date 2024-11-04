import { useState } from "react";
import styled from "styled-components";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utils/validate";
const Login = () => {
    // const [values, setvalues] = useState({
    //     email: "",
    //     password: "",
    // });

    // // 사용자가 입력도 안했는데 에러 표시가 떠있으면 안되니까 그때 사용하는 것
    // // input 태그 영역을 한번 클릭한 뒤에 바깥영역을 클릭해야 ture 값으로 변경됨
    // //이게 결국 사용자가 input 태그를 클릭했다는 뜻이므로 이 이후에 유효성 검사를 해서 에러 표시를 해주면 됨
    // const [touched, setTouched] = useState({
    //     email: "false",
    //     password: "false",
    // });
    // console.log(touched);

    // const [errors, setErrors] = useState({
    //     email: "false",
    //     password: "false",
    // });
    // value : 값들 , input change 값 , event.target.value
    // const handleChangeInput = (name, value) => {
    //     setvalues({
    //         ...values,
    //         [name]: value, // 여기서 name은 values안에 있는 email 이나 password 값이다. 그건 아래 return 문에서 무엇을 반환할 때 함수를 쓸건지에 따라 달라진다
    //     });
    // };

    // const handleBlur = (name) => {
    //     setTouched({
    //         ...touched,
    //         [name]: true,
    //     });
    // };

    const login = useForm({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateLogin,
    });

    const handlePressLogin = () => {
        console.log(login.values.email, login.values.password);
    };
    return (
        <form>
            <input
                type="email"
                placeholder="이메일을 입력해주세요"
                {...login.getTextInputProps("email")}
            />
            {login.touched.email && login.errors.email && (
                <p style={{ color: "red" }}>{login.errors.email}</p>
            )}
            <input
                type="password"
                placeholder="비밀번호 입력해주세요"
                {...login.getTextInputProps("password")}
            />
            {login.touched.password && login.errors.password && (
                <p style={{ color: "red" }}>비밀번호를 다시 입력해주세요</p>
            )}
            <button onClick={handlePressLogin}>로그인</button>
        </form>
    );
};
export default Login;

//css
