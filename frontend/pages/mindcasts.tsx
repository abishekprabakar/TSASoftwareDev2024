import Page from "@/components/page";
import { Status } from "@/lib/state";
import { Alert } from "@material-tailwind/react";
import { useState } from "react";
import { HiExclamationCircle } from "react-icons/hi2";

// chat page
export default function Counsel() {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [error, setError] = useState<string | null>("Under construction");

  return (
    <Page>
      <Alert color="red" open={error !== null} onClose={() => setError(null)}>
        <div className="flex flex-row gap-2">
          <HiExclamationCircle className="w-6 h-6" />
          <p className="leading-6">{error}</p>
        </div>
      </Alert>
    </Page>
  );
}
