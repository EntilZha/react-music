import { ReactNode, useState } from "react";

function BeatControls({ className, label, value, setValue }) {
  return (
    <div className={className}>
      {label}: {value}
      <button
        onClick={() => setValue(Math.max(1, value - 1))}
        className="btn btn-error"
      >
        -
      </button>
      <button onClick={() => setValue(value + 1)} className="btn btn-success">
        +
      </button>
    </div>
  );
}

export function PolyRhythm() {
  const [beat, setBeat] = useState<number>(0);
  const [firstBeat, setFirstBeat] = useState<number>(3);
  const [secondBeat, setSecondBeat] = useState<number>(4);
  const steps = firstBeat * secondBeat;
  const rows: Array<ReactNode> = [];
  var cols: Array<ReactNode> = [];
  const rowClasses = "border-1 border-green-400 flex flex-row";
  for (let i = 0; i < steps; i++) {
    // Check if at the start of a row
    if (i % firstBeat == 0) {
      // If there is content from prior row, push it out and reset cols
      if (cols.length > 0) {
        rows.push(<div className={rowClasses}>{cols}</div>);
      }
      cols = [];
    }
    var beatClasses: Array<string> = ["p-5 border-4", "flex-col"];
    if (i % firstBeat == 0) {
      beatClasses.push("font-bold");
    }
    if (i % secondBeat == 0) {
      beatClasses.push("underline");
    }
    if (i == beat) {
      beatClasses.push("text-red-500");
    }
    cols.push(
      <div key={i} className={beatClasses.join(" ")}>
        {(i % firstBeat) + 1}
      </div>
    );
  }
  if (cols.length > 0) {
    rows.push(<div className={rowClasses}>{cols}</div>);
  }

  return (
    <div>
      <BeatControls
        className="font-bold"
        label="First Beat: "
        value={firstBeat}
        setValue={setFirstBeat}
      />
      <BeatControls
        className="underline"
        label="Second Beat: "
        value={secondBeat}
        setValue={setSecondBeat}
      />
      <div>Total beats: {steps}</div>
      <div>Current beat: {beat + 1}</div>
      <div className="flex flex-col">{rows}</div>
      <button
        className="btn btn-info"
        onClick={() => setBeat((beat + 1) % steps)}
      >
        Beat
      </button>
    </div>
  );
}
