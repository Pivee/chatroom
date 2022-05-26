import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  webSocketsServer: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = this.messagesService.create(createMessageDto);

    this.webSocketsServer.emit('updateMessageThread', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('joinChatroom')
  joinChatroom(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    const { username } = payload;

    return this.messagesService.joinChatroom(username, client.id);
  }

  @SubscribeMessage('showAsTyping')
  showAsTyping(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    const { isTyping } = payload;

    const username = this.messagesService.getUsernameByClient(client.id);

    client.broadcast.emit('showAsTyping', { username, isTyping });
  }
}
