import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

function Dropdowns({
  currencies,
  currency,
  setcurrency,
  favourites,
  setfavourites,
  title = "",
}) {
  const isfav = (curr) => favourites.includes(curr);

  return (
    <div>
      <label className="mb-5 font-semibold text-center" htmlFor={title}>
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => {
            setcurrency(e.target.value);
          }}
          className="w-[100px] p-2 bg-slate-800 text-white border-white border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {favourites.map((fav, index) => (
            <option className="bg-slate-500" value={fav} key={index}>
              {fav}
            </option>
          ))}
          <hr />
          {currencies
            .filter((c) => !favourites.includes(c))
            .map((curr, index) => (
              <option value={curr} key={`currency-${index}`}>
                {curr}
              </option>
            ))}
        </select>
        <button
          onClick={() => setfavourites(currency)}
          className="absolute inset-y-0 left-16 pr-5 flex items-center text-sm leading-5 text-white"
        >
          {isfav(currency) ? <FaStar /> : <FaRegStar />}
        </button>
      </div>
    </div>
  );
}

export default Dropdowns;
