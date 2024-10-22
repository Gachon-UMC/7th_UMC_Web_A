// 값들은 {email: , password: } 이런식으로 객체 형태로 값들이 나온다

const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

// 이 함수는 우리가 input태그에 입력한 값들의 유효성 검사를 하는 함수를 만드는 부분
// 여기에는 error 메세지를 담고 있는 것 , email 이나 password가 틀렸을 때 나타날 에러 문구
function validateUser(values) {
    const errors = {
        email: "",
        password: "",
    };

    if (emailPattern.test(values.email) === false) {
        errors.email = "올바른 이메일 형식이 아닙니다. 다시 입력해주세요";
    }
    if (values.password.length < 8 || values.password.length > 16) {
        errors.password = "비밀번호는 8-16자 사이로 입력해주세요";
    }
    return errors;
}

function validateLogin(values) {
    return validateUser(values);
}
export { validateLogin };
