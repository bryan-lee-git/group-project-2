$(document).ready(function() {
  const user = $("#user-hook").html();
  console.dir(user);
  const npc = $("#npc-hook").html();
  console.dir(npc);

  $.ajax({
    method: "GET",
    url: `/api/battles/1/${user}/${npc}`
  });
});
