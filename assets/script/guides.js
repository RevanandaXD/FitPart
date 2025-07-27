const nodes = new vis.DataSet([
  {id: 1, label: 'Landing Page'},
  {id: 2, label: 'Click Button Let Go'},
  {id: 3, label: 'Search Page'},
  {id: 4, label: 'Input brand laptop'},
  {id: 5, label: 'Input series laptop'},
  {id: 6, label: 'Click Button Search'},
  {id: 7, label: 'Specification Page'},
  {id: 8, label: 'Choose Sparepart'},
  {id: 9, label: 'Product Page'},
  {id: 10, label: 'Choose Marketplace'}
]);

const edges = new vis.DataSet([
  {from: 1, to: 2},
  {from: 2, to: 3},
  {from: 3, to: 4},
  {from: 3, to: 5},
  {from: 4, to: 6},
  {from: 5, to: 6},
  {from: 6, to: 7},
  {from: 7, to: 8},
  {from: 8, to: 9},
  {from: 9, to: 10},
]);

const container = document.querySelector('.resource');
const flow = {nodes, edges};
const options = {
  layout: {
    hierarchical: {
      direction: 'LR',
      sortMethod: 'directed',
      nodeSpacing: 200,       
      levelSeparation: 200,   
    }
  },
  physics: false,
  nodes: {
    shape: 'box',
    margin: 14,
    color: {
      background: '#F3F0FF',
      border: '#6C5CE7',
    },
    font: { 
      color: '#2C2C2C',
      face: 'poppins' 
    }
  },
  edges: {
    arrows: 'to',
    color: '#1f1f1f'
  }
};

new vis.Network(container, flow, options)