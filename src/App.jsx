import { useState, useRef, useEffect } from 'react'
import React from 'react'
import './App.css'
import userImage from './user.png';
import robotImage from './robot.png';
import Chatbot from './chatbot';




function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = React.useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }


  return (
    <div className='chat-input-container'>
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className='chat-input'
      />
      <button
        onClick={sendMessage}
        className='send-button'
      >Send</button>
    </div>
  )
}

function ChatMessage({ message, sender, image }) {
  //const image = props.image;
  //const { message, sender, image } = props;

  return (
    <div>
      {sender === 'robot' && (
        <img src={robotImage} width="50" />
      )}
      {message}
      {sender === 'user' && (
        <img src={userImage} width="50" />
      )}
    </div>
  )
}

function ChatMessages({ chatMessages }) {
  return (
    <>

      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          );
        })
      }
    </>
  )
}


function App() {
  const [chatMessages, setChatMessages] = React.useState([{
    message: 'hello chatbot',
    sender: 'user',
    id: 'id1'
  }, {
    message: 'Hello! How can I help you?',
    sender: 'robot',
    id: 'id2'
  }, {
    message: 'can you get me todays date?',
    sender: 'user',
    id: 'id3'
  }, {
    message: 'Today is September 29',
    sender: 'robot',
    id: 'id4'
  }
  ]);
  //const chatMessages = array[0];
  //const setChatMessages = array[1];


  return (
    <div className='app-container'>
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatMessages
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
