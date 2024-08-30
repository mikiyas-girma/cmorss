import React, { useRef } from 'react';
import { Message } from '../../types';
import formatDate from '../../utils/timeFormatter';
/**
 * Render All received Messages
 * @returns
 */

const Messages: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // I think this useEffect in making the window horizontally because of the animation  

  // useEffect(() => {
  //   (() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   })();
  // }, [messages]);

  return (
    <div
      className="mb-2 flex flex-col gap-3 max-h-[390px] md:max-h-[500px] overflow-y-auto mt-1"
      id="container"
    >
      {messages.map((message, index) => (
        <div
          className={`rounded-md w-full px-2 py-1 shadow-lg flex flex-col ${
            index % 2 === 0 ? 'bg-slate-50' : 'bg-orange-100'
          }`}
          key={index}
        >
          <p className="px-2 text-[13px] mt-2 sm:text-base break-words hyphens-auto">
            {message?.text}
          </p>

          <p
            className={`py-1 text-[8px] sm:text-[10px] my-2 w-fit px-2 rounded-md self-end ${
              index % 2 === 0 ? 'bg-slate-200' : 'bg-white'
            }`}
          >
            <span className="font-semibold">Sent by {message?.name + '  '}</span>
            <span className="ml-2">{formatDate(message?.time)}</span>
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
