import React, { useState } from 'react'; 
import ChatHeader from '@/components/service/chatheader'; 
import ChatMessages from '@/components/service/chatmessage'; 
import ChatFooter from '@/components/service/chatfooter'; 
import { Message } from '@/components/service/types'; 
import '@/components/service/service.css'; 

// 定義 Service 組件
const Service = () => {
  // 定義狀態，用於儲存訊息、輸入的訊息和上傳狀態
  //指定了這個狀態是一個 Message 類型的陣列 並初始化為空陣列
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  // 處理輸入框文字變更的函數
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //指向觸發事件的元素(輸入框)
    setMessage(event.target.value); // 更新 message 狀態
  };

  // 處理訊息提交的函數
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 阻止頁面刷新
    if (message) {
      // 創建一個新的訊息物件
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        timestamp: new Date(),
        sender: 'user'
      };
      //展開運算符（...）用於展開陣列 messages的所有元素 創建了一個新的陣列 包含 messages 陣列中的所有元素
      setMessages([...messages, newMessage]); // 更新 messages 狀態
      setMessage(''); // 清空輸入框
    }
  };

  // 處理文件上傳的函數
  // 定義處理文件上傳的函數
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0]; // 獲取上傳的文件
    if (!file) return; // 如果沒有文件，則直接返回
  
    setUploading(true); // 更新上傳狀態為 true，表示開始上傳
  
    const reader = new FileReader(); // 創建 FileReader 物件
  
    reader.onloadend = () => {
      setUploading(false); // 上傳結束，更新上傳狀態為 false
      const newMessage: Message = {
        id: messages.length + 1, // 設置新的訊息 ID
        text: `Uploaded ${file.name}`, // 設置訊息文本，顯示文件名
        timestamp: new Date(), // 設置訊息的時間戳
        sender: 'user', // 設置發送者為用戶
        file, // 包含上傳的文件
        imageUrl: reader.result as string // 將文件內容作為圖片 URL
      };
      setMessages([...messages, newMessage]); // 更新 messages 狀態，添加新訊息
    };
  
    reader.readAsDataURL(file); // 開始讀取文件，讀取結果將觸發 onloadend 事件
  };

  return (
    <div className="chat-container"> 
      <ChatHeader /> {/* 聊天室標題 */}
      <ChatMessages messages={messages} /> {/* 訊息列表 */}
      <ChatFooter
        message={message} // 當前輸入的訊息
        handleMessageChange={handleMessageChange} // 處理輸入變更的函數
        handleSubmit={handleSubmit} // 處理提交的函數
        handleFileUpload={handleFileUpload} // 處理文件上傳的函數
        uploading={uploading} // 上傳狀態
      />
    </div>
  );
};

export default Service; 
