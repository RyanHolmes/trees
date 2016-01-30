function initIterate() {
  v = $("#tree").jstree(true).get_json('#', { 'flat': true });
  var root = findRoot(v);
  var rootNode = new Node();
  rootNode.create(root.id, root.text, []);
  buildTree(rootNode, v);
};

function buildTree(root, treeJson){
  //have -> root node id
  //need -> to use json of tree to find elements with the root as parent, make them nodes, add to children array of root

};

function findRoot(v){
  for(var i in v) {
    if(v[i].text == "Root") {
      return v[i];
    }
  }
};

function findChildren(nodeId, treeJson){

};

// function iterateLeafs(e){
//   v = $("#tree").jstree(true).get_json('#', { 'flat': true });
//   arr = [];
//   for(var i in v){//TODO: check if its a leaf
//     arr.push(v[i]);
//   }
// };
