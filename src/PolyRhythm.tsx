import { ReactNode, useState } from "react";
import { useInterval } from "./useInterval";

type BeatControlsProps = {
  className: string;
  value: any;
  setValue: (x: any) => void;
  minLimit: number;
  maxLimit: number;
  interval: number;
};

function BeatControls({
  className,
  value,
  setValue,
  minLimit,
  maxLimit,
  interval,
}: BeatControlsProps) {
  return (
    <div className={className + " flex flex-row"}>
      <div className="w-12 mr-1">
        <button
          onClick={() => setValue(Math.max(minLimit, value - interval))}
          className="btn btnerror"
        >
          -
        </button>
      </div>
      <div className="w-12">
        <button
          onClick={() => setValue(Math.min(maxLimit, value + interval))}
          className="btn btnsuccess"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function PolyRhythm() {
  const [beat, setBeat] = useState<number>(0);
  const [firstBeat, setFirstBeat] = useState<number>(3);
  const [secondBeat, setSecondBeat] = useState<number>(2);
  const [playing, setPlaying] = useState<boolean>(false);
  const [bpm, setBpm] = useState<number>(90);

  const delay = (1 / (bpm / 60)) * 1000;

  useInterval(() => {
    if (playing) {
      setBeat((beat + 1) % steps);
    }
  }, delay);

  const steps = firstBeat * secondBeat;
  const rows: Array<ReactNode> = [];
  var cols: Array<ReactNode> = [];
  const rowClasses = "flex flex-row";
  for (let i = 0; i < steps; i++) {
    // Check if at the start of a row
    if (i % firstBeat == 0) {
      // If there is content from prior row, push it out and reset cols
      if (cols.length > 0) {
        rows.push(<div className={rowClasses}>{cols}</div>);
      }
      cols = [];
    }
    const isActive = i == beat;
    const isFirstBeat = i % firstBeat == 0;
    const isSecondBeat = i % secondBeat == 0;
    var beatClasses: Array<string> = [
      "p-16",
      "mt-0 mr-4 ml-4 mb-0",
      "flex-col",
      "beatBox",
      "text-center",
      "beatBackground",
    ];
    if (isFirstBeat && isSecondBeat) {
      if (isActive) {
        beatClasses.push("activeFirstSecondBeat");
      } else {
        beatClasses.push("firstSecondBeat");
      }
    } else {
      if (isFirstBeat) {
        if (isActive) {
          beatClasses.push("activeFirstBeat");
        } else {
          beatClasses.push("firstBeat");
        }
      }
      if (isSecondBeat) {
        if (isActive) {
          beatClasses.push("activeSecondBeat");
        } else {
          beatClasses.push("secondBeat");
        }
      }
    }
    if (isActive) {
      beatClasses.push("text-white");
      if (!isFirstBeat && !isSecondBeat) {
        beatClasses.push("activeBeat");
      }
    }
    cols.push(
      <div key={i} className={beatClasses.join(" ")}>
        {/* text inside boxes */}
        <div className="polyrhythmtext">{(i % firstBeat) + 1}</div>
      </div>
    );
  }
  if (cols.length > 0) {
    rows.push(<div className={rowClasses}>{cols}</div>);
  }

  return (
    <div>
      <div id="polyrhythmcontroller" className="flex flex-row">
        <div>
          <div id="secondbeattext">{secondBeat}</div>
          <div id="overtext">over</div>
          <div id="firstbeattext">{firstBeat}</div>
          <div id="bpmtext">{bpm} bpm</div>
        </div>
        <div id="polyrhythmcontrollerbtns">
          <BeatControls
            className="firstbeatbtn"
            value={secondBeat}
            setValue={setSecondBeat}
            maxLimit={7}
            minLimit={2}
            interval={1}
          />
          <BeatControls
            className=""
            value={firstBeat}
            setValue={setFirstBeat}
            maxLimit={7}
            minLimit={1}
            interval={1}
          />

          <BeatControls
            className="bpm"
            value={bpm}
            setValue={setBpm}
            maxLimit={300}
            minLimit={3}
            interval={10}
          />
        </div>
      </div>
      <div id="polyrhythmtransport">
        <button
          className="polybtnplay"
          onClick={() => {
            setPlaying(true);
            setBeat(0);
          }}
        >
          PLAY
        </button>
        <button
          className="polybtnstop"
          onClick={() => {
            setPlaying(false);
            setBeat(0);
          }}
        >
          STOP
        </button>
      </div>
      <div className="flex flex-col">{rows}</div>
    </div>
  );
}
