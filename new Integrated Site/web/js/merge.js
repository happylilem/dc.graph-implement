var selectionDiagram = dc_graph.diagram('#graph'),
  pie,
  row;

var colors = ['#1b9e77', '#d95f02', '#7570b3'];
var dasheses = [
    {name: 'solid', ray: null},
    {name: 'dash', ray: [5,5]},
    {name: 'dot', ray: [1,5]},
    {name: 'dot-dash', ray: [15,10,5,10]}
];
var filters = {};
var options = {
  arrows: {
      default: 'head',
    },
  cutoff: null,
  file: null,
  layout: {
    default: 'cola',
    values: dc_graph.engines.available(),
    selector: '#layout',
    needs_relayout: true,
    exert: function (val, diagram) {
      var engine = dc_graph.spawn_engine(val);
      apply_engine_parameters(engine);
      diagram
          .layoutEngine(engine)
          .autoZoom('once');
    },
  },
  limit: {
      default: 0.5,
      selector: '#cutoff',
      needs_redraw: true,
      exert: function(val, diagram) {
          populate(val);
          diagram.autoZoom('once');
      }
      // exert: function(val, _, filters) {
      //     if(filters.cutoff) {
      //         d3.select('#cutoff-display').text(val);
      //         filters.cutoff.set(val);
      //     },
      // },
    },
  neighbors: true,
  tips: true,
  transition_duration: {
    default: 1000,
    query: 'tdur',
    n: {
      default: 100,
      // values: [1, 5, 10, 20, 50, 100, 200],
      // selector: '#number',
      needs_redraw: true,
      exert: function (val, diagram) {
        alert('banned');
        //   populate(val);
//   diagram.autoZoom('once');
      },
    },
    },
  worker: true,
};
var sync_url = sync_url_options(
  options,
  dcgraph_domain(selectionDiagram),
  selectionDiagram
);
console.log('---', sync_url);

function display_error(heading, message) {
  d3.select('#message')
    .style('display', null)
    .html(
      '<div><h1>' +
        heading +
        '</h1>' +
        (message ? '<code>' +
        message +
        '</code></div>' : ''
      ));
  throw new Error(message);
}
function hide_error() {d3
  .select('#message')
  .style('display', 'none');
}

function apply_engine_parameters(engine) {
  switch (engine.layoutAlgorithm()) {
    case 'd3v4-force':
      engine
      .collisionRadius(125)
      .gravityStrength(0.05)
      .initialCharge(-500);
      break;
    case 'd3-force':
      engine
      .gravityStrength(0.1)
      .initialCharge(-1000)
      .linkDistance('auto');
      break;
  }
  return engine;
}
function build_data(nodes, edges) {
  // build crossfilters from scratch
  return {
    edgef: dc_graph.flat_group.make(edges, function (d) {
      return d.key;
    }),
    nodef: dc_graph.flat_group.make(nodes, function (d) {
      return d.key;
    }),
  };
}
d3.select('#user-file').on('change', function () {
  var filename = this.value;
  if (filename) {
    var reader = new FileReader();
    reader.onload = function (e) {
      hide_error();
      dc_graph.load_graph_text(
        e.target.result,
        filename,
        on_load.bind(null, filename)
      );
    };
    reader.readAsText(this.files[0]);
  }
});
var url_output = sync_url.output(), more_output;
sync_url.output(function(params) {
    url_output(params);
    if(more_output)
        more_output(params);
});

var load_graph = function (nodes, edges) {
  var data = build_data(nodes, edges),
    colorDimension = data.nodef.crossfilter.dimension(function (n) {
      return n.color;
    }),
    colorGroup = colorDimension.group(),
    dashDimension = data.edgef.crossfilter.dimension(function (e) {
      return e.dash;
    }),
    dashGroup = dashDimension.group();
  selectionDiagram
    .nodeDimension(data.nodef.dimension)
    .nodeGroup(data.nodef.group)
    .edgeDimension(data.edgef.dimension)
    .edgeGroup(data.edgef.group);
  pie.dimension(colorDimension).group(colorGroup);
  row.dimension(dashDimension).group(dashGroup);
};

var populate = function (n) {
  load_graph(
    [
      { key: 'load a graph', color: 0 },
    ],
    [
    ]
  );
};

