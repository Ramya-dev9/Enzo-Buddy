import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable()
export class ChatService {
  userName!: string;
  theme!: string;
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );
  constructor() {}

  conversation = new Subject<Message[]>();

  messageMap = {
    hi: "Hello",
    "who are you": "My name is Enzo Buddy, Your Virtual pet chat bot.",
    "what is angular": "Angular is an open-source web application framework maintained by Google and a community of developers. It is designed to build dynamic and interactive single-page applications (SPAs) efficiently. With Angular, developers can create robust, scalable, and maintainable web applications.",
    default: "I can't understand. Can you please repeat"
  };

  getBotAnswer(msg: string) {
    const userMessage = new Message("user", msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message("bot", this.getBotMessage(msg));

    setTimeout(() => {
      this.playAudio();
      this.conversation.next([botMessage]);
    }, 1500);
  }

  playFile(p0: string) {
    this.audioFile.play();
  }

  playAudio() {
    this.playFile("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3");
  }

  getBotMessage(question: string) {
    const modifiedQuestion = question.toLowerCase();
    let answer = this.messageMap[modifiedQuestion as keyof typeof this.messageMap];
    return answer || this.messageMap["default"];
  }
}
