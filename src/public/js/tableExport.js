var $table = $("#table"); // "table" accordingly

$(function() {
  $("#toolbar")
    .find("select")
    .change(function() {
      $table.bootstrapTable("refreshOptions", {
        exportDataType: $(this).val()
      });
    });
});