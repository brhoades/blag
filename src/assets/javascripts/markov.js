var markov =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/markov.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/markov.js":
/*!***********************!*\
  !*** ./src/markov.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports.graphs = __webpack_require__(/*! ./markov/graphs.js */ \"./src/markov/graphs.js\");\nmodule.exports.graphing = __webpack_require__(/*! ./markov/graphing.js */ \"./src/markov/graphing.js\");\n\n//# sourceURL=webpack://%5Bname%5D/./src/markov.js?");

/***/ }),

/***/ "./src/markov/graphing.js":
/*!********************************!*\
  !*** ./src/markov/graphing.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//Draw the Rectangle\n\nvar addChain = function addChain(g, x, y, text) {\n  var height = 50,\n    width = 100,\n    font_size = 10,\n    pointer_size = 30;\n  var rect = g.append(\"rect\").attr(\"x\", x).attr(\"y\", y).attr(\"width\", width - pointer_size).attr(\"height\", height).attr('stroke', 'black').style(\"fill-opacity\", \"0.1\");\n\n  // Outer for the pointer\n  var outerrect = g.append(\"rect\").attr(\"x\", x).attr(\"y\", y).attr(\"width\", width).attr(\"height\", height).attr('stroke', 'black').style(\"fill-opacity\", \"0.1\");\n\n  // pointer circle\n  var circle = g.append(\"circle\").attr(\"cx\", x + width - pointer_size / 2).attr(\"cy\", y + height / 2).attr(\"r\", 5);\n  var text = g.append(\"text\").text(function (d) {\n    return text;\n  }).attr(\"x\", x + 15).attr(\"y\", y + height / 2 + font_size / 2).attr(\"fill\", \"black\");\n  return {\n    \"rect\": rect,\n    \"outerrect\": outerrect,\n    \"circle\": circle,\n    \"text\": text,\n    \"mfx\": x + width,\n    //middle far x/y\n    \"mfy\": y + height / 2,\n    \"mnx\": x,\n    //middle near x/y\n    \"mny\": y + height / 2,\n    \"cx\": circle.attr(\"cx\"),\n    \"cy\": circle.attr(\"cy\")\n  };\n};\nvar drawLine = function drawLine(g, fx, fy, tx, ty) {\n  var text = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : \"\";\n  var path = d3.path();\n  path.moveTo(fx, fy);\n  path.lineTo(tx, ty);\n  path.closePath();\n\n  // line\n  g.append(\"path\").attr(\"d\", path.toString()).attr('stroke', 'black').attr('stroke-width', '3').attr('id', 'arrow');\n\n  // arrow rotation\n  var headrotation = 0,\n    distance = Math.sqrt(Math.pow(tx - fx, 2) + Math.pow(ty - fy, 2));\n  if (fy != ty || fx != tx) {\n    headrotation = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;\n  }\n\n  // arrowhead\n  var head = g.append(\"path\").attr(\"d\", \"M0,-5L10,0L0,5\").attr(\"x\", 0).attr(\"y\", 0).attr(\"transform\", function (d) {\n    var headBBox = this.getBBox(),\n      headCX = headBBox.width / 2.0,\n      headCY = headBBox.height / 2.0,\n      arrowX = tx - headCX - 1,\n      arrowY = ty;\n\n    // Rotation rotates from the top left, so scoot us up/down by half...\n    if (ty - fy < 0) {\n      arrowY += headCY;\n    } else if (ty - fy > 0) {\n      arrowY -= headCY;\n    }\n    var arrowCoords = arrowX + \", \" + arrowY;\n    return \"translate(\" + arrowCoords + \") rotate(\" + headrotation + \")\";\n  });\n  if (text != \"\") {\n    var textx = tx - (tx - fx) / 2 - text.length * 3,\n      texty = parseInt(fy) - 7;\n\n    // label\n    g.append(\"text\").text(text).attr(\"fill\", \"black\").attr(\"transform\", function (d) {\n      var labelBBox = this.getBBox(),\n        labelCX = labelBBox.width,\n        labelCY = labelBBox.height,\n        labelX = parseInt(fx) + labelCX,\n        labelY = parseInt(fy) - labelCY / 4;\n      if (ty - fy < 0) {\n        labelY -= labelCY + labelCY / 4;\n        labelX -= (text.length - 3) * 9;\n      } else if (ty - fy > 0) {\n        labelY += labelCY;\n        labelX -= (text.length - 3) * 9;\n      }\n      var labelCoords = labelX + \", \" + labelY;\n      return \"translate(\" + labelCoords + \") rotate(\" + headrotation + \")\";\n    });\n  }\n  return path;\n};\n\n//# sourceURL=webpack://%5Bname%5D/./src/markov/graphing.js?");

/***/ }),

