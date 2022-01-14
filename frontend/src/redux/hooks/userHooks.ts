import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthPayload, setLoginPending } from "../modules/auth";
import { RootState } from "../store";

export default function useUserHooks() {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const login = useCallback((data: AuthPayload) => {
    dispatch(setLoginPending(data));
  }, []);

  return { isLoading, login };
}
