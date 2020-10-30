import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export const MOCK_UUID = "Uakgb_J5m9g-0JDMbcJqLJ";

jest.mock("nanoid", () => ({ nanoid: () => MOCK_UUID }));
