import { useEffect, useReducer } from "react";
import { ObservableValue } from "../../common/hex/observable_value";
import { getRandomId } from "../../common/utils/random_id";

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

export const useUpdate = () => {
  const [, update] = useReducer(updateReducer, 0);
  return update as () => void;
};

export function useAsyncValue<T>(observable: ObservableValue<T>) {
  const update = useUpdate();
  const id = getRandomId();
  useEffect(() => {
    observable.onChange(update, id);
    return () => observable.unsubscribe(id);
  }, [observable, id, update]);

  return observable.getValue();
}
