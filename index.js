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

// /*------------------------------- for all Checklist-Item of Checklist ----------------*/
const getCheckListItem = (items) => {

  return Promise.all(items.map(current => {
    return fetch(`https://api.trello.com/1/checklists/${current}/checkItems?key=${key}&token=${token}`)
      .then(resp => resp.json())
      .then(data => data);
  }))
}

var checkListItemId = checkListId.then(items => {
  return getCheckListItem(items.flat())
});

//FOR Appending the Checklists Items in HTML
checkListItemId.then(current => appendingList(current.flat()));


const appendingList = (current) => {

  var checkdos = document.getElementById("checklists");
  current.map(items => {
    let newItems = newCollection(items);
    checkdos.appendChild(newItems);
  })
}

function newCollection(items) {
  let division = document.createElement('div');
  division.id = 'trellolist';
  let div2 = `<input type="checkbox" class="check">
               <p class="lists">${items.name}</p>
               <i class="far fa-window-close" data-itemId=${items.id} data-checkListid= ${items.idcheckList} data-status=${items.status}></i>`

  division.innerHTML = div2;
  return division;
}