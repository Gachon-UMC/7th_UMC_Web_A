import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../redux/TodoSlice'
import s from './InputTodo.module.css'

export default function InputTodo() {
    const dispatch = useDispatch()

    const [todolist, setTodolist] = useState({
        text: "", // id는 Redux에서 관리하도록 할 수 있습니다.
    })

    function handleText(e) {
        setTodolist(prevState => ({
            ...prevState,
            text: e.target.value
        }))
    }

    function onReset() {
        setTodolist({ text: "" })
    }

    return (
        <div className={s.InputTodo}>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (todolist.text !== "") {
                    dispatch(add(todolist.text)) // text만 보내기
                } else {
                    alert("할 일을 입력해주세요!")
                }
                onReset()
            }}>
                <div>
                    <input className={s.textbar} type="text"
                        value={todolist.text} onChange={handleText}></input>
                    <input className={s.submitbutton} type="submit" value="+" />
                </div>
            </form>
        </div>
    )
}
