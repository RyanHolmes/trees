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
      tempNode.create(tree[i].id, tree[i].text, [], tree[i].data.note);
      node.children.push(tempNode);
      if(!isLeaf(tempNode.id)){
        buildChildren(tempNode);
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
  $('#hiddenAnswer').addClass('hidden');
  if(r){
    if(allLeafs.length > 0){
      var firstItemIndex = Math.floor((Math.random() * (allLeafs.length - 1)));
      currentNode = allLeafs[firstItemIndex];
      var path = getPath(allLeafs[firstItemIndex]);
      $('#nodeChild').text(path.child);
      $('#nodeParent').text(path.parent);
      $('#nodeGParent').text(path.gParent);
      $('#progress').text(size - (allLeafs.length - 1) + "/" + size);
      $('#progress').css('width', 100 - ((allLeafs.length - 1)/size*100) + '%');
      allLeafs.splice(firstItemIndex, 1);
    }
  }
  else if (!r) { //ordered iteration
    currentNode = allLeafs[0];
    var path = getPath(allLeafs[0]);
    $('#nodeChild').text(path.child);
    $('#nodeParent').text(path.parent);
    $('#nodeGParent').text(path.gParent);
    $('#progress').text((allLeafs.length - 1) + " Nodes Remaining");
    $('#progress').css('width', 100 - ((allLeafs.length - 1)/size*100) + '%');
    allLeafs.splice(0, 1);
  }
};

//up to a third degree
function getPath(item){ //RYANTODO redo with get path
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

function showAnswer(){
  $('#hiddenAnswer').removeClass('hidden');
  $('#noteToShow').text(getNode().data.note);
};

function success(){
    getNode().data.success += 1;
    if (getNode().data.success >= 30){ //RYANTODO value has to be set somewhere
      $('#modalForSuccess').modal('show');
    }
    else {
      nextNode(isRandom);
    }
};

function failure(){
  getNode().data.failure += 1;
  nextNode(isRandom);
};

function markItem(){
  getTree().selected.data.marked = true;
  getTree.tree.set_icon(getTree().selected, '../img/red-x.png');
  nextNode(isRandom);
};

function iterateOnNode(){ //build leaf array around one node
  initIterate();
  buildLeafArray(null);
  //RYANTODO modify leaf array based on current node
  reduceLeafs(getTree().selected)
};

function reduceLeafs(selected_node){
  var val = getTree().selected.text;
  console.log(val);
  console.log("---------------");
  var tempArray = [];
  for(var i in allLeafs){
    var path = getTree().tree.get_path(getTree().tree.get_node(allLeafs[i].id));
    console.log(path)
    for(var x in path ){
      if(path[x] == val){
        tempArray.push(allLeafs[i]);
      }
    }
  }
  allLeafs = tempArray;
  size = allLeafs.length;
  nextNode(isRandom);
  // console.log(getTree().tree.get_path(getTree().selected));
  // console.log(allLeafs);
};
