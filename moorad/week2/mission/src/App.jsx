import { useState } from "react";

function App() {
    // 초기 상태로 '김용민', 26, '매튜'를 가진 person 객체를 초기값으로 생성합니다.
    const [person, setPerson] = useState({
        name: "김용민",
        age: 26,
        nickname: "매튜",
    });

    // city 값을 새로 추가하여 업데이트하는 함수
    const updateCity = () => {
        setPerson((prevPerson) => ({
            ...prevPerson, // 이전 person 객체의 복사본 생성
            city: "서울", // 새로 city 값을 추가하거나 업데이트
        }));
    };

    // age 값을 1씩 증가시키는 함수
    const increaseAge = () => {
        setPerson((prevPerson) => ({
            ...prevPerson, // 이전 person 객체의 복사본을 생성합니다.
            age: prevPerson.age + 1, // 다른 key의 value는 유지, age 값을 기존 값에서 1 증가
        }));
    };

    return (
        <>
            <h1>이름: {person.name}</h1>
            <h2>나이: {person.age}</h2>
            <h3>닉네임: {person.nickname}</h3>
            {person.city && <h4>도시: {person.city}</h4>}
            <button onClick={updateCity}>도시 추가</button>
            <button onClick={increaseAge}>나이 증가</button>
        </>
    );
}

export default App;
