import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";

import Rootlayout from "./layouts/Root";
import GeneralError from "@/components/myUi/error";
import Home from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    errorElement: <GeneralError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      //   {
      //     path: "watch",
      //     element: <WatchVideo />
      //   },
      //   {
      //     path: "results",
      //     element: <SearchResults />
      //   },
      //   {
      //     path: "subscriptions",
      //     element: <Subscriptions />
      //   },
      //   {
      //     path: "watchlater",
      //     element: <WatchLater />
      //   },
      //   {
      //     path: "liked",
      //     element: <LikedVideos />
      //   },
      //   {
      //     path: "feed/:category",
      //     element: <Category />
      //   }
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
