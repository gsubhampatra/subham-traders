import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-primary-bg text-primary-dark transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-4">
          <ul className="flex flex-col justify-center h-screen mt-4 space-y-4 text-2xl font-semibold">
            <li className="mb-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block p-2 text-center rounded-lg hover:bg-secondary-dark hover:text-primary-bg"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/customer"
                onClick={() => setIsOpen(false)}
                className="block p-2 text-center rounded-lg hover:bg-secondary-dark hover:text-primary-bg"
              >
                Customers
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/stock"
                onClick={() => setIsOpen(false)}
                className="block p-2 text-center rounded-lg hover:bg-secondary-dark hover:text-primary-bg"
              >
                Stock
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/transactions"
                onClick={() => setIsOpen(false)}
                className="block p-2 text-center rounded-lg hover:bg-secondary-dark hover:text-primary-bg"
              >
                Transactions
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/dealer"
                onClick={() => setIsOpen(false)}
                className="block p-2 text-center rounded-lg hover:bg-secondary-dark hover:text-primary-bg"
              >
                Dealers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 z-50 p-4 text-white md:hidden bg-primary top-20"
      >
        {isOpen ? <RiMenuFoldLine size={24} /> : <RiMenuUnfoldLine size={24} />}
      </button>
    </div>
  );
};

export default Sidebar;
