import * as React from "react";

const Rules = () => (
  <div>
    <h2>Game rules</h2>

    <h4>Board</h4>
    <p>
      The classical board looks like this:
    </p>
    <img src="/images/board10.png"/>

    <h4>Goal</h4>
    <p>
      The goal is to cross out all the numbers, so that the game board is empty.
    </p>

    <h4>How to cross out?</h4>
    <p>
      In the classical game you have numbers from 1 to 9. You can cross out
      pairs of numbers which sum up to 10, or are identical.
    </p>
    <p>
      But there are some restrictions on that. You can cross out only those
      pairs of numbers which are neighbors. For two numbers on the board to be
      neighbors one of the following is required:
    </p>
    <ol>
      <li>
        They go one after another (from <b>left</b> to <b>right</b>,
        from <b>top</b> to <b>bottom</b>):
        <br/>
        <img src="/images/cross-out-horizontal.png"/>
        <br/>
        There can be any number of `zeros` between them:
        <br/>
        <img src="/images/cross-out-horizontal-with-zeros.png"/>
        <br/>
        The second one can even be one the next line:
        <br/>
        <img src="/images/cross-out-horizontal-with-zeros-next-line.png"/>
      </li>
      <li>
        They lie vertically next to each other:<br/>
        <img src="/images/cross-out-vertical.png"/>
        <br/>
        There can be any number of `zeros` between them:
        <br/>
        <img src="/images/cross-out-vertical-with-zeros.png"/>
      </li>
    </ol>

    <h4>Next level</h4>
    <p>
      In the most cases you can't win on the first level. When you can't find
      any more pairs to cross out, just go to the next level
      (click <img src="/images/next-level.png"/>).

      It will duplicate
      all the numbers in the current board except `zeros` and place them to the
      end of the board. Your history of moves will be lost and you can't go back
      to the previous level anymore.
    </p>

  </div>
);

export default Rules;
