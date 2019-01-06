import * as React from "react";
import * as classical_board from "../assets/images/classical_board.png";
import * as cross_out_horizontal from "../assets/images/cross_out_horizontal.png";
import * as cross_out_horizontal_with_zeros from "../assets/images/cross_out_horizontal_with_zeros.png";
import * as cross_out_horizontal_with_zeros_next_line from "../assets/images/cross_out_horizontal_with_zeros_next_line.png";
import * as cross_out_vertical from "../assets/images/cross_out_vertical.png";
import * as cross_out_vertical_with_zeros from "../assets/images/cross_out_vertical_with_zeros.png";
import * as next_level from "../assets/images/next_level.png";

const Rules = () => (
  <div>
    <h2>Game rules</h2>

    <h4>Board</h4>
    <p>
      The classical board looks like this:
    </p>
    <img src={classical_board} alt="classical_board"/>

    <h4 className="mt-2">Goal</h4>
    <p>
      The goal is to cross out all the numbers, so that the game board is empty
      and in as few crossouts as possible.
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
        <img src={cross_out_horizontal} alt="cross_out_horizontal"/>
        <br/>
        There can be any number of `zeros` between them:
        <br/>
        <img src={cross_out_horizontal_with_zeros} alt="cross_out_horizontal_with_zeros"/>
        <br/>
        The second one can even be one the next line:
        <br/>
        <img src={cross_out_horizontal_with_zeros_next_line} alt="cross_out_horizontal_with_zeros_next_line"/>
      </li>
      <li>
        They lie vertically next to each other:<br/>
        <img src={cross_out_vertical} alt="cross_out_vertical"/>
        <br/>
        There can be any number of `zeros` between them:
        <br/>
        <img src={cross_out_vertical_with_zeros} alt="cross_out_vertical_with_zeros"/>
      </li>
    </ol>

    <h4>Next level</h4>
    <p>
      In the most cases you can't win on the first level. When you can't find
      any more pairs to cross out, just go to the next level
      (click <img src={next_level} alt="next_level"/>).

      It will duplicate
      all the numbers in the current board except `zeros` and place them to the
      end of the board. Your history of moves will be lost and you can't go back
      to the previous level anymore.
    </p>

  </div>
);

export default Rules;
