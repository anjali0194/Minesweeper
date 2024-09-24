// import flagSvg from "../assets/flag.svg";
// import mineSvg from "../assets/mine.svg";
// import GridContext from "../../store/GridContext";

// export default function Grid({ updateFirstClick, stopTimer }) {
//   const gridCtx = useContext(GridContext);
//   const [grid, setGrid] = useState({});
//   const [mines, setMines] = useState([]);

//   const colors = [
//     "fill-red-600",
//     "fill-blue-600",
//     "fill-pink-600",
//     "fill-yellow-600",
//     "fill-green-600",
//     "fill-orange-600",
//   ];
//   const bgColors = [
//     "bg-red-400",
//     "bg-blue-400",
//     "bg-pink-400",
//     "bg-yellow-400",
//     "bg-green-400",
//   ];

//   function updateGridOnFirstClick(key) {
//     let nearestPositions = getNearestPositionsCount(key);

//     while (
//       nearestPositions.filter((position) => {
//         const [i, j] = position.split(" ").map(Number);
//         return (
//           i === 0 ||
//           j === 0 ||
//           i === formValues.row - 1 ||
//           j === formValues.cols - 1
//         );
//       }).length < 4
//     ) {
//       let x = Math.floor(Math.random() * nearestPositions.length);
//       const positions = getNearestPositionsCount(nearestPositions[x]);
//       nearestPositions.push(...positions);
//     }
//     const cellsSet = new Set(nearestPositions);
//     nearestPositions = Array.from(cellsSet);
//     const x = nearestPositions.map((cell) => Number(cell.split(" ")[0]));
//     const y = nearestPositions.map((cell) => Number(cell.split(" ")[1]));
//     const minX = Math.min(...x);
//     const maxX = Math.max(...x);
//     const minY = Math.min(...y);
//     const maxY = Math.max(...y);
//     const borderPoints = nearestPositions.filter((cell) => {
//       const point = cell.split(" ");
//       return (
//         Number(point[0]) === minX ||
//         Number(point[0]) === maxX ||
//         Number(point[1]) === minY ||
//         Number(point[1]) === maxY
//       );
//     });
//     let finalPositions = [];
//     console.log(borderPoints);
//     for (let i = 0; i < borderPoints.length; i++) {
//       finalPositions.push(...getNearestPositionsCount(borderPoints[i]));
//     }
//     finalPositions = finalPositions.filter(
//       (position) =>
//         !nearestPositions.includes(position) && !borderPoints.includes(position)
//     );
//     console.log(new Set(finalPositions));
//     let obj = {},
//       k = 0;
//     if (
//       formValues.minesCount <
//       formValues.rows * formValues.cols - finalPositions.length
//     ) {
//       while (Object.keys(obj).length < formValues.minesCount) {
//         let randomkey = Math.floor(Math.random() * finalPositions.length);
//         console.log(finalPositions[randomkey]);
//         obj[finalPositions[randomkey]] = true;
//         setMines((prev) => [...prev, finalPositions[randomkey]]);
//       }
//     }

//     for (const value of nearestPositions) {
//       let count = 0;
//       getNearestPositionsCount(value).forEach((position) => {
//         if (obj[position] === true) {
//           count++;
//         }
//       });
//       // if (count !== 0) {
//       obj[value] = count;
//       // }
//     }

//     console.log(obj);
//     setGrid((prev) => ({ ...prev, ...obj }));
//   }

//   function handleCellUpdate(key) {
//     console.log(key);
//     if (isFirstClick) {
//       updateGridOnFirstClick(key);
//       updateFirstClick();
//       return;
//     }
//     if (grid[key] === true) {
//       stopTimer();
//       setGameResult("You lost!!");
//       resultModalRef.current.open();
//       return;
//     }
//     if (grid[key]) {
//       return;
//     }

//     setGrid((prev) => {
//       const nearestPositions = getNearestPositionsCount(key);
//       const hasFalseValues = Object.values(prev).filter(
//         (value) => value === false
//       );
//       if (hasFalseValues.length === 1) {
//         stopTimer();
//         setGameResult("You Won!!");
//         resultModalRef.current.open();
//       }
//       let count = 0;
//       nearestPositions.forEach((position) => {
//         if (grid[position] === true) {
//           count++;
//         }
//       });
//       return { ...prev, [key]: count };
//     });
//   }