/***/ "./src/markov/graphs.js":
/*!******************************!*\
  !*** ./src/markov/graphs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nmodule.exports = {\n  generateWord: generateWord,\n  renderFirstExample: function renderFirstExample(ele) {\n    renderSimpleMarkovChain(ele, example1data.nodes, example1data.links);\n  },\n  renderSecondExample: function renderSecondExample(ele) {\n    renderSimpleMarkovChain(ele, example2data.nodes, example2data.links, example2data.layout);\n  },\n  renderThirdExample: function renderThirdExample(ele) {\n    renderSimpleMarkovChain(ele, example3data.nodes, example3data.links, example3data.layout);\n  },\n  renderFourthExample: function renderFourthExample() {\n    renderCircularGraph(\"/assets/scripts/markov/words-monograms.json\", $('#markov-chain-letter-graph')[0], function (cy) {\n      cyex3 = cy;\n    });\n  },\n  renderFifthExample: function renderFifthExample() {\n    var layout = {\n      name: \"spread\",\n      padding: 5,\n      minDist: 5\n    };\n    renderCircularGraph(\"/assets/scripts/markov/words-digrams.json\", $('#markov-chain-digram-graph')[0], function (cy) {\n      cyex4 = cy;\n    }, layout);\n  }\n};\n\n// Example 1 and 2\nvar example1data = {\n  nodes: [{\n    data: {\n      id: 1,\n      name: 'data1'\n    }\n  }, {\n    data: {\n      id: 2,\n      name: 'data2'\n    }\n  }, {\n    data: {\n      id: 3,\n      name: 'data3'\n    }\n  }],\n  links: [{\n    data: {\n      source: 1,\n      target: 2,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 2,\n      target: 3,\n      value: '1.0'\n    }\n  }]\n};\nvar example2data = {\n  nodes: [{\n    data: {\n      id: 1,\n      row: 0,\n      col: 0,\n      name: 'A'\n    }\n  }, {\n    data: {\n      id: 2,\n      row: 0,\n      col: 1,\n      name: 'dog'\n    }\n  }, {\n    data: {\n      id: 4,\n      row: 0,\n      col: 3,\n      name: 'over'\n    }\n  }, {\n    data: {\n      id: 5,\n      row: 0,\n      col: 4,\n      name: 'the'\n    }\n  }, {\n    data: {\n      id: 6,\n      row: 0,\n      col: 5,\n      name: 'log'\n    }\n  }, {\n    data: {\n      id: 3,\n      row: 1,\n      col: 2,\n      name: 'jumps'\n    }\n  }, {\n    data: {\n      id: 7,\n      row: 2,\n      col: 0,\n      name: 'The'\n    }\n  }, {\n    data: {\n      id: 8,\n      row: 2,\n      col: 1,\n      name: 'bear'\n    }\n  }, {\n    data: {\n      id: 9,\n      row: 2,\n      col: 3,\n      name: 'clear'\n    }\n  }, {\n    data: {\n      id: 10,\n      row: 2,\n      col: 4,\n      name: 'of'\n    }\n  }, {\n    data: {\n      id: 11,\n      row: 2,\n      col: 5,\n      name: 'harm'\n    }\n  }],\n  links: [{\n    data: {\n      source: 1,\n      target: 2,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 2,\n      target: 3,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 3,\n      target: 4,\n      value: '0.5'\n    }\n  }, {\n    data: {\n      source: 4,\n      target: 5,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 5,\n      target: 6,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 7,\n      target: 8,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 8,\n      target: 3,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 3,\n      target: 9,\n      value: '0.5'\n    }\n  }, {\n    data: {\n      source: 9,\n      target: 10,\n      value: '1.0'\n    }\n  }, {\n    data: {\n      source: 10,\n      target: 11,\n      value: '1.0'\n    }\n  }],\n  layout: {\n    name: 'grid',\n    padding: 10,\n    rows: 3,\n    cols: 6,\n    position: function position(d) {\n      return {\n        row: d.data('row'),\n        col: d.data('col')\n      };\n    }\n  }\n};\nvar example3data = $.extend(true, {}, example2data);\nexample3data.links.forEach(function (e) {\n  if (e.data.source == 3) {\n    if (e.data.target == 4) {\n      e.data.value = '0.667';\n    } else if (e.data.target == 9) {\n      e.data.value = '0.333';\n    }\n  }\n});\nfunction renderSimpleMarkovChain(container, nodes, links) {\n  var layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  if (layout == {}) {\n    layout[\"name\"] = \"grid\";\n  }\n  cytoscape({\n    container: $(container)[0],\n    boxSelectionEnabled: false,\n    autounselectify: false,\n    userZoomingEnabled: false,\n    panningEnabled: false,\n    selectionType: 'none',\n    style: [{\n      selector: 'node',\n      style: {\n        'width': 75,\n        'height': 75,\n        'content': 'data(name)',\n        'text-valign': 'center',\n        'color': 'white',\n        'font-size': 18\n      }\n    }, {\n      selector: 'edge',\n      style: {\n        'content': function content(d) {\n          return Math.round(d.data('value') * 1000) / 10 + \"%\";\n        },\n        'width': 5,\n        'target-arrow-shape': 'triangle',\n        'line-color': 'black',\n        'target-arrow-color': 'black',\n        'curve-style': 'bezier',\n        'text-margin-y': -15,\n        'edge-text-rotation': 'autorotate'\n      }\n    }],\n    elements: {\n      nodes: nodes,\n      edges: links\n    },\n    layout: layout\n  });\n}\n\n// Example 3\nvar cyex3;\n\n// Example 4\nvar cyex4;\n\n// cb is called with cytoscape instance\nfunction renderCircularGraph(json, container, cb) {\n  var layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};\n  if (layout == {}) {\n    layout[\"name\"] = \"cirle\";\n  }\n  $.ajax({\n    url: json,\n    dataType: \"json\",\n    success: function success(data, textStatus, jqXHR) {\n      var _style;\n      cb(cytoscape({\n        container: container,\n        boxSelectionEnabled: false,\n        autounselectify: false,\n        userZoomingEnabled: false,\n        panningEnabled: true,\n        style: [{\n          selector: 'node',\n          style: {\n            'content': 'data(name)',\n            'text-valign': 'center',\n            'color': 'white',\n            'text-outline-width': 1,\n            'text-outline-color': '#888'\n          }\n        }, {\n          selector: 'edge',\n          style: {\n            'width': 1,\n            'target-arrow-shape': 'triangle',\n            'line-color': 'blue',\n            'target-arrow-color': 'blue',\n            'opacity': function opacity(d) {\n              var opacity = parseFloat(d.data(\"value\"));\n              if (opacity < 0.2) opacity = 0.2;\n              return opacity;\n            },\n            'curve-style': 'bezier'\n          }\n        }, {\n          selector: 'edge:selected',\n          style: (_style = {\n            'content': function content(d) {\n              return Math.round(d.data('value') * 1000) / 1000;\n            },\n            'width': 1,\n            'text-outline-width': 1,\n            'text-outline-color': '#888',\n            'background-color': 'black',\n            'target-arrow-shape': 'triangle',\n            'line-color': 'red',\n            'target-arrow-color': 'red'\n          }, _defineProperty(_style, \"text-outline-width\", 1), _defineProperty(_style, 'curve-style', 'bezier'), _defineProperty(_style, 'z-index', 100000), _defineProperty(_style, 'opacity', 1), _style)\n        }, {\n          selector: 'edge:active',\n          style: _defineProperty({\n            'content': function content(d) {\n              return d.data('source') + \" -> \" + d.data('target') + \"    \" + Math.round(d.data('value') * 1000) / 1000;\n            },\n            'color': 'black',\n            'text-outline-width': 1,\n            'text-outline-color': '#888',\n            'background-color': 'black',\n            'line-color': 'black',\n            'target-arrow-color': 'black',\n            'source-arrow-color': 'black'\n          }, \"text-outline-color\", 'black')\n        }],\n        elements: {\n          nodes: data.nodes,\n          edges: data.links\n        },\n        layout: layout\n      }));\n    }\n  });\n}\nfunction getNextLetter(cy, currentnode, output_div) {\n  var edges = cy.edges('[source=\"' + currentnode.data('name') + '\"]');\n\n  // nodes are sorted by cum_value implicitly. The first time one exceeds\n  // our random number, return that\n  var rand = Math.random(),\n    edge = null;\n  for (var i = 0; i < edges.length; i++) {\n    var cum_value = edges[i].data('cum_value');\n    if (cum_value > rand || cum_value >= 1) {\n      edge = edges[i];\n      break;\n    }\n  }\n  var nextnode = cy.nodes('[name=\"' + edge.data(\"target\") + '\"]');\n  currentnode.select();\n  edge.select();\n  nextnode.select();\n  setTimeout(function () {\n    debugger;\n    currentnode.deselect();\n    edge.deselect();\n    if (nextnode.data('name') !== \"$\") {\n      var output_text = $(output_div).text();\n      getNextLetter(cy, nextnode, output_div);\n      $(output_div).text(output_text + nextnode.data('name'));\n    } else {\n      nextnode.deselect();\n    }\n  }, 1000);\n}\nfunction generateWord() {\n  var example = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;\n  var output_div = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"\";\n  var cy;\n\n  // awful handoff per example.\n  if (example === 3) {\n    cy = cyex3;\n  } else {\n    cy = cyex4;\n  }\n  var node = cy.nodes('[name=\"^\"]')[0];\n  getNextLetter(cy, node, output_div);\n}\n\n//# sourceURL=webpack://%5Bname%5D/./src/markov/graphs.js?");

/***/ })

/******/ });