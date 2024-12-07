import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { axiosInstance } from "../apis/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import GetPostData from "./getPostData";

function createPost() {
    const [image, setImage] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<unknown>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const navigate = useNavigate();
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log(files);

        const uploadFile = files?.[0];
        console.log(uploadFile);

        if (uploadFile) {
            // FormData 객체 생성
            const formData = new FormData();
            formData.append("image", uploadFile); // 'image' 키에 파일 추가
            console.log(formData);

            try {
                // Axios를 사용하여 FormData 전송
                const response = await axiosInstance.post(
                    "/v1/common/image",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // 멀티파트 요청
                        },
                    }
                );

                setImageUrl(Object.values(response.data)[0]);
                if (typeof imageUrl === "string") {
                    console.log(Object.values(response.data)[0]);
                } else {
                    console.error(
                        "서버에서 반환된 데이터가 문자열이 아닙니다:",
                        response.data
                    );
                }

                console.log(imageUrl);

                // console.log(response.data); // 서버 응답 데이터 확인
            } catch (error) {
                console.error("파일 업로드 실패:", error);
            }
        } else {
            console.error("업로드할 파일이 없습니다.");
        }

        if (uploadFile) {
            const url = window.URL.createObjectURL(uploadFile);
            console.log(url);
            setImage(url);
        }
        console.log(uploadFile?.name);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };
    const a = async () => {
        const response = await axiosInstance.post("/v1/posts", {
            title: title,
            content: content,
            imageUrl: imageUrl,
        });
        console.log(response.data);
        navigate("/");
    };

    return (
        <div>
            <Modal isOpen={true}>
                <input placeholder="제목" onChange={handleTitleChange} />
                <input placeholder="내용" onChange={handleContentChange} />
                <input
                    placeholder="이미지 넣기"
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/png"
                />
                <img src={image} alt="추가된 이미지 입니다"></img>
                <button onClick={a}>게시물 생성하기</button>
                <button onClick={() => navigate("/")}>홈페이지로 이동</button>
            </Modal>
        </div>
    );
}
export default createPost;