//   function getNearestPositionsCount(key) {
//     const [i, j] = key.split(" ");
//     const arr = [
//       i - 1 + " " + (j - 1),
//       i - 1 + " " + j,
//       i - 1 + " " + (-(-j) + 1),
//       i + " " + (j - 1),
//       i + " " + j,
//       i + " " + (-(-j) + 1),
//       -(-i) + 1 + " " + (j - 1),
//       -(-i) + 1 + " " + j,
//       -(-i) + 1 + " " + (-(-j) + 1),
//     ];
//     const nearestPositions = arr.filter((position) => {
//       const [x, y] = position.split(" ");
//       if (
//         Number(x) >= 0 &&
//         Number(x) < Number(formValues.rows) &&
//         Number(y) >= 0 &&
//         Number(y) < Number(formValues.cols) &&
//         x + " " + y !== key
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     return nearestPositions;
//   }

//   function handleRightClick(event, key) {
//     event.preventDefault();
//     gridCtx.flagCell(key);
//   }

//   return (
//     <div
//       style={{
//         gridTemplateColumns: `repeat(${gridCtx.formValues?.cols}, minmax(0, 1fr))`,
//         width: "570px",
//         height: "500px",
//       }}
//       className="grid place-content-center h-48"
//     >
//       {gridCtx.grid &&
//         Object.keys(gridCtx.grid)
//           .sort((a, b) => {
//             const num1 = a.split(" ");
//             const num2 = b.split(" ");
//             return num1[0] - num2[0];
//           })
//           .map((value, index) => (
//             <button
//               key={index}
//               onClick={() => handleCellUpdate(value)}
//               onContextMenu={(event) => handleRightClick(event, value)}
//             >
//               <div
//                 className={
//                   gridCtx.grid[value] !== false &&
//                   gridCtx.grid[value] !== true &&
//                   gridCtx.grid[value] !== "flag"
//                     ? "GridEmpty"
//                     : "GridCell"
//                 }
//                 style={{
//                   backgroundColor: `${
//                     (Number(value.split(" ")[0]) +
//                       Number(value.split(" ")[1])) %
//                       2 ===
//                     0
//                       ? (gridCtx.grid[value] || gridCtx.grid[value] === 0) &&
//                         gridCtx.grid[value] !== true &&
//                         gridCtx.grid[value] !== "flag"
//                         ? "#cca97c"
//                         : "rgb(163 230 53)"
//                       : (gridCtx.grid[value] || gridCtx.grid[value] === 0) &&
//                         gridCtx.grid[value] !== true &&
//                         gridCtx.grid[value] !== "flag"
//                       ? "burlywood"
//                       : "rgb(190 242 100)"
//                   }`,
//                 }}
//               >
//                 {gridCtx.grid[value] !== false &&
//                   gridCtx.grid[value] !== 0 &&
//                   gridCtx.grid[value] !== "flag" &&
//                   gridCtx.grid[value] !== true && (
//                     <div className="GridEmpty font-extrabold flex justify-center items-center ">
//                       {gridCtx.grid[value]}
//                     </div>
//                   )}
//                 {gameResult && gridCtx.grid[value] === true && (
//                   <div
//                     style={{
//                       backgroundColor: `${
//                         colors[Math.floor(Math.random() * colors.length)]
//                       }`,
//                     }}
//                     className={`flex justify-center cell-size content-center ${
//                       bgColors[Math.floor(Math.random() * bgColors.length)]
//                     }`}
//                   >
//                     <img src={mineSvg} className="h-4" />
//                   </div>
//                 )}
//                 {gridCtx.grid[value] === "flag" && (
//                   <div className="flex justify-center cell-size content-center">
//                     <img src={flagSvg} className="cell-icon" />
//                   </div>
//                 )}
//               </div>
//             </button>
//           ))}
//     </div>
//   );
// }
