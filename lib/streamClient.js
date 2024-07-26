import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance('t6k365qdufvz')

export const connect_user = async () => {
    await client.connectUser(
        {
          id: 'jlahey',
          name: 'Jim Lahey',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        'user_token',
      );
}

export const disconnect_user = async () => {
    await client.disconnectUser();
}