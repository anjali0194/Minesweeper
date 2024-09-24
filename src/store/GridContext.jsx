import { createContext, useReducer } from "react";

const GridContext = createContext({
  grid: {},
  flags: 0,
  result: "",
  mines: [],
  formValues: { rows: 8, cols: 10, mines: 10 },
  createGrid: () => {},
  revealCell: (key) => {},
  flagCell: (key) => {},
  //   clearCart: () => {},
});

function gridReducer(state, action) {
  if (action.type === "CREATE_GRID") {
    const { formValue } = action;
    const { rows, cols, minesCount } = { ...state.formValues, formValue };
    if (rows >= 4 && cols >= 4 && minesCount >= 1 && minesCount < rows * cols) {
      let obj = {};
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          obj[i + " " + j] = false;
        }
      }
    }
    return { ...state, formValues, grid: obj };
  }

  if (action.type === "FLAG_CELL") {
    const { key } = action;
    let flags = state.flags;
    let obj = { ...state.grid };
    if (obj[key] === "flag") {
      flags += 1;
      if (state.mines.includes(key)) {
        obj[key] = true;
      } else {
        obj[key] = false;
      }
    } else {
      flags -= 1;
      obj[key] = flag;
    }

    return { ...state, grid: obj, flags };
  }

  if (action.type === "REVEAL_CELL") {
    if (isFirstClick) {
      updateGridOnFirstClick(key);
      updateFirstClick();
      return;
    }
    if (grid[key] === true) {
      stopTimer();
      setGameResult("You lost!!");
      resultModalRef.current.open();
      return;
    }
    if (grid[key]) {
      return;
    }

    let obj = {};
    setGrid((prev) => {
      const nearestPositions = getNearestPositionsCount(key);
      const hasFalseValues = Object.values(prev).filter(
        (value) => value === false
      );
      if (hasFalseValues.length === 1) {
        stopTimer();
        setGameResult("You Won!!");
        resultModalRef.current.open();
      }
      let count = 0;
      nearestPositions.forEach((position) => {
        if (grid[position] === true) {
          count++;
        }
      });
      return { ...prev, [key]: count };
    });

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [grid, dispatchGridAction] = useReducer(gridReducer, {
    grid: {},
    flags: 0,
    result: "",
    mines: [],
    rows: 8,
    cols: 10,
    mines: 10,
  });

  function createGrid(formValue) {
    dispatchGridAction({ type: "CREATE_GRID", formValue });
  }

  function flagCell(key) {
    dispatchGridAction({ type: "FLAG_CELL", key });
  }

  function revealCell(key) {
    dispatchGridAction({ type: "REVEAL_CELL", key });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const gridContext = {
    grid: grid.obj,
    createGrid,
    flagCell,
    revealCell,
    removeItem,
    clearCart,
  };

  return (
    <GridContext.Provider value={gridContext}>{children}</GridContext.Provider>
  );
}

export default CartContext;
