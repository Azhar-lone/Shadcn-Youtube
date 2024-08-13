import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GeneralError from "@/components/myUi/error";
import Home from "@/pages/Home";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <GeneralError />,
    // children: [
    //   {
    //     path: "/",
    //     element: <MainContainer />
    //   },
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
    // ]
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
