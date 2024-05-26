// 定義一個 Message 接口，用於描述訊息的結構
export interface Message {
    id: number;
    text: string;
    timestamp: Date;
    sender: 'user' | 'system';
    file?: File;
    imageUrl?: string;
  }
  