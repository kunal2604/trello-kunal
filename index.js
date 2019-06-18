const key = '765e4970c4a31c132fd0a17307d1c75f';
const token = '4ce752c63440680067488d676bd581baa7c7cdf75c88ce5d79e3233d083792b3';
const listId = '5d069ad06811908dd6f6d618';

/*-- Get Cards of a list --*/
const getCards = () => {
  return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`)
    .then(response => response.json())
    .then(data => data.map(itemId => itemId["id"]));
}
const CardIDs = getCards();

/*-- Get checklists of card --*/
const getChecklists = (array) => {
  return Promise.all(array.map(current => {
    return fetch(`https://api.trello.com/1/cards/${current}/checklists?key=${key}&token=${token}`)
      .then(response => response.json())
      .then(data => data.map(itemId => itemId["id"]));
  }))
}

var checkListId = CardIDs.then(item => {
  let array = item
  return getChecklists(array);
});

const getCheckListItem = (items) => {
  return Promise.all(items.map(current => {
    return fetch(`https://api.trello.com/1/checklists/${current}/checkItems?key=${key}&token=${token}`)
      .then(resp => resp.json())
      .then(data => data);
  }))
}

var checkListItemId = checkListId.then(items => {
  console.log(items);
  //return getCheckListItem(items.flat())
});


