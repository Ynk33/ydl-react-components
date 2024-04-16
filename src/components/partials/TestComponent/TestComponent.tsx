import React from "react";
import { TestComponentProps } from "./TestComponent.types";

import style from "./TestComponent.module.scss";

function TestComponent({ theme } : TestComponentProps) {
  return (
    <div
      data-testid="test-component"
      className={`${style.testComponent} ${style[theme]}`}
    >
      <h1 className="heading">I'm the test component</h1>
      <h2>Made with love by Harvey</h2>
    </div>
  );
};

export default TestComponent;