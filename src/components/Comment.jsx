import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`https://youtubeclone-server.up.railway.app/api/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };
    fetchChannel();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} alt="avatar" />
      <Details>
        <Name>
          {channel.name}
          <Date>2 days ago</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-size: 14px;
`;
