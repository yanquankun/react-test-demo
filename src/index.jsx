// import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Test from "./test";

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
// 如果你想写的组件只包含一个 render 方法，并且不包含 state，那么使用函数组件就会更简单
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0, // 当前正在查看哪一步的历史
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      // react中key的作用 可以理解为vue中key的针对dom的更新策略
      // 每当一个列表重新渲染时，React 会根据每一项列表元素的 key 来检索上一次渲染时与每个 key 所匹配的列表项。如果 React 发现当前的列表有一个之前不存在的 key，那么就会创建出一个新的组件。如果 React 发现和之前对比少了一个 key，那么就会销毁之前对应的组件。如果一个组件的 key 发生了变化，这个组件会被销毁，然后使用新的 state 重新创建一份
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    // this.update.call(this);
  }

  update() {
    return setInterval(() => this.setState({ date: new Date() }), 1000);
  }

  // 类似ng中的init hook或vue中的mount hook
  componentDidMount() {
    console.log("clock dom init...");
    this.timerID = this.update.call(this);
  }

  // 类似ng中的destroy hook或vue中的destroyed hook
  componentWillUnmount() {
    console.log("clock dom destroy...");
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "请撰写一篇关于你喜欢的 DOM 元素的文章.",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("提交的文章: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea
            rows="10"
            cols="50"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "coconut", name: "椰子" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      name: event.target.selectedOptions[0].text,
    });
  }

  handleSubmit(event) {
    alert("你喜欢的风味是: " + this.state.value + "," + this.state.name);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit" name="葡萄柚">
              葡萄柚
            </option>
            <option value="lime" name="酸橙">
              酸橙
            </option>
            <option value="coconut" name="椰子">
              椰子
            </option>
            <option value="mango" name="芒果">
              芒果
            </option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

// 嵌套组件  start
// 通过children作为介质，将父组件中包含的内容作为props全部传递过来
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}
// 嵌套组件  end
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
// ========================================

if (module.hot) {
  module.hot.accept(() => root_render());
}
const root_render = () => {
  let numbers = [1, 2, 3, 4, 5, 6];
  const lis = numbers.map((v, idx) => {
    return <li key={idx}>{v}</li>;
  });
  ReactDOM.render(
    [
      <Game key="game" />,
      <Test key="test" value={"test"} />,
      <Clock key="clock" />,
      <ul key="ul">{lis}</ul>,
      <EssayForm key="esayForm" />,
      <FlavorForm key="flavorForm" />,
      WelcomeDialog(),
    ],
    document.getElementById("root")
  );
};
root_render();
// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./index.jsx", () => {
    // if you are using harmony modules ({modules:false})
    root_render();
  });
}

/**
 * 判断游戏胜利者
 * @date 2021-10-19
 * @param {any} squares
 * @returns {any}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
