'use strict';

var React = require('react');
var cache = require('next/cache');
var Image = require('next/image');

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

/**
 * Custom hook to have a callback called repeatingly.
 * @param interval Time to wait before triggering the callback.
 * @param callback Callback to call after each interval.
 */
function useRepeatingCallback(interval, callback) {
    React.useEffect(function () {
        var autoPlayInterval = setInterval(function () {
            callback();
        }, interval);
        return function () { return clearInterval(autoPlayInterval); };
    });
}

/**
 * Get the window dimensions.
 * @returns The current window dimensions.
 */
var getWindowDimensions = function () {
    if (typeof window === "undefined") {
        return { width: 0, height: 0 };
    }
    var width = window.innerWidth, height = window.innerHeight;
    return {
        width: width,
        height: height,
    };
};
/**
 * Custom hook to get the window dimensions, updated on each window resizing.
 * @returns The current window dimensions.
 */
function useWindowDimensions() {
    var _a = React.useState(getWindowDimensions()), windowDimensions = _a[0], setWindowDimensions = _a[1];
    React.useEffect(function () {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return windowDimensions;
}

/**
 * Directions used in useScrollingNavigation.
 */
exports.Direction = void 0;
(function (Direction) {
    Direction[Direction["x"] = 0] = "x";
    Direction[Direction["y"] = 1] = "y";
})(exports.Direction || (exports.Direction = {}));
/**
 * Custom hook to implement a scrolling navigation in a HTML element.
 * @param getScrollContainer Function to retrieve the scroll container.
 * @param elementsIds List of IDs to retrieve the elements to navigate between.
 * @param activeElementId The currently active element.
 * @param direction Navigation direction.
 * @param margin Margin to apply when scrolling to the active element.
 * @returns The currently active element.
 */
function useScrollingNavigation(getScrollContainer, elementsIds, activeElementId, direction, margin) {
    if (activeElementId === void 0) { activeElementId = ""; }
    if (direction === void 0) { direction = exports.Direction.y; }
    if (margin === void 0) { margin = 0; }
    // State storing the active element, i.e. the element currently scrolled on
    var _a = React.useState(activeElementId), activeElement = _a[0], setActiveElement = _a[1];
    // State storing the element to scroll to
    var _b = React.useState(activeElementId), targetElement = _b[0], setTargetElement = _b[1];
    // Window's dimensions, it is useful for determining which element is currently scrolled on
    var windowDimensions = useWindowDimensions();
    // Update targetElement with the activeElementId given as a property
    React.useEffect(function () {
        setTargetElement(activeElementId);
    }, [activeElementId]);
    // Scroll whenever targetElement changes
    React.useEffect(function () {
        // Scroll to the target element
        var scroll = function () {
            if (targetElement === "")
                return;
            var container = getScrollContainer();
            var element = document.getElementById(targetElement);
            if (container && element) {
                var _a = getScroll(container), scrollToX = _a[0], scrollToY = _a[1];
                scrollToX += element.getBoundingClientRect().left - margin;
                scrollToY += element.getBoundingClientRect().top - margin;
                container.scrollTo({
                    left: direction === exports.Direction.x ? scrollToX : 0,
                    top: direction === exports.Direction.y ? scrollToY : 0,
                    behavior: "smooth",
                });
            }
        };
        scroll();
    }, [targetElement, getScrollContainer, direction, margin]);
    // Listen to the "scroll" event of the container to update the activeElement
    React.useEffect(function () {
        var container = getScrollContainer();
        if (!container) {
            return;
        }
        // Check the current scroll to determine which element is currently scrolled on (the activeElement)
        var determineActiveElement = function () {
            elementsIds.forEach(function (elementId) {
                var section = document.getElementById(elementId);
                if (section) {
                    var rect = section.getBoundingClientRect();
                    if (direction === exports.Direction.x) {
                        if (rect.left <= windowDimensions.width * 0.1 &&
                            rect.right >= windowDimensions.width * 0.9) {
                            setActiveElement(elementId);
                        }
                    }
                    else {
                        if (rect.top <= 120 && rect.bottom >= 120) {
                            setActiveElement(elementId);
                        }
                    }
                }
            });
        };
        container.addEventListener("scroll", determineActiveElement);
        return function () {
            container.removeEventListener("scroll", determineActiveElement);
        };
    });
    return activeElement;
}

/**
 * Custom hook to add a CSS class to a group of HTML elements depending on their visibility.
 * @param selector CSS selector to get the elements to interact with.
 * @param classToAdd CSS class to add to the currently visible elements.
 * @param options Additional options for the IntersectionObserver.
 * @param debug If true, adds some debug logs.
 */
function useScrollVisiblityObserver(selector, classToAdd, options, debug) {
    if (debug === void 0) { debug = false; }
    var addObserver = function (element, classToAdd) {
        if (!classToAdd)
            return;
        var observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(classToAdd);
                }
                else {
                    entry.target.classList.remove(classToAdd);
                }
            });
        }, options);
        observer.observe(element);
    };
    var observe = function (selector, classToAdd) {
        var elements = document.querySelectorAll(selector);
        if (debug) {
            console.log(selector, elements);
        }
        elements.forEach(function (element) {
            addObserver(element, classToAdd);
        });
    };
    React.useEffect(function () {
        observe(selector, classToAdd);
    });
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Static class to call Wordpress API endpoints.
 */
