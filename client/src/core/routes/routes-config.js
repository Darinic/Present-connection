import {appRoutes} from "./routes";

import Homepage from "../../pages/Homepage/Homepage";
import AllThoughts from "../../pages/AllThoughts/AllThoughts";
import NewThought from "../../pages/NewThought/NewThought";
import ThoughtDetails from "../../pages/ThoughtDetails/ThoughtDetails";

const routesConfig = [
  {
    path: appRoutes.HOMEPAGE,
    element: <Homepage />,
  },
  {
    path: appRoutes.ALLTHOUGHTS,
    element: <AllThoughts />,
  },
  {
    path: appRoutes.NEWTHOUGHT,
    element: <NewThought />,
  },
  {
    path: appRoutes.THOUGHTDETAILS,
    element: <ThoughtDetails />,
  },
];

export default routesConfig;
