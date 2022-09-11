import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import "./Preview.css";
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import {v4 as uuid} from "uuid";
import { db, storage } from './Firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { selectUser } from './features/appSlice';
import { ref, uploadString, getDownloadURL, uploadBytesResumable } from "firebase/storage";



function Preview() {

    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if(!cameraImage) {
            navigate("/",{replace:true});
        }
    }, [cameraImage, navigate]);

    const closePreview = () =>  {
        dispatch(resetCameraImage());
        
    };

    const sendPost = () => {
        const id = uuid();
        const metadata = {
            contentType: 'image/jpeg'
        };
        const storageRef = ref(storage, `posts/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, cameraImage, metadata);

        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                // error function
                console.log(error);

            },
            () => {
                // complete function
                uploadString(storageRef, cameraImage, 'data_url')
                    .then((snapshot) => {
                        getDownloadURL(storageRef).then((url) => {
                            addDoc(collection(db, 'posts'), {
                                imageUrl: url,
                                username: user.username,
                                profilePic: user.profilePic,
                                read: false,
                                timestamp: serverTimestamp()
                            });
                            navigate('/chats', { replace: true })
                        });
                    }
                );
            }
        );
    };


    return (
        <div className='preview'>
            <CloseIcon onClick={closePreview} className="preview__close" />
            <div className='preview__toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendIcon" />
            </div>
        </div>
    );
}

export default Preview;
