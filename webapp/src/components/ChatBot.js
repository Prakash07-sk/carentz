import React, { useEffect } from 'react';
import { Widget, addResponseMessage, setQuickButtons, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { io } from 'socket.io-client';
import socketURL from '../services/ChatBotAPI';

export default function ChatBot() {
    const socket = io(socketURL, {path: "/chatbot-service/socket.io"});
    useEffect(() => {
        addResponseMessage('Welcome to this ***caRentz*** chat!');
        const buttonList = [{
            label: 'How to book a car?',
            value: 'How to book a car?'
        },
        {
            label: 'How to add my car?',
            value: 'How to add my car?'
        }];
        setQuickButtons(buttonList);
        socket.on('receive-chatbot-message', (recMessage) => {
            if (!recMessage) {
                addResponseMessage("Unable to get your query. Please send your query on below email");
                addLinkSnippet({
                    title: 'Email to',
                    link: 'mailto:carentz70@gmail.com',
                    target: '_blank'
                })
            }
            else {
                addResponseMessage(recMessage);
            }
        })
    }, [socket]);

    const handleNewUserMessage = (newMessage) => {

        socket.emit('send-chatbot-message', newMessage);

    };

    const handleButtonMessage = (newMessage) => {
        addUserMessage(newMessage)
        socket.emit('send-chatbot-message', newMessage);
    };

    return (
        <>
            <div>
                <Widget
                    handleNewUserMessage={handleNewUserMessage}
                    title="CARENTZ"
                    subtitle=""
                    emojis={true}
                    handleQuickButtonClicked={handleButtonMessage}

                />
            </div>
        </>
    )
}