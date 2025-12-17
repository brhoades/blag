import cy from 'cytoscape';
import spread from 'cytoscape-spread';
cy(spread);


export default {
  generateWord: generateWord,
  renderFirstExample: function(ele) {
    renderSimpleMarkovChain(ele, example1data.nodes, example1data.links);
  },
  renderSecondExample: function(ele) {
    renderSimpleMarkovChain(ele, example2data.nodes, example2data.links, example2data.layout);
  },
  renderThirdExample: function(ele) {
    renderSimpleMarkovChain(ele, example3data.nodes, example3data.links, example3data.layout);
  },
  renderFourthExample: function() {
    renderCircularGraph("/assets/scripts/markov/words-monograms.json", $('#markov-chain-letter-graph')[0], function(cy) {
      cyex3 = cy;
    });
  },
  renderFifthExample: function() {
    var layout = {
      name: "spread",
      padding: 5,
      minDist: 5,
    };
    renderCircularGraph("/assets/scripts/markov/words-digrams.json", $('#markov-chain-digram-graph')[0], function(cy) {
      cyex4 = cy;
    }, layout);
  }
};

// Example 1 and 2
var example1data = {
  nodes: [
    {
      data: {
        id: 1,
        name: 'data1'
      }
    },
    {
      data: {
        id: 2,
        name: 'data2'
      }
    },
    {
      data: {
        id: 3,
        name: 'data3'
      }
    },
  ],
  links: [
    {
      data: {
        source: 1,
        target: 2,
        value: '1.0'
      },
    },
    {
      data: {
        source: 2,
        target: 3,
        value: '1.0'
      }
    }
  ]
};

var example2data = {
  nodes: [
    {
      data: {
        id: 1,
        name: 'A'
      }
    },
    {
      data: {
        id: 2,
        name: 'dog'
      }
    },
    {
      data: {
        id: 4,
        name: 'over'
      }
    },
    {
      data: {
        id: 5,
        name: 'the'
      }
    },
    {
      data: {
        id: 6,
        name: 'log'
      }
    },
    {
      data: {
        id: 3,
        name: 'jumps'
      }
    },
    {
      data: {
        id: 7,
        name: 'The'
      }
    },
    {
      data: {
        id: 8,
        name: 'bear'
      }
    },
    {
      data: {
        id: 9,
        name: 'clear'
      }
    },
    {
      data: {
        id: 10,
        name: 'of'
      }
    },
    {
      data: {
        id: 11,
        name: 'harm'
      }
    },
  ],
  links: [
    {
      data: {
        source: 1,
        target: 2,
        value: '1.0'
      },
    },
    {
      data: {
        source: 2,
        target: 3,
        value: '1.0'
      }
    },
    {
      data: {
        source: 3,
        target: 4,
        value: '0.5'
      },
    },
    {
      data: {
        source: 4,
        target: 5,
        value: '1.0'
      }
    },
    {
      data: {
        source: 5,
        target: 6,
        value: '1.0'
      },
    },
    {
      data: {
        source: 7,
        target: 8,
        value: '1.0'
      }
    },
    {
      data: {
        source: 8,
        target: 3,
        value: '1.0'
      }
    },
    {
      data: {
        source: 3,
        target: 9,
        value: '0.5'
      }
    },
    {
      data: {
        source: 9,
        target: 10,
        value: '1.0'
      }
    },
    {
      data: {
        source: 10,
        target: 11,
        value: '1.0'
      }
    },
  ],
  layout: {
    name: 'grid',
    padding: 10,
    position: function(d) {
      return {row: d.data('row'), col: d.data('col')};
    }
  }
};

var example3data = $.extend(true, {}, example2data);
example3data.links.forEach(function(e) {
  if(e.data.source == 3) {
    if(e.data.target == 4) {
      e.data.value = '0.667';
    } else if(e.data.target == 9) {
      e.data.value = '0.333';
    }
  }
});

