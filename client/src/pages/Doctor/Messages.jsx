import React, { useEffect, useState } from 'react';
import doctorApi from '../../services/doctorApi';
import './DoctorPages.css';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await doctorApi.getMessages();
        setConversations(response.data.conversations || []);
        setActiveId(response.data.conversations?.[0]?.id || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const activeConversation = conversations.find((conv) => conv.id === activeId);

  const handleSend = () => {
    if (!message.trim() || !activeConversation) return;
    const nextMessage = {
      id: `msg-${Date.now()}`,
      from: 'doctor',
      content: message.trim(),
      timestamp: new Date(),
    };
    setConversations((prev) =>
      prev.map((conv) => (conv.id === activeId ? { ...conv, messages: [...conv.messages, nextMessage], lastMessage: message.trim() } : conv))
    );
    setMessage('');
  };

  return (
    <div className="doctor-page messages-page">
      <section className="page-heading">
        <div>
          <p className="page-subtitle">Messages</p>
          <h2 className="page-title">Patient conversations</h2>
          <p className="page-description">Review messages, attach reports, and keep patient communication secure.</p>
        </div>
      </section>

      {loading ? (
        <div className="empty-state">Loading conversations…</div>
      ) : (
        <div className="messages-layout">
          <aside className="messages-sidebar">
            <div className="panel-header">
              <div>
                <p className="panel-title">Conversations</p>
                <p className="panel-subtitle">Recent patient chats.</p>
              </div>
            </div>
            <div className="message-list">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`message-card ${activeId === conversation.id ? 'active' : ''}`}
                  onClick={() => setActiveId(conversation.id)}
                >
                  <div className="message-card-avatar">
                    <img src={conversation.patient.avatar} alt={conversation.patient.name} />
                  </div>
                  <div>
                    <p className="message-card-name">{conversation.patient.name}</p>
                    <p className="message-card-preview">{conversation.lastMessage}</p>
                  </div>
                  <span className="message-unread">{conversation.unread}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="messages-chat">
            {activeConversation ? (
              <>
                <div className="panel-header">
                  <div>
                    <p className="panel-title">{activeConversation.patient.name}</p>
                    <p className="panel-subtitle">Online status: {activeConversation.patient.online ? 'Active' : 'Offline'}</p>
                  </div>
                </div>
                <div className="chat-window">
                  {activeConversation.messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.from === 'doctor' ? 'sent' : 'received'}`}>
                      <p>{msg.content}</p>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))}
                </div>
                <div className="chat-actions">
                  <button className="button-secondary" type="button">Attach report</button>
                  <div className="chat-input-row">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button className="button-primary" type="button" onClick={handleSend}>
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">Select a conversation to start messaging.</div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default Messages;
