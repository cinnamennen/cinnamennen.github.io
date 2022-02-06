import { Button } from "antd";
import React, { useState } from "react";
import { useBrennan } from "./hooks";
import Markov from "markov-strings";

export function Impersonate() {
  const [text, setText] = useState("Click To generate");
  const b = useBrennan();

  return (
    <div>
      <p>{text}</p>
      <Button
        type="primary"
        disabled={b === undefined}
        onClick={(e) => {
          let markovResult = (b as Markov).generate();
          console.log(markovResult.score);
          setText(markovResult.string);
        }}
      >
        PRESS ME
      </Button>
    </div>
  );
}
