import { useAsync } from "react-use";
import { isDefined, isFilled } from "ts-is-present";
import Markov from "markov-strings";

function useData() {
  const foo = useAsync(async () => {
    return fetch("/transcripts/e1.txt").then((resp) => resp.text());
  });
  if (foo.loading) return undefined;

  return (foo.value || "")
    .split(/\r?\n|\r/)
    .filter((line) => line !== "")
    .filter((line) => line.match(/^(\w+\s?){1,3}:/gm))
    .map((line) => /^((?:\w+\s?){1,3}): (.+)$/gm.exec(line))
    .filter(isFilled)
    .map((match) => match.slice(1))
    .reduce((acc: Record<string, string[]>, current) => {
      const [name, sentence] = current;
      if (!(name in acc)) return { ...acc, [name]: [sentence] };
      return { ...acc, [name]: [...acc[name], sentence] };
    }, {});
}

export function useBrennan() {
  const data = useData();
  if (!isDefined(data)) return undefined;
  console.log(Object.keys(data));

  const bData = data["Buckster"];
  const markov = new Markov({ stateSize: 2 });
  markov.addData(bData);
  return markov;
}
