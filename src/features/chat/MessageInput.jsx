import React, { useRef } from 'react';

const MessageInput = ({ onSend, onFile, replyTo, onCancelReply, onChangeTyping }) => {
  const inputRef = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    const v = inputRef.current.value.trim();
    if (!v) return;
    onSend(v);
    inputRef.current.value = '';
  };
  return (
    <form onSubmit={submit} className="tg-input">
      {replyTo && (
        <div className="tg-reply">
          Réponse à: {replyTo.content?.slice(0, 60)} <button type="button" onClick={onCancelReply}>x</button>
        </div>
      )}
      <input ref={inputRef} placeholder="Écrire un message" onChange={onChangeTyping} />
      <input type="file" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default MessageInput;


