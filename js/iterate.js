var whole;
var allLeafs = [];
var isRandom = true;
var tree; //DO NOT MODIFY

function initIterate() {
  toggleContainers();
  if (whole == null) {
    v = $("#tree").jstree(true).get_json('#', { 'flat': true });
    tree = v;
    var root = findRoot(v);
    var rootNode = new Node();
    rootNode.create(root.id, root.text, []);
    whole = buildChildren(rootNode);
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

function iterateAll(){
  $("#allLeafs").toggleClass("hidden");
  $('#randomCheckbox').prop('checked', true); //random iteration by default
  buildLeafArray();
  nextNode(isRandom);
};

function buildLeafArray(){
  allLeafs = [];
  for(var i in tree){
    if(isLeaf(tree[i].id, tree) && !tree[i].data.marked){
      allLeafs.push(tree[i]);
    }
  }
};

function next(){
  nextNode(isRandom);
};

function nextNode(r) {
  if(r){
    if(allLeafs.length > 0){
      var firstItemIndex = Math.floor((Math.random() * (allLeafs.length - 1)));
      var path = getPath(allLeafs[firstItemIndex]);
      $('#nodeChild').text(path.child);
      $('#nodeParent').text(path.parent);
      $('#nodeGParent').text(path.gParent);
      $('#progess').text("> " + (allLeafs.length - 1) + " Nodes Remaining");
      allLeafs.splice(firstItemIndex, 1);
    }
  }
  else if (!r) { //ordered iteration
    var path = getPath(allLeafs[0]);
    $('#nodeChild').text(path.child);
    $('#nodeParent').text(path.parent);
    $('#nodeGParent').text(path.gParent);
    $('#progess').text("> " + (allLeafs.length - 1) + " Nodes Remaining");
    allLeafs.splice(0, 1);
  }
};

function toggleContainers(){
  $('#mainTree').toggleClass("hidden");
  $('#mainIterate').toggleClass("hidden");
};

//up to a third degree
function getPath(item){
  if (item != null){
    var child = "> " + item.text;
    var parent = findParent(item);
    var gParent = findParent(parent);
    if (parent != null){
      parent = "> " + parent.text;
    }
    else {
      parent = "";
    }
    if (gParent != null){
      gParent = "> " + gParent.text;
    }
    else {
      gParent = "";
    }
    return {"child": child, "parent": parent, "gParent": gParent};
  }
};

function findParent(item){
  for(var i in tree){
    if(tree[i].id == item.parent){
      return tree[i];
    }
  }
  return null;
};

function random(){
  isRandom = $('#randomCheckbox').prop('checked');
  buildLeafArray(); //rebuild whenever random mode is toggled
};

function leafsByDate(){

};

function byDateInit(period){ //remake the allLeafs array based on dates
  switch (period){
    case 'week':
    break;
    case 'oneMonth':
    break;
    case 'twoMonths':
    break;
    case 'threeMonths':
    break;
    case 'sixMonths':
    break;
    case 'year':
    break;
  }
};
