// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { format } from 'timeago.js';
// import { useState, useEffect } from 'react';
// import axios from 'axios';


// const Card = ({ type, video }) => {
//     const [channel, setChannel] = useState([]);

//     useEffect(() => {
//         const fetchChannel = async () => {
//             try {
//                 const res = await axios.get(`https://youtubeclone-server.up.railway.app/api/users/find/${video.userId}`);
//                 setChannel(res.data);
//             } catch (error) {
//                 console.error("Error fetching videos:", error);
//             }
//         };
//         fetchChannel();
//     }, [video.userId]);

//     return (
//         <StyledLink to={`/video/${video._id}`}>
//             <Container type={type}>
//                 <Image src={video.imgUrl} />

//                 <Details type={type}>
//                     <ChannelImage
//                         type={type}
//                         src={channel.img} 
//                         alt="channel"
//                     />
//                     <Texts>
//                         <Title>{video.title}</Title>
//                         <ChannelName>{channel.name}</ChannelName>
//                         <Info>{video.views} views • {format(video.createdAt)}</Info>
//                     </Texts>
//                 </Details>
//             </Container>
//         </StyledLink>
//     );
// };

// export default Card;

// const Container = styled.div`
//     width: ${(props) => (props.type === "sm" ? "350px" : "330px")};
//     margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
//     cursor: pointer;
//     display: flex;
//     flex-direction: ${(props) => props.type === "sm" ? "row" : "column"};
// `;

// const Image = styled.img`
//     width: 100%;
//     height: ${(props) => props.type === "sm" ? "120px" : "202px"};
//     background-color: #999;
// `;

// const Details = styled.div`
//     display: flex;
//     margin-top: ${props => props.type !== "sm" && "16px"};
//     gap: 12px;
// `;

// const ChannelImage = styled.img`
//     width: 36px;
//     height: 36px;
//     border-radius: 50%;
//     background-color: #999;
//     display: ${(props) => props.type === "sm" && "none"};
// `;

// const Texts = styled.div``;

// const Title = styled.h1`
//     font-size: 16px;
//     font-weight: 500;
//     color: ${({ theme }) => theme.text};
// `;

// const ChannelName = styled.h6`
//     font-size: 14px;
//     color: ${({ theme }) => theme.text};
//     margin: 9px 0;
// `;

// const Info = styled.div`
//     font-size: 14px;
//     color: ${({ theme }) => theme.textSoft};
// `;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: inherit;
// `;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import axios from 'axios';

const Card = ({ type, video }) => {
    const [channel, setChannel] = useState(null);

    // Fetch channel details based on the video's userId
    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const res = await axios.get(`https://youtubeclone-server.up.railway.app/api/users/find/${video.userId}`);
                setChannel(res.data);
            } catch (error) {
                console.error("Error fetching channel data:", error);
            }
        };
        if (video.userId) {
            fetchChannel();
        }
    }, [video.userId]);

    return (
        <StyledLink to={`/video/${video._id}`}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} alt={video.title || "Video thumbnail"} />
                <Details type={type}>
                    {channel && (
                        <ChannelImage
                            type={type}
                            src={channel.img || "https://via.placeholder.com/36"}
                            alt={channel.name || "Channel avatar"}
                            // onError={(e) => (e.target.src = "https://via.placeholder.com/36")}
                        />
                    )}
                    <Texts>
                        <Title>{video.title || "Untitled Video"}</Title>
                        <ChannelName>{channel?.name || "Unknown Channel"}</ChannelName>
                        <Info>
                            {video.views} views • {format(video.createdAt)}
                        </Info>
                    </Texts>
                </Details>
            </Container>
        </StyledLink>
    );
};

export default Card;

// Styled Components
const Container = styled.div`
    width: ${(props) => (props.type === "sm" ? "350px" : "330px")};
    margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
    cursor: pointer;
    display: flex;
    flex-direction: ${(props) => (props.type === "sm" ? "row" : "column")};
    gap: ${(props) => (props.type === "sm" ? "15px" : "0")};
`;

const Image = styled.img`
    width: ${(props) => (props.type === "sm" ? "150px" : "100%")};
    height: ${(props) => (props.type === "sm" ? "110px" : "202px")};
    background-color: #999;
    object-fit: cover;
`;

const Details = styled.div`
    display: flex;
    margin-top: ${(props) => (props.type !== "sm" ? "16px" : "0")};
    gap: 12px;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
    display: ${(props) => (props.type === "sm" ? "none" : "block")};
`;

const Texts = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    margin: 0;
`;

const ChannelName = styled.h2`
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    margin: 9px 0 0 0;
`;

const Info = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.textSoft};
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
