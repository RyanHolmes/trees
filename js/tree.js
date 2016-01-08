var tree_data;
var data;
$(document).ready(function(){
  // adjustModal();
  data = [
    { "text" : "Root node", "children" : [
        { "text" : "Child node 1" },
        { "text" : "Child node 2" }
    ]}
  ];

  $('#tree').jstree({
    'core' : {
      'check_callback' : true,
      'data' : data,
    },
    "search" : {
      "case_insensitive" : true
    },
    "plugins": ["contextmenu", "dnd", "search", "wholerow"],
    "contextmenu" : {
      "items": customMenu
    }
  });

});

function customMenu(node) {
    // The default set of all items
    var tree = $('#tree').jstree(true);
    var items = {
        addItem: {
          label: "Add Item",
          action: function () {
            tree.create_node(tree.get_selected(), "new node");
          }
        },
        renameItem: { // The "rename" menu item
            label: "Rename",
            action: function () {
              tree.edit(node);
            }
        },
        deleteItem: { // The "delete" menu item
            label: "Delete",
            action: function () {
              tree.delete_node([node]);
            }
        }
    };

    if ($(node).hasClass("folder")) {
        // Delete the "delete" menu item
        delete items.deleteItem;
    }

    return items;
};

function save(){
  var tree = $('#tree').jstree(true);
  if(tree != null){
    v = $("#tree").jstree(true).get_json('#', { 'flat': true });
    tree_data = v;
    console.log(tree_data)
  }
};

function rebuild_tree(){
  $('#tree').jstree({
    'core' : {
      'check_callback' : true,
      'data' : tree_data,
    },
    "search" : {
      "case_insensitive" : true
    },
    "plugins": ["contextmenu", "dnd", "search", "wholerow"],
    "contextmenu" : {
      "items": customMenu
    }
  });
};

function delete_tree(){
  $('#tree').jstree("destroy").empty();
};
