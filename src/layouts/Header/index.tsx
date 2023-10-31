import React from 'react';

export default function Header() {
  return (
    <div className="h-full w-full flex justify-between items-center">
      <div className="header-container__left ml-6">
        <div className="i-logos-vitejs text-4xl"></div>
      </div>
      <div className="header-container__right mr-6 flex gap-4">
        <div className="text-xl cursor-pointer hover:text-gray-700">首页</div> <div className="text-xl  cursor-pointer hover:text-gray-700">文档</div>
        <div className="text-xl  cursor-pointer hover:text-gray-700">社区</div>
        {/* <div className="i-logos-react text-2xl"></div>
        <div className="i-logos-prometheus text-2xl"></div>
        <div className="i-logos-visual-studio-code text-2xl"></div> */}
      </div>
    </div>
  );
}
