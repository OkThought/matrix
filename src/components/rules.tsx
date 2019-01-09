import * as React from "react";
import classical_board from "../assets/images/classical_board.png";
import cross_out_horizontal from "../assets/images/cross_out_horizontal.png";
import cross_out_horizontal_with_zeros from "../assets/images/cross_out_horizontal_with_zeros.png";
import cross_out_horizontal_with_zeros_next_line from "../assets/images/cross_out_horizontal_with_zeros_next_line.png";
import cross_out_vertical from "../assets/images/cross_out_vertical.png";
import cross_out_vertical_with_zeros from "../assets/images/cross_out_vertical_with_zeros.png";
import next_level from "../assets/images/next_level.png";

const Rules = () => (
  <div className="row">
    <div className="rulesNavContainer col-3">
      <nav id="rulesNav" className="navbar navbar-light sticky-top">
        <nav className="navbar-nav flex-column">
          <a className="nav-link" href="#gameRules">Game Rules</a>
          <nav className="ml-3 navbar-nav nav flex-column">
            <a className="nav-link" href="#board">Board</a>
            <a className="nav-link" href="#goal">Goal</a>
            <a className="nav-link" href="#howToCrossOut">How To Crossout?</a>
            <a className="nav-link" href="#nextLevel">Next Level</a>
          </nav>
        </nav>
      </nav>
    </div>
    <div className="rulesContainer col">
      <div className="Rules" data-spy="scroll" data-target="#rulesNav">
        <section id="gameRules" className="pt-4">
          <h2>Game rules</h2>
        </section>

        <section id="board" className="mt-2">
          <h4>Board</h4>
          <p>
            The classical board looks like this:
          </p>
          <img src={classical_board}
               alt="Classical Board"
               className="classical_board"/>
        </section>
        <section id="goal" className="mt-3">
          <h4>Goal</h4>
          <p>
            The goal is to cross out all the numbers, so that the game board is empty
            and in as few crossouts as possible.
          </p>
        </section>
        <section id="howToCrossOut">
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
              <img src={cross_out_horizontal}
                   alt="Cross-out Horizontal"
                   className="cross_out_horizontal"/>
              <br/>
              There can be any number of `zeros` between them:
              <br/>
              <img src={cross_out_horizontal_with_zeros}
                   alt="Cross-out Horizontal With Zeros"
                   className="cross_out_horizontal_with_zeros"/>
              <br/>
              The second one can even be one the next line:
              <br/>
              <img src={cross_out_horizontal_with_zeros_next_line}
                   alt="Cross-out Horizontal With Zeros Next Line"
                   className="cross_out_horizontal_with_zeros_next_line"/>
            </li>
            <li>
              They lie vertically next to each other:<br/>
              <img src={cross_out_vertical}
                   alt="Cross-out Vertical"
                   className="cross_out_vertical"/>
              <br/>
              There can be any number of `zeros` between them:
              <br/>
              <img src={cross_out_vertical_with_zeros}
                   alt="Cross-out Vertical With Zeros"
                   className="cross_out_vertical_with_zeros"/>
            </li>
          </ol>
        </section>

        <section id="nextLevel">
          <h4>Next level</h4>
          <p>
            In the most cases you can't win on the first level. When you can't find
            any more pairs to cross out, just go to the next level
            (click <span><img src={next_level} alt="Next Level" className="next_level"/></span>).

            It will duplicate
            all the numbers in the current board except `zeros` and place them to the
            end of the board. Your history of moves will be lost and you can't go back
            to the previous level anymore.
          </p>
        </section>
      </div>
    </div>
  </div>
);

export default Rules;
