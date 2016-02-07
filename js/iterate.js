var allLeafs = [];
var size = 1;
var isRandom = true;
var tree; //DO NOT MODIFY
var day = 86400000;//millseconds in a day

function initIterate() {
  toggleContainers();
  v = $("#tree").jstree(true).get_json('#', { 'flat': true });
  tree = v;
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
  // $("#allLeafs").toggleClass("hidden");
  $('#randomCheckbox').prop('checked', true); //random iteration by default
  buildLeafArray(null);
  nextNode(isRandom);
};

function buildLeafArray(date){
  allLeafs = [];
  for(var i in tree){
    if( (isLeaf(tree[i].id, tree)) && (tree[i].data.marked == false) && (date == null) ){
      allLeafs.push(tree[i]);
      size = allLeafs.length;
    }
    else if ( (isLeaf(tree[i].id, tree)) && (tree[i].data.marked == false) && (date != null) ) {
        if ((tree[i].data.create_date >= date)){
            allLeafs.push(tree[i]);
            size = allLeafs.length;
        }
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
      $('#progress').text((allLeafs.length - 1) + " Nodes Remaining");
      $('#progress').css('width', 100 - ((allLeafs.length - 1)/size*100) + '%');
      allLeafs.splice(firstItemIndex, 1);
    }
  }
  else if (!r) { //ordered iteration
    var path = getPath(allLeafs[0]);
    $('#nodeChild').text(path.child);
    $('#nodeParent').text(path.parent);
    $('#nodeGParent').text(path.gParent);
    $('#progress').text((allLeafs.length - 1) + " Nodes Remaining");
    $('#progress').css('width', 100 - ((allLeafs.length - 1)/size*100) + '%');
    allLeafs.splice(0, 1);
  }
};

function toggleContainers(){
  $('#mainTree').toggleClass("hidden");
  $('#mainIterate').toggleClass("hidden");
  // $("#allLeafs").toggleClass("hidden");
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
  if(item != null){
    for(var i in tree){
      if(tree[i].id == item.parent){
        return tree[i];
      }
    }
  }
  return null;
};

function random(){
  isRandom = $('#randomCheckbox').prop('checked');
  buildLeafArray(null); //rebuild whenever random mode is toggled
};

function byDateInit(period){
    allLeafs = [];
    var today = convertDate(new Date());
    switch (period){
        case 'week':
            buildLeafArray(today - 7);
            nextNode(isRandom);
        break;
        case 'oneMonth':
            buildLeafArray(today - 30);
            nextNode(isRandom);
        break;
        case 'twoMonths':
            buildLeafArray(today - 60);
            nextNode(isRandom);
        break;
        case 'threeMonths':
            buildLeafArray(today - 91);
            nextNode(isRandom);
        break;
        case 'sixMonths':
            buildLeafArray(today - 182);
            nextNode(isRandom);
        break;
        case 'year':
            buildLeafArray(today - 365);
            nextNode(isRandom);
        break;
    }
};
