import React, { useState } from "react";
import logoo from "../assets/logo.png";
const months = [
  { value: "", label: "Tüm Aylar" },
  { value: "01", label: "Ocak" },
  { value: "02", label: "Şubat" },
  { value: "03", label: "Mart" },
  { value: "04", label: "Nisan" },
  { value: "05", label: "Mayıs" },
  { value: "06", label: "Haziran" },
  { value: "07", label: "Temmuz" },
  { value: "08", label: "Ağustos" },
  { value: "09", label: "Eylül" },
  { value: "10", label: "Ekim" },
  { value: "11", label: "Kasım" },
  { value: "12", label: "Aralık" },
];
const closeIconPath =
  "M18.364 6.364a1 1 0 010 1.414L13.414 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414L10.586 12 5.636 7.05a1 1 0 011.414-1.414L12 10.586l4.95-4.95a1 1 0 011.414 0z";
const openIconPath =
  "M4 5h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 7h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1zm0 7h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1z";
const renderYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2015;
  const years = [];

  years.push(
    <option key="all" value="">
      Tüm Yıllar
    </option>
  );

  for (let year = currentYear; year >= startYear; year--) {
    years.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return years;
};

function Navbar({
  nameFilter,
  setNameFilter,
  monthFilter,
  setMonthFilter,
  yearFilter,
  setYearFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logoo} alt="Ofis Logosu" className="h-14 w-32" />
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-custom-blue focus:outline-none"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={isOpen ? closeIconPath : openIconPath}
              />
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <input
              type="text"
              placeholder="İsim Soyisim"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="input-style"
            />

            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="input-style appearance-none"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="input-style appearance-none"
            >
              {renderYearOptions()}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
