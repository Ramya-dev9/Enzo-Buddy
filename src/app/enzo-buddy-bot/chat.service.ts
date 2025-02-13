import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

export class Message {
  constructor(public author: string, public content: string, public link?: string) {}
}

@Injectable()
export class ChatService {
  userName!: string;
  theme!: string;
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  constructor(private http: HttpClient) {}

  conversation = new Subject<Message[]>();

  messageMap = {
    hi: "Hello",
    "who are you": "My name is Enzo Buddy, Your Virtual pet chat bot.",
    "what is angular": "Angular is an open-source web application framework maintained by Google and a community of developers.",
  };

  getBotAnswer(msg: string) {
    const userMessage = new Message("user", msg);
    this.conversation.next([userMessage]);

    const responseText = this.getBotMessage(msg);
    if (responseText) {
      // If there's a predefined answer, respond with it
      const botMessage = new Message("bot", responseText);
      setTimeout(() => {
        this.playAudio();
        this.conversation.next([botMessage]);
      }, 1500);
    } else {
      // If no predefined answer, search DuckDuckGo
      this.searchDuckDuckGo(msg);
    }
  }

  playFile(p0: string) {
    this.audioFile.play();
  }

  playAudio() {
    this.playFile("https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3");
  }

  getBotMessage(question: string) {
    const modifiedQuestion = question.toLowerCase();
    return this.messageMap[modifiedQuestion as keyof typeof this.messageMap];
  }

  //  New Method: Search DuckDuckGo API


  searchDuckDuckGo(query: string) {
    const apiUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
  
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        if (response.Abstract) {
          this.conversation.next([new Message("bot", response.Abstract)]);
        } else if (response.RelatedTopics.length > 0) {
          this.conversation.next([new Message("bot", "Here are some useful links:")]);
          response.RelatedTopics.slice(0, 3).forEach((topic: { FirstURL: any; Text: any; }) => {
            if (topic.FirstURL) {
              this.conversation.next([new Message("bot", `<a href="${topic.FirstURL}" target="_blank">${topic.Text}</a>`)]);
              this.playAudio();
            }
          });
        } else {
          this.searchWikipedia(query);
        }
      },
      error: (error) => {
        console.error("DuckDuckGo API error:", error);
        this.searchWikipedia(query);
      }
    });
  }
  
  suggestGoogleSearch(query: string) {
    const googleLink = `<a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank">🔎 Click here</a>`;
    this.playAudio();
    this.conversation.next([
      new Message("bot", "I couldn't find an answer. Here are some useful links:"),
      new Message("bot", googleLink)
    ]);
    
  }
  searchWikipedia(query: string) {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
  
    this.http.get<any>(wikiUrl).subscribe({
      next: (response) => {
        if (response.extract) {
          this.conversation.next([new Message("bot", response.extract)]);
          this.playAudio();
        } else {
          this.suggestGoogleSearch(query);
        }
      },
      error: (error) => {
        console.error("Wikipedia API error:", error);
        this.suggestGoogleSearch(query);
      }
    });
  }
  
  
  
}
