import { useState, useRef, useEffect } from 'react'
import React from 'react'
import './App.css'
import userImage from './user.png';
import robotImage from './robot.png';
import Chatbot from './chatbot';




function ChatInput({ chatMessages, setChatMessages, barOnTop, setBarOnTop }) {
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
    <div className='chat-input-container'

      style={{
        marginTop: barOnTop ? '20px' : '20px',
        marginBottom: barOnTop ? '0px' : '20px',
      }}
    >
      <button
        onClick={() => setBarOnTop(prev => !prev)}
        className='bar-button'
      >
        Switch
      </button>
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className='chat-input'
      />
      <button
        style={{ pointerEvents: inputText === '' && 'none' }}
        onClick={sendMessage}
        className='bar-button'
        disabled={inputText === ''}
      >Send</button>
    </div>
  )
}

function ChatMessage({ message, sender, image }) {
  //const image = props.image;
  //const { message, sender, image } = props;

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src={robotImage} className='chat-message-profile' />
      )}
      <div className='chat-message-text'>
        {message}
      </div>
      {sender === 'user' && (
        <img src={userImage} className='chat-message-profile' />
      )}
    </div>
  )
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = React.useRef(null);

  React.useEffect(() => {
    const containerElem =
      chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      className='chat-messages-container'
      ref={chatMessagesRef}
    >

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
    </div>
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
  const [barOnTop, setBarOnTop] = useState(false);
  //const chatMessages = array[0];
  //const setChatMessages = array[1];


  return (
    <>
      <div
        className='app-container'
        style={{ display: 'flex', flexDirection: barOnTop ? 'column-reverse' : 'column' }}
      >
        <ChatMessages
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          barOnTop={barOnTop}
          setBarOnTop={setBarOnTop}
        />
      </div>
    </>
  )
}

export default App
