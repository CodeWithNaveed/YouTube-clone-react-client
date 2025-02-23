import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`https://youtubeclone-server.up.railway.app/api/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </Container>
    );
};

export default Recommendation;


const Container = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-left: 24px;
    background-color: ${({ theme }) => theme.bgLighter};
    height: max-content;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    border-radius: 20px;
    
`;