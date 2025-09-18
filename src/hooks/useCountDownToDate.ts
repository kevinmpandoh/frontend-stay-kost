import { useEffect, useState } from "react";
import { parse, isAfter, differenceInSeconds, Locale } from "date-fns";
import { id } from "date-fns/locale";

type CountdownOptions = {
  format: string; // contoh: 'd MMMM yyyy'
  locale?: Locale; // default: id
};

export const useCountdownToDate = (
  targetDateString: string,
  options: CountdownOptions
) => {
  const { format, locale = id } = options;
  const [isDue, setIsDue] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const parsedDate = parse(targetDateString, format, new Date(), {
      locale,
    });

    const interval = setInterval(() => {
      const now = new Date();
      if (isAfter(now, parsedDate) || +now === +parsedDate) {
        setIsDue(true);
        setCountdown("");
        clearInterval(interval);
      } else {
        const diffSeconds = differenceInSeconds(parsedDate, now);
        const hours = Math.floor(diffSeconds / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diffSeconds % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (diffSeconds % 60).toString().padStart(2, "0");
        setCountdown(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateString, format, locale]);

  return { isDue, countdown };
};
