function getTree(){
  return {
    "tree": $('#tree').jstree(true),
    "selected": $('#tree').jstree(true).get_node($('#tree').jstree(true).get_selected())
  }
};
