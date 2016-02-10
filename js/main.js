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

function convertDate(d){
  return Math.round(d.getTime()/86400000);
};

function flatten(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
};
