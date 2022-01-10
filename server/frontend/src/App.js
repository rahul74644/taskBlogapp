
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./Pages/Home";
import DetailPage from "./Pages/DetailPage";
import WritePost from "./Pages/WritePost";

function App() {
  return (
    <BrowserRouter>
      <div class="container-fluid p-0 " >
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blog/:id" component={DetailPage} />
          <Route exact path="/write" component={WritePost} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
