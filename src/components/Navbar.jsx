import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { useSelector } from 'react-redux';
import Upload from './Upload';
import { useNavigate } from "react-router-dom";
import defaultavatar from "../assets/avatar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [userIcon, setUserIcon] = useState(null); // Initial state set to null

  useEffect(() => {
    if (currentUser && currentUser.img) {
      setUserIcon(currentUser.img); // Update when currentUser.img is available
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => q.trim() && navigate(`/search?q=${q.trim()}`)}
            />
          </Search>

          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
              {userIcon ? (
                <Avatar
                  src={userIcon}
                  alt="Avatar"
                  onError={(e) => (e.target.src = defaultavatar)} // Fallback if image fails
                />
              ) : (
                <PlaceholderAvatar /> // Placeholder while image is loading
              )}
              {currentUser.name}
            </User>
          ) : (
            <StyledLink to="/signin">
              <Button>
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </StyledLink>
          )}
        </Wrapper>
      </Container >
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

// Styled Components
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 8px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const PlaceholderAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ccc; 
`;