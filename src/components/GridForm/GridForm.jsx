import { useEffect, useState } from "react";

export default function GridForm({ createGrid }) {
  const [formValues, setFormValues] = useState({
    rows: 10,
    cols: 8,
    minesCount: 10,
  });

  useEffect(() => {
    if (formValues) {
      createGrid(formValues);
    }
  }, [formValues]);

  function handleFormUpdate(event, identifier) {
    setFormValues((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }

  return (
    <form className="flex">
      <div className="mr-4">
        <label
          htmlFor="rows"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Enter Rows
        </label>
        <div className="mt-2">
          <input
            id="rows"
            name="rows"
            type="number"
            required
            min="8"
            value={formValues?.rows}
            onChange={(event) => handleFormUpdate(event, "rows")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div className="mr-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="columns"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Columns
          </label>
        </div>
        <div className="mt-2">
          <input
            id="columns"
            name="columns"
            type="number"
            required
            min="10"
            value={formValues?.cols}
            onChange={(event) => handleFormUpdate(event, "cols")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="minesCount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Enter Number of mines
          </label>
        </div>
        <div className="mt-2">
          <input
            id="minesCount"
            name="minesCount"
            type="number"
            required
            min="8"
            value={formValues?.minesCount}
            onChange={(event) => handleFormUpdate(event, "minesCount")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </form>
  );
}
