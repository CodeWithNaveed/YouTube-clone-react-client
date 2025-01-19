import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = ({ darkMode, type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [ type ]);

  return (
    <Container darkMode={darkMode}>

      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
     
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px; /* gap between items */
  
  & > * {
    flex: 1 1 calc(33.33% - 20px); /* 3 items in a row, accounting for gap */
  }
`;

