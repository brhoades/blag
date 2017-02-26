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
        row: 0,
        col: 0,
        name: 'A'
      }
    },
    {
      data: {
        id: 2,
        row: 0,
        col: 1,
        name: 'dog'
      }
    },
    {
      data: {
        id: 4,
        row: 0,
        col: 3,
        name: 'over'
      }
    },
    {
      data: {
        id: 5,
        row: 0,
        col: 4,
        name: 'the'
      }
    },
    {
      data: {
        id: 6,
        row: 0,
        col: 5,
        name: 'log'
      }
    },
    {
      data: {
        id: 3,
        row: 1,
        col: 2,
        name: 'jumps'
      }
    },
    {
      data: {
        id: 7,
        row: 2,
        col: 0,
        name: 'The'
      }
    },
    {
      data: {
        id: 8,
        row: 2,
        col: 1,
        name: 'bear'
      }
    },
    {
      data: {
        id: 9,
        row: 2,
        col: 3,
        name: 'clear'
      }
    },
    {
      data: {
        id: 10,
        row: 2,
        col: 4,
        name: 'of'
      }
    },
    {
      data: {
        id: 11,
        row: 2,
        col: 5,
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
    rows: 3,
    cols: 6,
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

renderSimpleMarkovChain("#markov-chain", example1data.nodes, example1data.links);
renderSimpleMarkovChain("#markov-chain-sentence", example2data.nodes, example2data.links, example2data.layout);
renderSimpleMarkovChain("#markov-chain-sentence-two", example3data.nodes, example3data.links, example3data.layout);

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
          'width': 75,
          'height': 75,
          'content': 'data(name)',
          'text-valign': 'center',
          'color': 'white',
          'font-size': 18
        }
      },
      {
        selector: 'edge',
        style: {
          'content': function(d) {
            return Math.round(d.data('value') * 1000) / 10 + "%";
          },
          'width': 5,
          'target-arrow-shape': 'triangle',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'curve-style': 'bezier',
          'text-margin-y': -15,
          'edge-text-rotation': 'autorotate'
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

$.ajax({
      url: "/assets/scripts/markov/words.json",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        cyex3 = cytoscape({
        container: $('#markov-chain-letter-graph')[0],

        boxSelectionEnabled: false,
        autounselectify: false,

        userZoomingEnabled: false,
        panningEnabled: false,

        style: [
          {
            selector: 'node',
            style: {
              'content': 'data(name)',
              'text-valign': 'center',
              'color': 'white',
              'text-outline-width': 1,
              'text-outline-color': '#888'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 1,
              'target-arrow-shape': 'triangle',
              'line-color': 'blue',
              'target-arrow-color': 'blue',
              'opacity': function(d) {
                var opacity = parseFloat(d.data("value"));
                if(opacity < 0.2)
                  opacity = 0.2;

                return opacity;
              },
              'curve-style': 'bezier'
            }
          },
          {
            selector: 'edge:selected',
            style: {
              'content': function(d) {
                return Math.round(d.data('value') * 1000) / 1000;
              },
              'width': 1,
              'text-outline-width': 1,
              'text-outline-color': '#888',
              'background-color': 'black',
              'target-arrow-shape': 'triangle',
              'line-color': 'red',
              'target-arrow-color': 'red',
              'text-outline-width': 1,
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
              'color': 'black',
              'text-outline-width': 1,
              'text-outline-color': '#888',
              'background-color': 'black',
              'line-color': 'black',
              'target-arrow-color': 'black',
              'source-arrow-color': 'black',
              'text-outline-color': 'black',
            }
          }
        ],
        elements: {
          nodes: data.nodes,
          edges: data.links,
        },
        layout: {
          name: 'circle',
          sort: function(a, b){
            if(a.data('id') < b.data('id')) return -1;
            if(a.data('id') > b.data('id')) return 1;
            return 0;
          }
        },
      });
    }
  });

function getNextLetter(cy, currentnode) {
  var edges = cy.edges('[source="' + currentnode.data('name') + '"]');

  // nodes are sorted by cum_value implicitly. The first time one exceeds
  // our random number, return that
  var rand = Math.random(),
      edge = null;
  for(var i=0; i<edges.length; i++) {
    var cum_value = edges[i].data('cum_value');

    if(cum_value > rand || cum_value >= 1) {
      edge = edges[i];
      break
    }
  }

  var nextnode = cy.nodes('[name="' + edge.data("target") + '"]');
  currentnode.select();
  edge.select();
  nextnode.select();

  setTimeout(function() {
    currentnode.deselect();
    edge.deselect();
    if(nextnode.data('name') != "$") {
      getNextLetter(cy, nextnode);
      $("#built-word").append(nextnode.data('name'));
    } else {
      nextnode.deselect();
    }
  }, 1000);
}

function generateWord() {
  var node = cyex3.nodes('[name="^"]')[0];

  getNextLetter(cyex3, node);
}

module.exports = {
  generateWord: generateWord,
  renderFirstExample: function(ele) {
    renderSimpleMarkovChain(ele, example1data.nodes, example1data.links);
  },
  renderSecondExample: function(ele) {
    renderSimpleMarkovChain(ele, example2data.nodes, example2data.links, example2data.layout);
  },
  renderThirdExample: function(ele) {
    renderSimpleMarkovChain(ele, example3data.nodes, example3data.links, example3data.layout);
  }
}