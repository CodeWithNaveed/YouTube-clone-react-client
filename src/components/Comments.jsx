import React from 'react';
// import channelImage from '../../public/images/channel-image.png';
import styled from 'styled-components';
import Comment from './Comment';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [videoId]);

    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser.img} alt="Channel Avatar" />
                <Input placeholder="Add a comment..." />
            </NewComment>
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </Container>
    );
};

export default Comments;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  padding: 5px;
  width: 100%;
  font-size: 14px;
`;

