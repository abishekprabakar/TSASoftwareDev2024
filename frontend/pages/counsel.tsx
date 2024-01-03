import Page from "@/components/page";
import Section from "@/components/section";
import { chat } from "@/lib/firebase/chat";
import { Status } from "@/lib/state";
import { Alert, Button, Input, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { HiExclamationCircle, HiPaperAirplane } from "react-icons/hi2";

// chat page
export default function Counsel() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [context, setContext] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onSend = async () => {
    if (status === Status.LOADING) return;
    setStatus(Status.LOADING);
    try {
      const response = await chat(message, context);
      setStatus(Status.SUCCESS);
      setContext([...context, message, response.text]);
      setMessage("");
    } catch (e) {
      setError("Failed to send message. Please try again later.");
      setStatus(Status.FAIL);
    }
    setError(null);
    setMessage("");
  };

  return (
    <Page>
      <Section>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 h-[50vh]">
            {context.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col gap-2 ${
                  index % 2 === 0 ? "items-start" : "items-end"
                }`}
              >
                <p className="text-sm">{message}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              color="blue"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") onSend();
              }}
              crossOrigin={""} // NOTE: This is a hack to fix a bug in ts
            />
            <Button size="sm" onClick={onSend} color="blue">
              {
                {
                  [Status.IDLE]: <HiPaperAirplane className="w-6 h-6" />,
                  [Status.LOADING]: <Spinner color="gray" />,
                  [Status.SUCCESS]: <HiPaperAirplane className="w-6 h-6" />,
                  [Status.FAIL]: <HiPaperAirplane className="w-6 h-6" />,
                }[status]
              }
            </Button>
          </div>
        </div>
      </Section>
      <Alert color="red" open={error !== null} onClose={() => setError(null)}>
        <div className="flex flex-row gap-2">
          <HiExclamationCircle className="w-6 h-6" />
          <p className="leading-6">{error}</p>
        </div>
      </Alert>
    </Page>
  );
}
