declare module 'stringee-react-native' {
    export interface Stringee {
      joinRoom(roomId: 'room-vn-1-Q8RAFIFXCT-1696890321941'): Promise<void>;
    }
  
    export function createStringee(): Stringee;
  }