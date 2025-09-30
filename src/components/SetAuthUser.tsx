"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";

type Props = {
  user: any; // Bisa diketik sesuai kebutuhan
};

export const SetAuthUser = ({ user }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};
