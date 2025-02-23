import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments';
import {
  ThumbUp,
  ThumbUpOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  AddTaskOutlined,
  ReplyOutlined
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import { fetchSuccess, like, dislike } from '../redux/videoSlice';
import { Subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`https://youtubeclone-server.up.railway.app/api/videos/find/${path}`);
        const channelRes = await axios.get(`https://youtubeclone-server.up.railway.app/api/users/find/${videoRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("access_token"); 

      await axios.put(
        `https://youtubeclone-server.up.railway.app/api/users/like/${currentVideo._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );

      dispatch(like(currentUser.id)); 
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("access_token"); 

      await axios.put(
        `https://youtubeclone-server.up.railway.app/api/users/dislike/${currentVideo._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );

      dispatch(dislike(currentUser.id)); 
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Token get karo

      const apiUrl = currentUser.subscribedUsers.includes(channel._id)
        ? `https://youtubeclone-server.up.railway.app/api/users/unsub/${channel._id}`
        : `https://youtubeclone-server.up.railway.app/api/users/sub/${channel._id}`;

      await axios.put(
        apiUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true, 
        }
      );

      dispatch(Subscription(channel._id)); 
    } catch (err) {
      console.error("Error subscribing/unsubscribing:", err);
    }
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (!currentUser) {
    return <ErrorContainer>You must be logged in to watch videos.</ErrorContainer>;
  }

  if (!currentVideo) {
    return <ErrorContainer>Video not found!</ErrorContainer>;
  }

  if (!channel) {
    return <ErrorContainer>Channel not found!</ErrorContainer>;
  }



  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame autoPlay controls src={currentVideo.videoUrl} />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo.views} views • {format(currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.likes?.includes(currentUser.id) ? <ThumbUp /> : <ThumbUpOutlined />}
              {currentVideo.likes?.length || 0}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser.id) ? <ThumbDown /> : <ThumbDownOffAltOutlined />}
              {currentVideo.dislikes?.length || 0}
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} alt="Channel logo" />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{channel.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe
            onClick={handleSubscribe}
            style={{ background: currentUser.subscribedUsers?.includes(channel._id) ? "#b5b5b563" : "#ff000094" }}
          >
            {currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  margin-bottom: 20px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  color: white;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: red;
`;