var WordpressAPI = /** @class */ (function () {
    function WordpressAPI() {
        /**
         * @var {string} API_URL URL to the Wordpress API.
         */
        this.API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL + "/wp-json";
        /**
         * @var {string} RESSOURCE_PATH Path to Wordpress API ressources (posts, pages, etc.).
         */
        this.RESSOURCE_PATH = "/wp/v2";
        /**
         * @var {Object} URLs A convenient way to store the URLs to the Wordpress API
         */
        this.URLs = {
            // GET
            settings: this.API_URL,
            metadata: this.API_URL + "/custom/metadata",
            menu: this.API_URL + "/custom/menu",
            theme: this.API_URL + "/custom/theme",
            about: this.API_URL + "/custom/about",
            contact: this.API_URL + "/custom/contact",
            footer: this.API_URL + "/custom/footer",
            categories: this.API_URL + this.RESSOURCE_PATH + "/categories",
            pages: this.API_URL + this.RESSOURCE_PATH + "/pages",
            highlights: this.API_URL + this.RESSOURCE_PATH + "/highlight",
            galleries: this.API_URL + this.RESSOURCE_PATH + "/gallery",
            mediaFile: this.API_URL + this.RESSOURCE_PATH + "/media",
            // POST
            sendEmail: this.API_URL + "/custom/contact/send",
        };
    }
    WordpressAPI.getInstance = function () {
        if (WordpressAPI._instance === undefined) {
            WordpressAPI._instance = new WordpressAPI();
        }
        return WordpressAPI._instance;
    };
    /**
     * Send GET query to the specified URL.
     * @param url URL to perform the GET query to.
     * @returns A Promise with the response, in the provided T format.
     */
    WordpressAPI.prototype.Get = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        console.log("Fetching " + url + "...");
                        if (!response.ok) {
                            throw new Error("Network response was not OK.");
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        console.log("Fetch successful!");
                        return [2 /*return*/, data];
                    case 3:
                        error_1 = _a.sent();
                        console.error("There has been a problem with your fetch operation.", error_1);
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WordpressAPI.prototype.testUrl = function () {
        return this.URLs.metadata;
    };
    /**
     * Fetch the general Settings from Wordpress API.
     * @returns The Promise to get the requested Settings.
     */
    WordpressAPI.prototype.fetchSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.settings)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the site's metadata from Wordpress API.
     * @returns The Promise to get the requested Metadata.
     */
    WordpressAPI.prototype.fetchMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.metadata)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the Menu from Wordpress API.
     * @returns The Promise to get the requested Menu.
     */
    WordpressAPI.prototype.fetchMenu = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.menu)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the Highlights (as Galleries) from Wordpress API.
     * @returns The Promise to get the requested Galleries.
     */
    WordpressAPI.prototype.fetchHighlights = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.highlights)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the Galleries from Wordpress API.
     * @returns The Promise to get the requested Galleries.
     */
    WordpressAPI.prototype.fetchGalleries = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.galleries)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the About page content from Wordpress API.
     * @returns The Promise to get the requested About contetn.
     */
    WordpressAPI.prototype.fetchAbout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.about)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the Contact form content from the Wordpress API.
     * @returns The Promise to get the requested Contact form content.
     */
    WordpressAPI.prototype.fetchContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.contact)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Fetch the Footer content from the Wordpress API.
     * @returns The Promise to get the Footer content.
     */
    WordpressAPI.prototype.fetchFooter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cache.unstable_noStore();
                        return [4 /*yield*/, this.Get(this.URLs.footer)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return WordpressAPI;
}());

var styles = {"tablet":"992px","mobile":"576px","container":"wide-2-columns-module_container__Ns-G4","picture":"wide-2-columns-module_picture__rtwG9","fixed":"wide-2-columns-module_fixed__0b43N","animate":"wide-2-columns-module_animate__dfCiK","reverse":"wide-2-columns-module_reverse__f4PH-","content":"wide-2-columns-module_content__nNpxv"};

exports.Layout = void 0;
(function (Layout) {
    Layout[Layout["PictureFirst"] = 0] = "PictureFirst";
    Layout[Layout["ContentFirst"] = 1] = "ContentFirst";
})(exports.Layout || (exports.Layout = {}));
function Wide2Columns(_a) {
    var picture = _a.picture, _b = _a.layout, layout = _b === void 0 ? exports.Layout.ContentFirst : _b, children = _a.children, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.animate, animate = _d === void 0 ? false : _d;
    useScrollVisiblityObserver("." + styles.picture + " img", animate ? styles.animate : "");
    return (React.createElement("div", { className: "\n        ".concat(className, "\n        ").concat(styles.container, "\n        ").concat(layout === exports.Layout.ContentFirst ? styles.reverse : "", "\n      ") },
        React.createElement("div", { className: styles.picture },
            React.createElement(Image, { src: picture.full_image_url, alt: picture.title, height: picture.media_details.height, width: picture.media_details.width, className: animate ? "" : styles.fixed })),
        React.createElement("div", { className: "".concat(styles.content) }, children)));
}

function TestComponent(_a) {
    var theme = _a.theme;
    return (React.createElement("div", { "data-testid": "test-component", className: "test-component test-component-".concat(theme) },
        React.createElement("h1", { className: "heading" }, "I'm the test component"),
        React.createElement("h2", null, "Made with love by Harvey")));
}

exports.TestComponent = TestComponent;
exports.Wide2Columns = Wide2Columns;
exports.WordpressAPI = WordpressAPI;
exports.getScroll = getScroll;
exports.getUID = getUID;
exports.useRepeatingCallback = useRepeatingCallback;
exports.useScrollVisiblityObserver = useScrollVisiblityObserver;
exports.useScrollingNavigation = useScrollingNavigation;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
