var cy = null;

$.ajax({
      url: "/scripts/marko/words.json",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        cy = cytoscape({
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
              'line-color': '#9dbaea',
              'target-arrow-color': '#9dbaea',
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
              'line-color': 'blue',
              'target-arrow-color': 'blue',
              'text-outline-width': 1,
              'curve-style': 'bezier',
              'z-index': 100000,
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
          name: 'circle'
        },
      });
    }
  });

function selectRandomLetter(cy) {
  var dollar = cy.edges("[name=\"$\"]");
  var nodes = _.without(cy.nodes(), dollar);

  return _.sample(nodes);
}

function getNextLetter(cy, currentnode) {
  var edges = cy.edges('[source="' + currentnode.data('name') + '"]');

  // nodes are sorted by cum_value implicitly. The first time one exceeds
  // our random number, return that
  var rand = Math.random(),
      edge = null;
  for(var i=0; i<edges.length; i++) {
    var cum_value = edges[i].data('cum_value');
    console.log(cum_value, rand);

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
  }, 2000);
}

function generateWord() {
  // Choose a random letter (that's not $)
  var node = selectRandomLetter(cy);

  $("#built-word").append(node.data('name'));

  getNextLetter(cy, node);
}
