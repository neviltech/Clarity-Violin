import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, MicOff } from "lucide-react";
import { useConversation } from "@elevenlabs/react";

const AGENT_ID = "agent_3301knkw1mfvf829r1kp6pwqspsj";

const PulsingRings = ({ color = "bg-primary" }: { color?: string }) => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`absolute h-24 w-24 rounded-full ${color} opacity-0`}
        animate={{ scale: [1, 1.6 + i * 0.3], opacity: [0.4, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
      />
    ))}
  </div>
);

const ClariceChat = () => {
  const [open, setOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnecting(false);
      setErrorMessage(null);
    },
    onDisconnect: () => {
      setIsConnecting(false);
    },
    onError: (error) => {
      console.error("Clarice error:", error);
      setIsConnecting(false);
      setErrorMessage("Unable to connect. Please try again.");
    },
  });

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

  const toggleConversation = useCallback(async () => {
    if (isConnected) {
      await conversation.endSession();
      return;
    }

    if (isConnecting) return;

    setIsConnecting(true);
    setErrorMessage(null);

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
      });
    } catch (err) {
      console.error("Failed to start:", err);
      setIsConnecting(false);
      setErrorMessage(
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone access is required to talk to Clarice."
          : "Failed to connect. Please try again."
      );
    }
  }, [conversation, isConnected, isConnecting]);

  const handleClose = useCallback(async () => {
    if (isConnected) {
      await conversation.endSession();
    }
    setIsConnecting(false);
    setErrorMessage(null);
    setOpen(false);
  }, [conversation, isConnected]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-purple shadow-lg transition-opacity hover:opacity-90"
            aria-label="Talk to Clarice"
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
            className="fixed bottom-4 right-4 z-50 flex w-[320px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl"
          >
            <div className="gradient-purple flex items-center justify-between px-4 py-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-sm">🎻</div>
                <div>
                  <p className="font-heading text-sm font-semibold text-primary-foreground">Clarice</p>
                  <p className="font-body text-xs text-primary-foreground/70">
                    {isConnected ? (isSpeaking ? "Speaking..." : "Listening...") : isConnecting ? "Connecting..." : "Tap to talk"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 transition-colors hover:bg-primary-foreground/10"
                aria-label="Close Clarice chat"
              >
                <X className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 px-6 py-10">
              <div className="relative flex items-center justify-center">
                {isConnected && <PulsingRings color={isSpeaking ? "bg-primary" : "bg-destructive"} />}

                <motion.button
                  onClick={toggleConversation}
                  disabled={isConnecting}
                  animate={isConnected ? { scale: isSpeaking ? [1, 1.08, 1] : 1 } : {}}
                  transition={isSpeaking ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : {}}
                  className={`relative z-10 flex h-24 w-24 items-center justify-center rounded-full shadow-lg transition-colors ${
                    isConnected
                      ? isSpeaking
                        ? "bg-primary"
                        : "bg-destructive"
                      : isConnecting
                        ? "gradient-purple opacity-60"
                        : "gradient-purple hover:opacity-90"
                  }`}
                  aria-label={isConnected || isConnecting ? "Stop conversation" : "Start conversation"}
                >
                  {isConnected || isConnecting ? (
                    <MicOff className="h-9 w-9 text-primary-foreground" />
                  ) : (
                    <Mic className="h-9 w-9 text-primary-foreground" />
                  )}
                </motion.button>
              </div>

              <p className="text-center text-sm text-muted-foreground font-body">
                {isConnecting
                  ? "Connecting..."
                  : errorMessage
                    ? errorMessage
                    : isConnected
                      ? isSpeaking
                        ? "Clarice is talking..."
                        : "Go ahead, I'm listening!"
                      : "Tap the mic to talk to Clarice"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClariceChat;
