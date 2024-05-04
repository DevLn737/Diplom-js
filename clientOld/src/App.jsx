import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="border-b[#e6ebf4] flex w-full items-center justify-between border-b bg-white px-4 py-4 sm:px-8">
        <Link to="/">
          <div className="flex">
            <img src={logo} className="w-12 object-contain" alt="logo" />
            <div className="text-md hidden h-12 px-2 py-3 align-middle font-semibold text-gray-800 xl:block">
              Stable <span className=" text-blue-600">Diffusion</span>
            </div>
          </div>
        </Link>
        <Link
          to="/create-post"
          className="rounded-md bg-[#6469ff] px-4 py-2 font-inter font-medium text-white"
        >
          Создать
        </Link>
      </header>
      <main className="min-h[calc(100vh - 73px)] w-full bg-[#f9fafe] px-4 py-8 sm:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
