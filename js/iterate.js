var whole;
var allLeafs = [];
var isRandom = true;
var tree;

function initIterate() {
  toggleContainers();
  if (whole == null) {
    v = $("#tree").jstree(true).get_json('#', { 'flat': true });
    tree = v;
    var root = findRoot(v);
    var rootNode = new Node();
    rootNode.create(root.id, root.text, []);
    whole = buildChildren(rootNode);
    console.log(whole);
  }
};

function buildChildren(node){
  // exit cond -> no node has this as a parent
  for(var i in tree) {
    if(tree[i].parent == node.id) {
      var tempNode = new Node();
      tempNode.create(tree[i].id, tree[i].text, []);
      node.children.push(tempNode);
      if(!isLeaf(tempNode.id, tree)){
        buildChildren(tempNode, tree);
      }
    }
  }
  return node;
};

function findRoot(v){
  for(var i in v) {
    if(v[i].text == "Root") {
      return v[i];
    }
  }
};

function isLeaf(id){
  var isLeaf = false;
  for(var i in tree) {
    if(tree[i].parent == id) {
     return false
    }
    else {
      isLeaf = true;
    }
  }
  return isLeaf;
};

//pass in a segment of the built tree, this will return a flat array of leafs TODO
// function getLeafs(tree){
//   leafs = [];
//   return leafs;
// };

function iterateAll(){
  $("#mainNode").toggleClass("hidden");
  v = $("#tree").jstree(true).get_json('#', { 'flat': true });
  for(var i in v){
    if(isLeaf(v[i].id, v)){
      allLeafs.push(v[i]);
    }
  }
  $('#randomCheckbox').prop('checked', true); //random iteration by default
  nextNode();
};

function nextNode() {
  if(allLeafs.length > 0){
    var firstItemIndex = Math.floor((Math.random() * (allLeafs.length - 1)));
    $('#nodePath').text(getPath(allLeafs[firstItemIndex])); //then delete it from list
    allLeafs.splice(firstItemIndex, 1);
  }
};

function toggleContainers(){
  $('#mainTree').toggleClass("hidden");
  $('#mainIterate').toggleClass("hidden");
};

//up to a third degree
function getPath(item){
  var str = "";
  str += item.text;
  parent = findParent(item);
  if (parent != null){
    str = "/" + str;
    str = parent.text + str;
  }
  gParent = findParent(parent);
  if (gParent != null){
    str = "/" + str;
    str = gParent.text + str;
  }
  return str;
};

function findParent(item){
  for(var i in tree){
    if(tree[i].id == item.parent){
      return tree[i];
    }
  }
  return null;
};
