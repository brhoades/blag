$(function(){ // on dom ready

  $.ajax({
      url: "/scripts/marko/words.json",
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
      var cy = cytoscape({
        container: $('#markov-chain-letter-graph')[0],

        boxSelectionEnabled: false,
        autounselectify: true,

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
            selector: ':active',
            style: {
              'content': function(d) {
                console.log(d);
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
              'z-index': 100,
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
      })
    }
  });
});
