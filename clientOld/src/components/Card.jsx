import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, description, url, owner }) => {
  return (
    <div className="group relative rounded-xl shadow-card hover:shadow-cardhover">
      <img
        className="h-auto w-full rounded-xl object-cover"
        src={url}
        alt={description}
      />
      <div className="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-[#10131f] p-4  group-hover:flex">
        <p className="overflow-y-auto text-sm text-white">{description}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover text-xs font-bold text-white">
              {owner.username[0]}
            </div>
            <p className="text-sm text-white">{owner.username}</p>
          </div>

          <button
            type="button"
            onClick={() => downloadImage(_id, url)}
            className="border-none bg-transparent outline-none"
          >
            <img
              src={download}
              alt="download"
              className="obcjet-contain h-6 w-6 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
