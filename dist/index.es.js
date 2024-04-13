import React from 'react';

/**
 * Return the scroll properties of the given element.
 * @param element The element to get the scroll from.
 * @returns {Array<number>} The scroll data of the element.
 */
function getScroll(element) {
    var elementAsWindow = element;
    var elementAsHTMLElement = element;
    if (elementAsWindow.scrollX !== undefined) {
        return [elementAsWindow.scrollX, elementAsWindow.scrollY];
    }
    else if (elementAsHTMLElement.scrollLeft !== undefined) {
        return [elementAsHTMLElement.scrollLeft, elementAsHTMLElement.scrollTop];
    }
    else {
        console.error("The element is neither of type Window or HTMLElement", element);
        return [0, 0];
    }
}
// 
/**
 * Generate an unique ID.
 * @returns {string} A unique ID.
 */
function getUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".test-component {\n  background-color: white;\n  border: 1px solid black;\n  padding: 16px;\n  width: 360px;\n  text-align: center; }\n  .test-component .heading {\n    font-size: 64px; }\n  .test-component.test-component-secondary {\n    background-color: black;\n    color: white; }\n";
styleInject(css_248z);

function TestComponent(_a) {
    var theme = _a.theme;
    return (React.createElement("div", { "data-testid": "test-component", className: "test-component test-component-".concat(theme) },
        React.createElement("h1", { className: "heading" }, "I'm the test component"),
        React.createElement("h2", null, "Made with love by Harvey")));
}

export { TestComponent, getScroll, getUID };
//# sourceMappingURL=index.es.js.map
