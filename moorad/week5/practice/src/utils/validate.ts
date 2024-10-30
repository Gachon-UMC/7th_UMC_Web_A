const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const validateUser = (values) => {
    const errors = {
        email: "",
        password: "",
    };

    if (!emailPattern.test(values.email)) {
        errors.email = "올바른 이메일 형식이 아닙니다. 다시 확인해주세요 !";
    }

    if (values.password.length < 8 || values.password.length > 16) {
        errors.password = "비밀버호는 8 ~ 16자 사이로 작성해주세요 !";
    }
    return errors;
};

const validateLogin = (values) => {
    return validateUser(values);
};
export default validateLogin;