function renderSimpleMarkovChain(container, nodes, links, layout={}) {
  if(layout == {}) {
    layout["name"] = "grid";
  }

  cytoscape({
    container: $(container)[0],

    boxSelectionEnabled: false,
    autounselectify: false,

    userZoomingEnabled: false,
    panningEnabled: false,

    selectionType: 'none',

    style: [
      {
        selector: 'node',
        style: {
          'width': 50,
          'height': 50,
          'content': 'data(name)',
          'text-valign': 'center',
          'color': 'white',
          'font-size': 14
        }
      },
      {
        selector: 'edge',
        style: {
          'content': function(d) {
            return Math.round(d.data('value') * 1000) / 10 + "%";
          },
          'width': 3,
          'color': 'white',
          'target-arrow-shape': 'triangle',
          'line-color': 'white',
          'target-arrow-color': 'white',
          'curve-style': 'bezier',
          'text-margin-y': -15,
          'edge-text-rotation': 'autorotate',

        }
      }
    ],
    elements: {
      nodes: nodes,
      edges: links,
    },
    layout: layout
  });
}


// Example 3
var cyex3;

// Example 4
var cyex4;

// cb is called with cytoscape instance
function renderCircularGraph(json, container, cb, layout={}) {
  if(layout == {}) {
    layout["name"] = "cirle";
  }
  $.ajax({
        url: json,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          cb(cytoscape({
            container: container,

            boxSelectionEnabled: false,
            autounselectify: false,

            userZoomingEnabled: false,
            panningEnabled: true,

            style: [
              {
                selector: 'node',
                style: {
                  'content': 'data(name)',
                  'text-valign': 'center',
                  'color': 'white',
                  'text-outline-width': 1,
                  'text-outline-color': '#111'
                }
              },
              {
                selector: 'edge',
                style: {
                  'width': 1,
                  'color': 'white',
                  'text-outline-width': 1,
                  'text-outline-color': '#111',
                  'target-arrow-shape': 'triangle',
                  'line-color': 'grey',
                  'target-arrow-color': 'grey',
                  'opacity': function(d) {
                    var opacity = parseFloat(d.data("value"));
                    if(opacity < 0.2)
                      opacity = 0.2;

                    return opacity;
                  },
                  'curve-style': 'bezier',
                  'z-index': 100000,
                }
              },
              {
                selector: 'edge:selected',
                style: {
                  'content': function(d) {
                    return Math.round(d.data('value') * 1000) / 1000;
                  },
                  'width': 1,
                  'color': 'white',
                  'text-outline-width': 1,
                  'text-outline-color': '#111',
                  'background-color': 'blue',
                  'target-arrow-shape': 'triangle',
                  'line-color': 'red',
                  'target-arrow-color': 'red',
                  'curve-style': 'bezier',
                  'z-index': 100000,
                  'opacity': 1,
                }
              },
              {
                selector: 'edge:active',
                style: {
                  'content': function(d) {
                    return d.data('source') + " -> " + d.data('target') + "    " + Math.round(d.data('value') * 1000) / 1000;
                  },
                  'color': 'white',
                  'text-outline-width': 1,
                  'text-outline-color': '#888',
                  'background-color': 'white',
                  'line-color': 'black',
                  'target-arrow-color': 'black',
                  'source-arrow-color': 'black',
                  'z-index': 100000,
                  'opacity': 1,
                }
              }
            ],
            elements: {
              nodes: data.nodes,
              edges: data.links,
            },
            layout: layout,
          }));
        }
      });
}

function getNextLetter(cy, currentnode, output_div) {
  var edges = cy.edges('[source="' + currentnode.data('name') + '"]');

  // nodes are sorted by cum_value implicitly. The first time one exceeds
  // our random number, return that
  var rand = Math.random(),
      edge = null;
  for (var i=0; i<edges.length; i++) {
    var cum_value = edges[i].data('cum_value');

    if (cum_value > rand || cum_value >= 1) {
      edge = edges[i];
      break
    }
  }

  var nextnode = cy.nodes('[name="' + edge.data("target") + '"]');
  currentnode.select();
  edge.select();
  nextnode.select();

  // promise hastily added a decade later to prevent running
  // generation more than once
  return new Promise((resolve) => {
    setTimeout(function() {
      currentnode.deselect();
      edge.deselect();
      if (nextnode.data('name') !== "$") {
        const output_text = $(output_div).text();

        getNextLetter(cy, nextnode, output_div).then(() => resolve());
        $(output_div).text(output_text + nextnode.data('name'));
      } else {
        nextnode.deselect();
        resolve();
      }
    }, 1000);
  });
}

function generateWord(example=3, output_div="") {
  var cy;

  // awful handoff per example.
  if (example === 3) {
     cy = cyex3;
  } else {
     cy = cyex4;
  }

  var node = cy.nodes('[name="^"]')[0];

  return getNextLetter(cy, node, output_div);
}
