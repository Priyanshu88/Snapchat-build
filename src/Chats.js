import React, { useEffect, useState } from 'react';
import './Chats.css';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { auth, db } from './Firebase';
import Chat from './Chat';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from 'firebase/auth';


function Chats() {
  const user = useSelector(selectUser); //stores  the userdata in user variable
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    onSnapshot(query(collection(db, "posts"),
      orderBy("timestamp", "desc")),
      ((snapshot) => setPosts
        (
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )))
  }, []);

  const takeSnap = () => {
    //used by Radio button to direct to capture screen
    dispatch(resetCameraImage); //tp reset the camera image in the capture screen(viewfinder)
    navigate('/');
  }

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => signOut(auth)}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>

      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read }
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          ),
        )}
      </div>

      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
