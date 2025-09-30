"use client";

import React from "react";
import { Button } from "../ui/button";

type ErrorStateProps = {
  message: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-4 py-10 text-center">
      <p className="text-md font-semibold">{message}</p>
      <Button onClick={handleRefresh} size={"lg"}>
        Coba Lagi
      </Button>
    </div>
  );
};

export default ErrorState;