var on_load = function (filename, error, data) {
  if (error) {
    var heading = '';
    if (error.status)
      heading = 'Error ' + error.status + ': ';
    heading += 'Could not load file ' + filename;
    display_error(heading, error.message);
  }
  var graph_data = dc_graph.munge_graph(data);
    nodes = graph_data.nodes,
    edges = graph_data.edges,
    sourceattr = graph_data.sourceattr,
    targetattr = graph_data.targetattr,
    nodekeyattr = graph_data.nodekeyattr;
  console.log(graph_data);

  load_graph(graph_data.nodes, graph_data.edges);
  selectionDiagram.autoZoom('once');
  dc.redrawAll();
};



var engine = dc_graph.spawn_engine(
  sync_url.vals.layout,
  querystring.parse(),
  sync_url.vals.worker
);
apply_engine_parameters(engine);

selectionDiagram
  .altKeyZoom(true)
  .autoZoom('once')
  .edgeArrowhead(
    sync_url.vals.arrows === 'head' || sync_url.vals.arrows === 'both'
      ? 'vee'
      : null
    )
  .edgeArrowtail(
    sync_url.vals.arrows === 'tail' || sync_url.vals.arrows === 'both'
      ? 'crow'
      : null
    )
  .edgeOpacity(0.25)
  .edgeStrokeDashArray(function (e) {
    return dasheses[e.value.dash].ray;
    })
  .fitStrategy('horizontal')
  .height(580)
  .layoutEngine(engine)
  .margins({ top: 5, left: 5, right: 5, bottom: 5 })
  .nodeFill(function (kv) {
    return kv.value.color;
    })
  .nodeFillScale(d3.scale.ordinal().domain([0, 1, 2]).range(colors))
  .nodeFixed(function (n) {
    return n.value.fixed;
    })
  .nodeLabel(dc.pluck('key'))
  .nodeLabelFill(function (n) {
    var rgb = d3.rgb(
        selectionDiagram.nodeFillScale()(selectionDiagram.nodeFill()(n))
        ),
      // https://www.w3.org/TR/AERT#color-contrast
      brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 127 ? 'black' : 'ghostwhite';
    })
  .nodeOpacity(0.25)
  .nodeStrokeWidth(0) // turn off outlines
  .nodeTitle(dc.pluck('key'))
  .restrictPan(true)
  .timeLimit(5000)
  .timeLimit(1000)
  .transitionDuration(sync_url.vals.transition_duration)
  .width(600)
  .zoomDuration(sync_url.vals.transition_duration)
  ;

selectionDiagram.child(
  'select-nodes',
  dc_graph
    .select_nodes({
      nodeOpacity: 1,
    })
    .noneIsAll(true)
    .autoCropSelection(false)
);
selectionDiagram.child(
  'filter-selection-nodes',
  dc_graph.filter_selection('select-nodes-group', 'select-nodes')
);

selectionDiagram.child('move-nodes', dc_graph.move_nodes());

selectionDiagram.child(
  'fix-nodes',
  dc_graph.fix_nodes({
    fixedPosTag: 'fixed',
  })
);

selectionDiagram.child(
  'select-edges',
  dc_graph
    .select_edges({
      edgeStrokeWidth: 2,
      edgeOpacity: 1,
    })
    .noneIsAll(true)
    .autoCropSelection(false)
);
selectionDiagram.child(
  'filter-selection-edges',
  dc_graph
    .filter_selection('select-edges-group', 'select-edges')
    .dimensionAccessor(function (c) {
      return c.edgeDimension();
    })
);

pie = dc
  .pieChart('#pie')
  .width(150)
  .height(150)
  .radius(75)
  .colors(d3.scale.ordinal().domain([0, 1, 2]).range(colors))
  .label(function () {
    return '';
  })
  .title(function (kv) {
    return colors[kv.key] + ' nodes (' + kv.value + ')';
  });

row = dc
  .rowChart('#row')
  .width(300)
  .height(150)
  .label(function (kv) {
    return dasheses[kv.key].name;
  });

if (sync_url.vals.file)
  dc_graph.load_graph(
    sync_url.vals.file,
    on_load.bind(null, sync_url.vals.file)
  );
else {
  populate(sync_url.vals.n);
  dc.renderAll();
}
