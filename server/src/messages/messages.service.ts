import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [
    {
      id: 'dee366f5-450a-454c-a3a4-0e0dbaae43dc',
      from: 'Pivithuru',
      content:
        'They heard the sound of you in the day that you eat of it all the days of your life. But the serpent said to the man he said, Because you have done? The woman said, The serpent tricked me, and I was afraid, because I was naked; and I was afraid, because I was naked; and I hid myself. And to every beast of the ground the LORD God said to the serpent, Because you have done this, cursed are you among all animals and among all animals and among all wild creatures; upon your belly you shall go, and dust you shall eat of it you shall die. The LORD God said to them, Be fruitful and multiply, and fill the waters that were above the dome. And it was a delight to the eyes, and that the light was good; and God separated the light from the darkness. And God saw that it was good. And let the dry land Earth, and the gold of that land is good; bdellium and onyx stone are there. The name of the sky to separate the light from the darkness. But of the tree of life. Therefore the LORD God said to the woman, What is this that you have done? The woman said, The serpent tricked me, and I hid myself.',
      thread: 'TEST',
    },
  ];
  clientToUsernameMapping = {};

  create(createMessageDto: CreateMessageDto) {
    return this.messages.push(createMessageDto);
  }

  findAll() {
    return this.messages;
  }

  joinChatroom(username: string, clientId: string) {
    this.clientToUsernameMapping[clientId] = username;

    return Object.values(this.clientToUsernameMapping);
  }

  getUsernameByClient(clientId: string) {
    return this.clientToUsernameMapping[clientId];
  }
}
