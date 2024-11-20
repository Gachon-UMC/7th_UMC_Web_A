// import React from "react";
// import { useForm } from "react-hook-form";
// import { axiosInstance2 } from "../../../../week7/mission2/src/apis/axiosInstance2";
// const CreateTodo = () => {
//     const { register, handleSubmit } = useForm();
//     const onsubmit = async (data) => {
//         try {
//             const response = await axiosInstance2.post("/todo", {
//                 title: data.title,
//                 content: data.content,
//                 checked: data.checked,
//             });
//             console.log(response);
//             alert("데이터 저장 성공");
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     return (
//         <div>
//             <form onSubmit={handleSubmit(onsubmit)}>
//                 <input
//                     placeholder="제목을 입력해주세요"
//                     {...register("title")}
//                 ></input>
//                 <input
//                     placeholder="내용을 입력해주세요"
//                     {...register("content")}
//                 ></input>
//                 <button type="submit">todo생성</button>
//             </form>
//         </div>
//     );
// };

// export default CreateTodo;
