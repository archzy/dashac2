
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Paperclip, Send, FileIcon, XIcon } from "lucide-react";

// Sample contact data
const contacts = [
  { id: "1", name: "Sarah Johnson", avatar: "", status: "online", lastSeen: "Active now", unread: 3 },
  { id: "2", name: "Michael Brown", avatar: "", status: "online", lastSeen: "Active now", unread: 0 },
  { id: "3", name: "Emily Davis", avatar: "", status: "offline", lastSeen: "1h ago", unread: 0 },
  { id: "4", name: "David Wilson", avatar: "", status: "offline", lastSeen: "3h ago", unread: 0 },
  { id: "5", name: "James Miller", avatar: "", status: "offline", lastSeen: "5h ago", unread: 2 },
  { id: "6", name: "Linda Anderson", avatar: "", status: "online", lastSeen: "Active now", unread: 0 },
  { id: "7", name: "Robert Taylor", avatar: "", status: "offline", lastSeen: "1d ago", unread: 0 },
  { id: "8", name: "Jessica Brown", avatar: "", status: "offline", lastSeen: "2d ago", unread: 0 },
];

// Sample message data
const sampleMessages = [
  { id: "1", senderId: "1", content: "Hi there! How are you doing today?", timestamp: "10:30 AM", read: true },
  { id: "2", senderId: "current", content: "I'm good, thanks for asking. How about you?", timestamp: "10:32 AM", read: true },
  { id: "3", senderId: "1", content: "I'm doing well. Just wanted to check if you got the document I sent yesterday?", timestamp: "10:34 AM", read: true },
  { id: "4", senderId: "current", content: "Yes, I received it. I'll review it and get back to you.", timestamp: "10:36 AM", read: true },
  { id: "5", senderId: "1", content: "Great! Let me know if you have any questions about it.", timestamp: "10:37 AM", read: true },
  { id: "6", senderId: "1", content: "Also, are we still meeting tomorrow at 2 PM?", timestamp: "10:38 AM", read: false },
  { id: "7", senderId: "1", content: "I've attached the updated version of the file here.", timestamp: "10:40 AM", read: false, file: { name: "financial_report.pdf", size: "2.4 MB" } },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Filter contacts based on search query
  const filteredContacts = searchQuery 
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedFile) return;

    const newMessageObj = {
      id: `msg_${Date.now()}`,
      senderId: "current",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      file: selectedFile ? { 
        name: selectedFile.name, 
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` 
      } : undefined,
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
    setSelectedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-card rounded-lg border h-[calc(100vh-10rem)] overflow-hidden flex flex-col md:flex-row">
        {/* Contacts sidebar */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search contacts..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="py-2">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors text-left ${
                    selectedContact.id === contact.id ? "bg-secondary/80" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {contact.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.status === "online" && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-card"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium truncate">{contact.name}</span>
                      <span className="text-xs text-muted-foreground">{contact.lastSeen === "Active now" ? "" : contact.lastSeen}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.status === "online" ? "Active now" : contact.lastSeen}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                      {contact.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {selectedContact.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{selectedContact.name}</h3>
              <p className="text-xs text-muted-foreground">
                {selectedContact.status === "online" ? "Active now" : selectedContact.lastSeen}
              </p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "current" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.senderId === "current"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    } rounded-lg p-3`}
                  >
                    {message.content && <p>{message.content}</p>}
                    
                    {message.file && (
                      <div className="mt-2 flex items-center gap-2 p-2 rounded bg-background/20">
                        <FileIcon size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate">{message.file.name}</p>
                          <p className="text-xs opacity-80">{message.file.size}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-1 flex justify-end">
                      <span className="text-xs opacity-80">{message.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message input */}
          <div className="p-4 border-t">
            {selectedFile && (
              <div className="mb-2 flex items-center gap-2 p-2 bg-secondary rounded-md">
                <FileIcon size={16} />
                <span className="text-sm truncate flex-1">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setSelectedFile(null)}
                >
                  <XIcon size={14} />
                </Button>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="flex-shrink-0"
                asChild
              >
                <label>
                  <Paperclip size={18} />
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </Button>
              
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              
              <Button
                onClick={handleSendMessage}
                disabled={newMessage.trim() === "" && !selectedFile}
                className="flex-shrink-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
