print(
  "Use print() or console.log() for debug/info (" +
    data.position_p2[0] +
    "," +
    data.position_p2[1] +
    ")"
);

const validate_move = (y, x) => {
  if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
      return {
          cord: [y, x],
          item: data.board[y][x],
          food: data.board[y][x].match(/[MFHS]/),
        };
    }
    return false;
};

const findFoodInRows = () =>{
    return  data.board.map(row => row.join().match(/[MFHS]/))
}
const findFoodInRow = (row) =>{
    return  data.board[row].findIndex((x) => x.match(/[MFHS]/))
}

let moves = {
  //level 1
  top: validate_move(data.position_p2[0] - 1, data.position_p2[1]),
  bottom: validate_move(data.position_p2[0] + 1, data.position_p2[1]),
  left: validate_move(data.position_p2[0], data.position_p2[1] - 1),
  right: validate_move(data.position_p2[0], data.position_p2[1] + 1),
  //level 2
  top2: validate_move(data.position_p2[0] - 2, data.position_p2[1]),
  bottom2: validate_move(data.position_p2[0] + 2, data.position_p2[1]),
  left2: validate_move(data.position_p2[0], data.position_p2[1] - 2),
  right2: validate_move(data.position_p2[0], data.position_p2[1] + 2),
};

console.log(
  "row find",
  data.board[data.position_p2[0]].findIndex((x) => x.match(/[MFHS]/))
);

const next_move = (m) => {

    
  //level 1
  if (!!m.top?.food) return m.top.cord;
  if (!!m.bottom?.food) return m.bottom.cord;
  if (!!m.left?.food) return m.left.cord;
  if (!!m.right?.food) return m.right.cord;
  //level 2
  if (!!m.top2?.food && m.top?.item === "E") return m.top.cord;
  if (!!m.bottom2?.food && m.bottom?.item === "E") return m.bottom.cord;
  if (!!m.left2?.food && m.left?.item === "E") return m.left.cord;
  if (!!m.right2?.food && m.right?.item === "E") return m.right.cord;

//   if(findFoodInRow(data.position_p2[0]))
if (m.left?.item === "E" && data.position_p2[1] > 2 && data.position_p2[0] > 2) {
    console.log( " Entre left ")
    return m.left.cord;
} else if (m.top?.item === "E" && data.position_p2[0] > 2) {
      console.log( " Entre top ")
      return m.top.cord;
    } else if (m.right?.item === "E" && data.position_p2[1] < 7 ) {
      console.log( " Entre right ")
      return m.right.cord;
    } else  {
        console.log( " Entre bottom ")
        return m.bottom.cord;
  }
};


console.log(data.board[data.position_p2[0]][data.position_p2[0]]);

console.log("pos ==>>>",data.position_p2);
console.log("next ==>>>",next_move(moves));
print(next_move(moves));

//________________V2


// print(
//   "Use print() or console.log() for debug/info (" +
//     data.position_p2[0] +
//     "," +
//     data.position_p2[1] +
//     ")"
// );

// const validate_move = (x, y) => {
//   if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
//       return {
//           cord: [x, y],
//           item: data.board[x][y],
//           eat: data.board[x][y].match(/[MFHS]/),
//         };
//     }
//     return false;
// };
// const validate_move2 = (x, y) => {
//     if (x <= 9 && x >= 0 && y <= 9 && y >= 0) {
//         return !!data.board[x][y].match(/[MFHSE]/)
//     }
//     return false;
// };
// let moves = {
//   //level 1
//   top: [data.position_p2[0] - 1, data.position_p2[1]],
//   bottom: [data.position_p2[0] + 1, data.position_p2[1]],
//   left: [data.position_p2[0], data.position_p2[1] - 1],
//   right: [data.position_p2[0], data.position_p2[1] + 1],
//   //level 2
// //   top2: validate_move(data.position_p2[0] - 2, data.position_p2[1]),
// //   bottom2: validate_move(data.position_p2[0] + 2, data.position_p2[1]),
// //   left2: validate_move(data.position_p2[0], data.position_p2[1] - 2),
// //   right2: validate_move(data.position_p2[0], data.position_p2[1] + 2),
// };

// // console.log(
// //   "row match",
// //   data.board[data.position_p2[0]].join().match(/[MFHS]/)
// // );
// // console.log(
// //   "row find",
// //   data.board[data.position_p2[0]].find((x) => x.match(/[MFHS]/))
// // );
// // console.log("row complete", data.board[data.position_p2[0]]);

// const next_move = (m) => {
//   //level 1
//   if (validateMove2(m.top) && data.board[m.top[0]][m.]) return m.top.cord;
//   if (!!m.bottom?.eat) return m.bottom.cord;
//   if (!!m.left?.eat) return m.left.cord;
//   if (!!m.right?.eat) return m.right.cord;
//   //level 2
//   if (!!m.top2?.eat) return m.top.cord;
//   if (!!m.bottom2?.eat) return m.bottom.cord;
//   if (!!m.left2?.eat) return m.left.cord;
//   if (!!m.right2?.eat) return m.right.cord;

//   if (m.left?.item === "E") {
//     return m.left?.cord;
//   } else if (m.top?.item === "E") {
//     return m.top.cord;
//   } else if (m.right?.item === "E") {
//     return m.right.cord;
//   } else {
//     return m.bottom?.cord;
//   }
// };

// console.log("__next_", next_move(moves));

// console.log(data.board[data.position_p2[0]][data.position_p2[0]]);
// //print(possible_moves[Math.floor(Math.random() * possible_moves.length)]); /* Always send print(Y,X) as the last line for your move */
// print(next_move(moves));
