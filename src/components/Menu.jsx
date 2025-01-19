import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Menu = ({ darkMode, setDarkMode }) => {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('user'); // Adjust if using localStorage
  };

  return (
    <Container>
      <Wrapper>
        <StyledLink to="/">
          <Logo>
            <Img src="/public/images/logo.png" alt="logo" />
            YouTube_clone
          </Logo>
        </StyledLink>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <StyledLink to="/trends">
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </StyledLink>
        <StyledLink to="/subscriptions">
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </StyledLink>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />

        {currentUser && (
          <>
            <Button onClick={handleSignOut}>
              <AccountCircleOutlinedIcon /> SIGN OUT
            </Button>
            <Hr />
          </>
        )}


        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <StyledLink to="/signin">
                <Button>
                  <AccountCircleOutlinedIcon />SIGN IN
                </Button>
              </StyledLink>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF YOUTUBE</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsVolleyballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report history
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? 'Light' : 'Dark'} Mode
        </Item>
      </Wrapper>
    </Container>

  );
};

export default Menu;

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: fit-content;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  font-size: large;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  span {
    font-size: 16px;
  }
`;

const Login = styled.div`
  font-size: 12px;
  width: 112%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


