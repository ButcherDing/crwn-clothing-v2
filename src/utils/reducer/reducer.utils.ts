import { AnyAction } from "redux";
//// We have two types, aliens and humans, with different abilities

// type Alien = {
//   fly: () => {};
// };

// type Human = {
//   speak: () => {};
// };

// function isHuman(entity: Human | Alien): entity is Human {
//   return (entity as Human).speak !== undefined;
// }

// const Josh;

// if (isHuman(Josh)) {
//   Josh.speak();
// }

//////  The key logic - we cast what is passed into the function as Human, and try to call .speak method. If it doesn't have .speak, it will return undefined. If it's undefined, then it can't pass the function in our code. We'll see that Josh isn't human immediately, without running our code.

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// Function overloading below - make multiple function type defs of same name. Allows it to recieve diff parameter types
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
