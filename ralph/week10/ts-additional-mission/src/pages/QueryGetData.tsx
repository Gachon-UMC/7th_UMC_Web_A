// import React from "react";
// import { axiosInstance } from "../apis/axiosInstance";
// type LikedUser = {
//     user: {
//         id: number;
//         email: string;
//         role: string;
//     };
// };

// type Post = {
//     id: number;
//     authorId: number;
//     title: string;
//     likeCount: number;
//     dislikeCount: number;
//     content: string;
//     imageUrl: string | null;
//     createdAt: string;
//     updatedAt: string;
//     version: number;
//     likedUsers: LikedUser[];
// };

// type GetData = {
//     data: Post[];
//     nextCursor: string | null;
//     hasNextPage: boolean;
// };
// const QueryGetData = async (pageParam: number): Promise<GetData> => {
//     try {
//         const response = await axiosInstance.get(
//             `/v1/posts?cursor=${pageParam}`
//         );
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };
// export { QueryGetData };
