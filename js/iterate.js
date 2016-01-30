var whole;

function initIterate() {
  v = $("#tree").jstree(true).get_json('#', { 'flat': true });
  var root = findRoot(v);
  var rootNode = new Node();
  rootNode.create(root.id, root.text, []);
  whole = buildChildren(rootNode, v);
  console.log(whole);
};

function buildChildren(node, treeJson){
  // exit cond -> no node has this as a parent
  for(var i in treeJson) {
    if(treeJson[i].parent == node.id) {
      var tempNode = new Node();
      tempNode.create(treeJson[i].id, treeJson[i].text, []);
      node.children.push(tempNode);
    }
  }
  return node;
  // console.log(node);
};

function findRoot(v){
  for(var i in v) {
    if(v[i].text == "Root") {
      return v[i];
    }
  }
};

// function iterateLeafs(e){
//   v = $("#tree").jstree(true).get_json('#', { 'flat': true });
//   arr = [];
//   for(var i in v){//TODO: check if its a leaf
//     arr.push(v[i]);
//   }
// };
