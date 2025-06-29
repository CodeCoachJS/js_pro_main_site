"use client";

import React from "react";
import { PRIVATE_PAGE_MESSAGE } from "~/consts";

const PrivatePageWarning: React.FC = () => {
  return (
    <div className="m-10 flex items-center justify-center">
      <h1 className="animate-pulse text-center text-2xl font-bold text-red-600">
        {`🚨 ${PRIVATE_PAGE_MESSAGE} 🚨`}
        <p className="mt-4 text-lg text-gray-700">
          Proceed with caution! This page is more exclusive than a secret
          superhero lair. 🦸‍♂️
        </p>
      </h1>
    </div>
  );
};

export default PrivatePageWarning;
