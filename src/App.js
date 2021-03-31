import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {Route, Router, Switch, withRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";

// import routes
import Header from "./components/Header/Header";
import Splash from "./routes/Splash";
import Projects from "./routes/Projects";
import Contact from "./routes/Contact";

function App(props) {
  const [mouseX, setMouseX] = useState(3);
  const [mouseY, setMouseY] = useState(3);
  const [vanta, setVanta] = useState({});

  function _onMouseMove(e) {
    setMouseY(e.screenY);
    setMouseX(e.screenX);
  }
  // Background code
  // useEffect(() => {
  //   setVanta(
  //     window.VANTA.WAVES({
  //       el: "#background",
  //       color: 0x0,
  //       waveHeight: 16.0,
  //       waveSpeed: 0.2,
  //       zoom: 1.02,
  //     })
  //   );
  // }, []);

  return (
    <div
      onMouseMove={e => {
        _onMouseMove(e);
      }}
      className='wrapper'>
      <div id='background' />
      <Header mouseX={mouseX} mouseY={mouseY} />

      <div className='routeWrapper'>
        <Route
          className='potato'
          render={({location}) => (
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames='fade'
                timeout={600}>
                <Switch location={location} >
                  <Route exact path='/' component={Splash} />
                  <Route path='/projects/' component={Projects} />
                  <Route path='/contact/' component={Contact} />
                  <Route path='/butt/' component={Splash} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    </div>
  );
}

export default withRouter(App);
