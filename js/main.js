var allLeafs = [];
var size = 1;
var isRandom = true;
var tree; //DO NOT MODIFY
var day = 86400000;//millseconds in a day
var currentNode;

function getTree(){
  return {
    "tree": $('#tree').jstree(true),
    "selected": $('#tree').jstree(true).get_node($('#tree').jstree(true).get_selected())
  }
};

function toggleContainers(){
  $('#mainTree').toggleClass("hidden");
  $('#mainIterate').toggleClass("hidden");
};

// returns current node from iteration page
function getNode(){
  return $('#tree').jstree(true).get_node(currentNode.id);
};
