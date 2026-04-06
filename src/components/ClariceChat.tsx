import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Mic, MicOff } from "lucide-react";
import { useConversation } from "@elevenlabs/react";

const AGENT_ID = "agent_2701knh1mh31e4bs8tmq598s9wrm";

const PulsingRings = ({ color = "bg-primary" }: { color?: string }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className={`absolute w-24 h-24 rounded-full ${color} opacity-0`}
        animate={{
          scale: [1, 1.6 + i * 0.3],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

const ClariceChat = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("idle");

  const conversation = useConversation({
    onConnect: () => setStatus("connected"),
    onDisconnect: () => setStatus("idle"),
    onError: (error) => {
      console.error("Clarice error:", error);
      setStatus("error");
    },
  });

  const toggleConversation = useCallback(async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
      return;
    }

    try {
      setStatus("connecting");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error("Failed to start:", err);
      setStatus("error");
    }
  }, [conversation]);

  const handleClose = useCallback(async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
    }
    setOpen(false);
    setStatus("idle");
  }, [conversation]);

  const isConnected = conversation.status === "connected";
  const isSpeaking = conversation.isSpeaking;

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
            className="fixed bottom-4 right-4 z-50 w-[320px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-xl border border-border/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-purple px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm">🎻</div>
                <div>
                  <p className="text-primary-foreground font-heading font-semibold text-sm">Clarice</p>
                  <p className="text-primary-foreground/70 text-xs font-body">
                    {isConnected
                      ? isSpeaking ? "Speaking..." : "Listening..."
                      : "Tap to talk"}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                <X className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>

            {/* Voice area */}
            <div className="flex flex-col items-center justify-center py-10 px-6 gap-5">
              {/* Mic button with pulsing rings */}
              <div className="relative flex items-center justify-center">
                {isConnected && (
                  <PulsingRings color={isSpeaking ? "bg-primary" : "bg-destructive"} />
                )}

                <motion.button
                  onClick={toggleConversation}
                  disabled={status === "connecting"}
                  animate={
                    isConnected
                      ? { scale: isSpeaking ? [1, 1.08, 1] : 1 }
                      : {}
                  }
                  transition={
                    isSpeaking
                      ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                      : {}
                  }
                  className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-colors shadow-lg ${
                    isConnected
                      ? isSpeaking
                        ? "bg-primary"
                        : "bg-destructive"
                      : status === "connecting"
                      ? "gradient-purple opacity-60"
                      : "gradient-purple hover:opacity-90"
                  }`}
                  aria-label={isConnected ? "Stop conversation" : "Start conversation"}
                >
                  {isConnected ? (
                    <MicOff className="h-9 w-9 text-primary-foreground" />
                  ) : (
                    <Mic className="h-9 w-9 text-primary-foreground" />
                  )}
                </motion.button>
              </div>

              <p className="text-center text-sm text-muted-foreground font-body">
                {status === "connecting"
                  ? "Connecting..."
                  : status === "error"
                  ? "Something went wrong. Try again!"
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
