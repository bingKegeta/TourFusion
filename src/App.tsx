import { Viewer } from "cesium";
import React, { useEffect, useRef } from "react";
import "./App.css";


function App() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const map = new Viewer(divRef.current);
      return () => map.destroy();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="cesium" ref={divRef} />
      </header>
    </div>
  );
}

export default App;
