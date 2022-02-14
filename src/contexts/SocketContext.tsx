import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
  FC,
} from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<any | null>(null);

export const SocketProvider: FC<ISocketContext> = ({ socket, children }) => {
  const [messageBox, setMessageBox] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [listenerStatus, setListenerStatus] = useState<any>(null);
  const [toastAlert, setToastAlert] = useState<string | null>(null);

  useEffect(() => {
    const interval1 = setInterval(() => setListenerStatus(''), 5000);
    return () => {
      clearInterval(interval1);
    };
  }, []);

  useEffect(() => {
    socket.on('chat:text:typing-listener', data => {
      setListenerStatus(`${data.username} yazıyor...`);
    });
    socket.on('chat:new-message:text', (data: any) => {
      setMessageBox(MessageList => MessageList.concat(data.data));
    });
    socket.on('chat:new-message:image', data => {
      setMessageBox(MessageList => MessageList.concat(data.data));
    });
    socket.on('chat:new-message:video', data => {
      setMessageBox(MessageList => MessageList.concat(data.data));
    });
    socket.on('chat:new-message:audio', data => {
      setMessageBox(MessageList => MessageList.concat(data.data));
    });
    socket.on('chat:new-message:pdf', data => {
      setMessageBox(MessageList => MessageList.concat(data.data));
    });
    socket.on('client:get-users', data => {
      setOnlineUsers(data);
    });
    socket.on('chat:message:mark-seen', data => {
      // map element, map messageBox
      const dataObj: any = [];
      data.data.forEach((element: any) => {
        const tmpObj = { [element.id]: element.seen_users };
        dataObj.push(tmpObj);
      });
      // mutate old messages
      console.log(messageBox);
    });

    socket.emit('chat:get-users');
  }, [socket]);

  const joinRoom = useCallback(
    action => {
      socket.emit('user:join-room', action.payload, (data: any) => {
        console.log(`join room callback: ${data}`);
      });
    },
    [socket],
  );

  const leaveRoom = useCallback(
    action => {
      socket.emit('user:leave-room', action.payload, (data: any) => {
        console.log(`leave room callback: ${data}`);
      });
    },
    [socket],
  );

  const sendChatMessage = useCallback(
    (action: ITextMessageAction) => {
      setToastAlert('Mesajınız gönderiliyor..');

      socket.emit('chat:text:send-message', action.payload, (data: any) => {
        console.log(data);
        toastCleaner();
      });
    },
    [socket],
  );

  const sendChatFile = useCallback(
    (action: IFileMessageAction) => {
      setToastAlert('Mesajınız gönderiliyor..');

      // setTimeout(() => {
      socket.emit('chat:file:send-message', action.payload, (data: any) => {
        console.log(data);
        toastCleaner();
      });
      // }, 5000);
    },
    [socket],
  );

  const typeText = useCallback(
    (action: any) => {
      socket.emit('chat:text:typing', action, (data: any) => {
        console.log(data);
      });
    },
    [socket],
  );

  const markAsSeen = useCallback(
    (action: any) => {
      socket.emit('chat:message:seen', action.payload, (data: any) => {
        console.log(data);
      });
    },
    [socket],
  );

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  const emptyMessageBox = useCallback(() => {
    setMessageBox([]);
  }, [socket]);

  const toastCleaner = () => {
    setToastAlert(null);
  };

  return (
    <SocketContext.Provider
      value={{
        sendChatMessage,
        messageBox,
        listenerStatus,
        joinRoom,
        leaveRoom,
        sendChatFile,
        typeText,
        onlineUsers,
        disconnectSocket,
        toastAlert,
        emptyMessageBox,
        markAsSeen,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketValue = () => useContext(SocketContext);

interface ISocketContext {
  socket: Socket;
  children: React.ReactNode;
}

interface ITextMessage {
  name: string;
  room: string;
  content: string;
  userjwt: string;
}

interface ITextMessageAction {
  payload: ITextMessage;
}

interface IFileMessage {
  name: string;
  room: string;
  content: string;
  type: string;
  filename: string;
  fileextension: string;
  userjwt: string;
  ismobile: boolean;
}

interface IFileMessageAction {
  payload: IFileMessage;
}
