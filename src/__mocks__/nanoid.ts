let id = 0;

beforeEach(() => {
  id = 0;
});

export const nanoid = (): string => {
  id++;
  return `mock-nanoid-${id}`;
};
