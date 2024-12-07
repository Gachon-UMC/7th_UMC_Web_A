import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { axiosInstance } from "../apis/axiosInstance";

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
            // 이미지 미리보기를 위한 코드
            const preiewUrl = window.URL.createObjectURL(uploadFile);
            setImage(preiewUrl); // 이 코드가 없으면 이미지 추가하는 화면에 이미지가 안뜬다

            // 여기 부터는 이제 서버로 이미지를 보내기 위한 코드
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
                console.log(response?.data);

                // response.data 의 형태가
                //{imageUrl: 'aa5072da-874a-4633-a311-4e8e166343e6_1733590439672.png'} 이런식으로 나옴
                // 내가 필요한 부분은 문자열로 된 'aa5072da-874a-4633-a311-4e8e166343e6_1733590439672.png' 이 부분이기 때문에 다음과 같은 과정으로 분해시킴

                setImageUrl(Object.values(response.data)[0]);

                // console.log(Object.values(response.data));
                // console.log(Object.values(response.data)[0]);

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
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleCreatePost = async () => {
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
                <button onClick={handleCreatePost}>게시물 생성하기</button>
                <button onClick={() => navigate("/")}>홈페이지로 이동</button>
            </Modal>
        </div>
    );
}
export default createPost;
