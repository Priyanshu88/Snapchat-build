import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import './App.css';
import Preview from './Preview';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
      onAuthStateChanged(auth,(authUser) => { //  for any point the auth state changes, do this
        if (authUser) {
          dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
          );
        }
        else { // if not logged in
          dispatch(logout());
        }
      })
    //
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? ( // if no user then direct to login page
          <Login />
        ) : (
            <> {/* can't have 2 adjacent elements so we use react fragment */}
              <img
                className='app__logo'
                src='https://logos-download.com/wp-content/uploads/2016/07/Snapchat_logo.png'
                alt=''
              />
              <div className='app__body'>
                <div className='app__bodyBackground'>
                  <Routes>        
                  <Route path="/" 
                    element={<WebcamCapture/>}>
                    </Route>
                    <Route path="/preview"
                      element={<Preview/>}>
                    </Route>
                    <Route path="/chats"
                      element={<Chats/>}>
                    </Route>
                    <Route path="/chats/view"
                      element={<ChatView/>}>
                  </Route>  

                </Routes>
                </div>
              </div>
              </>
        )
      }
        </Router>
      </div>
  );
};

export default App;
