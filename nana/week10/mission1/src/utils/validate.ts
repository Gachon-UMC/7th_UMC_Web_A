// /utils/validate.ts

// 이메일 패턴 정규식
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

// 입력값 타입 정의
interface UserValues {
  email: string;
  password: string;
  passwordcheck: string;
}

// 유효성 검사 함수
function validateUser(values: UserValues) {
  const errors: { [key: string]: string } = {
    email: '',
    password: '',
    passwordcheck: ''
  };

  // 이메일 유효성 검사
  if (emailPattern.test(values.email) === false) {
    errors.email = '올바른 이메일 형식이 아닙니다. 다시 확인해주세요!';
  }

  // 비밀번호 길이 유효성 검사
  if (values.password.length < 8 || values.password.length > 16) {
    errors.password = '비밀번호는 8 ~ 16자 사이로 입력해주세요!';
  }

  // 비밀번호 확인 유효성 검사
  if (values.password !== values.passwordcheck) {
    errors.passwordcheck = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
}

// 로그인 시 유효성 검사 함수 (UserValues 타입을 받아 validateUser 호출)
function validateLogin(values: UserValues) {
  return validateUser(values);
}

export { validateLogin };
