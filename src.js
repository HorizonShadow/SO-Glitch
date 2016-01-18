var roomID = 44914;

function getMessageText(node) {
  return $(node).find('.content').text();
}

function sendMessage(node) {
  var fkey = $('#fkey').val();
  var text = getMessageText(node);
  console.log("Message sent");
  $.post('http://chat.stackoverflow.com/chats/' + roomID + '/messages/new', { text: text, fkey: fkey });
}

function isMyMessage(node) {
  return node.classList.contains("message") && node.classList.contains('neworedit') && $(node).closest(".user-2424975").length;
}

function eachAddedNode(addedNode) {
  var classList = addedNode.classList;
  var $addedNode = $(addedNode);
  if(isMyMessage(addedNode) && Math.random() < 0.05) {
    sendMessage(addedNode);
  }
}

function eachMutation(mutation) {
  Array.from(mutation.addedNodes).forEach(eachAddedNode);
}

function onMutation(mutations) {
  mutations.forEach(eachMutation);
}

new MutationObserver(onMutation).observe(chat, { childList: true, subtree: true });
