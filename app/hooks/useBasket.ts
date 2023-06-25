import { SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

interface useBasketProps {
  currentUser: SafeUser | null;
  id: string;
}

const useBasket = ({ currentUser, id }: useBasketProps) => {
  const router = useRouter();
  const hasBasket = useMemo(() => {
    const list = currentUser?.basketIds || [];
    return list.includes(id);
  }, [currentUser, id]);

  const toggleBasket = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
       e.stopPropagation();
      try {
        let request;
        if (hasBasket) {
          request = () => axios.delete(`/api/basket/${id}`);
        } else {
          request = () => axios.post(`/api/basket/${id}`);
        }

        await request();
        router.refresh();
      } catch (error: any) {
        throw new Error(error);
      }
    },
    [currentUser, hasBasket, id, router]
  );

  return {
    hasBasket,
    toggleBasket,
  };
};
export default useBasket;
