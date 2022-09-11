import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import "./ChatView.css";
import { selectSelectedImage } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from 'react-redux';



function ChatView() {
    
    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    //to prevent from loading this page if no image is selected

    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage]);
    

    const exit = () => {
        navigate('/chats',{replace:true});
    }

    return (
        <div className='chatView'>
            <img src={selectedImage} onClick={exit} alt="" />
            <div className='chatView__timer'>
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        "#004777",
                        "#F7B801",
                        "#A30000",
                        '#A30000'
                    ]}
                    colorsTime={[10,6,3,0]}    
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit();
                        }
                        return remainingTime;
                    }}
                </CountdownCircleTimer>

            </div>


        </div>
    );
};

export default ChatView;
