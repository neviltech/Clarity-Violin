import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/clarice-chat`;

const safeSpeechCancel = () => {
  try { window.speechSynthesis?.cancel(); } catch {}
};

const ClariceChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Clarice 🎻 Tap the mic and talk to me, or type below!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    safeSpeechCancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) => v.name.includes("Female") || v.name.includes("Zira") || v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Victoria")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantText = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to connect");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > newMessages.length) {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantText } : m));
                }
                return [...prev, { role: "assistant", content: assistantText }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (assistantText) speakText(assistantText);
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : "Something went wrong";
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, speakText]);

  const toggleListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, voice input isn't supported on this browser. Try Chrome or Edge!" }]);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    safeSpeechCancel();
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      if (transcript) sendMessage(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, sendMessage]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-purple shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Chat with Clarice"
          >
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-2rem)] bg-card rounded-2xl shadow-xl border border-border/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-purple px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm">🎻</div>
                <div>
                  <p className="text-primary-foreground font-heading font-semibold text-sm">Clarice</p>
                  <p className="text-primary-foreground/70 text-xs font-body">Tap mic to talk</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setVoiceEnabled(!voiceEnabled); safeSpeechCancel(); }}
                  className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  aria-label={voiceEnabled ? "Mute voice" : "Enable voice"}
                >
                  {voiceEnabled ? <Volume2 className="h-4 w-4 text-primary-foreground" /> : <VolumeX className="h-4 w-4 text-primary-foreground" />}
                </button>
                <button onClick={() => { setOpen(false); safeSpeechCancel(); }} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  <X className="h-4 w-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-body leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-purple text-primary-foreground rounded-br-md"
                        : "bg-accent text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm text-muted-foreground">
                    <span className="animate-pulse">Clarice is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Voice-first input area */}
            <div className="p-3 border-t border-border/50 shrink-0">
              {/* Big mic button */}
              <div className="flex justify-center mb-3">
                <button
                  onClick={toggleListening}
                  disabled={isLoading}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                    isListening
                      ? "bg-red-500 animate-pulse scale-110"
                      : "gradient-purple hover:opacity-90"
                  }`}
                  aria-label={isListening ? "Stop listening" : "Start talking"}
                >
                  {isListening ? (
                    <MicOff className="h-7 w-7 text-white" />
                  ) : (
                    <Mic className="h-7 w-7 text-primary-foreground" />
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground font-body mb-2">
                {isListening ? "Listening... speak now" : "Tap the mic to talk to Clarice"}
              </p>

              {/* Text fallback */}
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Or type here..."
                  className="rounded-xl border-border bg-background font-body text-xs"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="gradient-purple text-primary-foreground border-0 rounded-xl shrink-0 hover:opacity-90 h-9 w-9"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClariceChat;
