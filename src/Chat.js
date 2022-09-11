import { Avatar } from '@mui/material';
import React from 'react';
import './Chat.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectImage } from './features/appSlice';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeago from 'react-timeago';
import { db } from './Firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = () => {
        if (!read) {
        dispatch(selectImage(imageUrl)) //passing the imageUrl
        updateDoc(
            doc(db, 'posts', id),
            {
            read: true,
            },
            {merge:true} //if we don't use merge then it will delete everything and just put read=true i.e overwrite
            // by using merge it edits just the read datafield to true i.e edit
        )
            navigate('/chats/view');
        }
    }

    return (
        <div onClick={open} className="chat">
            <Avatar className="chat__avatar" src={profilePic} />
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read && 'Tap to view -'}{' '}
                    <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
                </p>
            </div>

            {!read && <StopRoundedIcon className="chat__readIcon" />}
        </div>
    );
}

export default Chat;
