"use client";

import Image from "next/image";
import { useState } from "react";

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = selectedFiles.filter(
      (file) => file.size <= 2 * 1024 * 1024
    ); // max 2MB
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-lg max-w-xl mx-auto">
      <div className="text-center py-10 bg-gray-50 rounded-md border border-gray-200 mb-4">
        <span className="inline-flex justify-center items-center size-16">
          <svg
            className="shrink-0 w-16 h-auto"
            width="71"
            height="51"
            viewBox="0 0 71 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.55172 8.74547L17.7131 6.88524V40.7377L12.8018 41.7717C9.51306 42.464 6.29705 40.3203 5.67081 37.0184L1.64319 15.7818C1.01599 12.4748 3.23148 9.29884 6.55172 8.74547Z"
              stroke="#2563EB"
              stroke-width="2"
            ></path>
            <path
              d="M64.4483 8.74547L53.2869 6.88524V40.7377L58.1982 41.7717C61.4869 42.464 64.703 40.3203 65.3292 37.0184L69.3568 15.7818C69.984 12.4748 67.7685 9.29884 64.4483 8.74547Z"
              stroke="#2563EB"
              stroke-width="2"
            ></path>
            <g filter="url(#filter3)">
              <rect
                x="17.5656"
                y="1"
                width="35.8689"
                height="42.7541"
                rx="5"
                stroke="#2563EB"
                stroke-width="2"
                shape-rendering="crispEdges"
              ></rect>
            </g>
            <path
              d="M39.4826 33.0893C40.2331 33.9529 41.5385 34.0028 42.3537 33.2426L42.5099 33.0796L47.7453 26.976L53.4347 33.0981V38.7544C53.4346 41.5156 51.1959 43.7542 48.4347 43.7544H22.5656C19.8043 43.7544 17.5657 41.5157 17.5656 38.7544V35.2934L29.9728 22.145L39.4826 33.0893Z"
              className="fill-blue-50 dark:fill-blue-900/50"
              fill="currentColor"
              stroke="#2563EB"
              stroke-width="2"
            ></path>
            <circle
              cx="40.0902"
              cy="14.3443"
              r="4.16393"
              className="fill-blue-50 dark:fill-blue-900/50"
              fill="currentColor"
              stroke="#2563EB"
              stroke-width="2"
            ></circle>
            <defs>
              <filter
                id="filter3"
                x="13.5656"
                y="0"
                width="43.8689"
                height="50.7541"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood
                  flood-opacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="3"></feOffset>
                <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect3"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect3"
                  result="shape"
                ></feBlend>
              </filter>
            </defs>
          </svg>
        </span>
        <p className="text-sm text-gray-500">
          Drop your file here or{" "}
          <label
            htmlFor="file-upload"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            browse
          </label>
        </p>
        <p className="text-xs text-gray-400">Pick a file up to 2MB.</p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file, index) => {
          const url = URL.createObjectURL(file);
          return (
            <div
              key={index}
              className="relative group border rounded-md p-1 shadow-sm"
            >
              <Image
                src={url}
                alt={file.name}
                className="w-full h-24 object-cover rounded-md"
                width={120}
                height={120}
              />
              <div className="mb-1 flex justify-between items-center pt-2 gap-x-3 whitespace-nowrap">
                <div className="w-10">
                  <span className="text-sm text-gray-800 dark:text-white">
                    <span>100</span>%
                  </span>
                </div>

                <div className="flex items-center gap-x-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                    data-hs-file-upload-remove=""
                  >
                    <svg
                      className="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                role="progressbar"
              >
                <div
                  className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-500"
                  style={{ width: 120 }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
