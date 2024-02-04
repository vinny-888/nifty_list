const API_URL = 'http://localhost:3000';
let LISTS = [];
document.addEventListener('DOMContentLoaded', async () => {
    const listsContainer = document.getElementById('listsContainer');

    // Setup listsContainer for horizontal display
    listsContainer.style.display = 'flex';
    listsContainer.style.flexWrap = 'wrap';
    listsContainer.style.gap = '20px';

    LISTS = await lists_get();

    createLists();
});

function createLists(){
    document.getElementById('listsContainer').innerHTML = '';
    LISTS.forEach((list)=>{
        let listElm = createListUI(list.list_id);
        list.items.forEach((item)=>{
            const listItem = createListItem(list.list_id, item);
            listElm.appendChild(listItem);
        })
    })
}

async function createList(items) {
    const listId = LISTS.length;

    await list_create(listId, items);
    LISTS = await lists_get();

    let list = createListUI(listId);

    return list; // Return the ul element for direct manipulation
}

async function appendNumberToList(number, list) {
    let current_list = LISTS.find((l)=>l.list_id == list.id);
    current_list.items.push(number);

    await list_update(list.id, current_list.items);
    LISTS = await lists_get();

    const item = createListItem(list.id, number);
    list.appendChild(item);
}

async function splitList(list) {
    const items = Array.from(list.children);
    if (items.length < 2) return; // No need to split if not enough items


    let new_list_items = [];
    let old_list_items = [];
    // Move every other item to the new list
    items.forEach((item, index) => {
        if (index % 2 !== 0) {
            new_list_items.push(item.id);
        } else {
            old_list_items.push(item.id);
        }
    });
    
    await createList(new_list_items); // This now directly returns a ul element

    await list_update(list.id, old_list_items);
    
    // Refres all lists
    LISTS = await lists_get();
    createLists();
}

async function lists_get(){
    try {
        const response = await fetch(API_URL+'/lists');

        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }

        const data = await response.json();

        console.log('LISTS', data.lists);
        return data.lists;
    } catch (error) {
        console.log('Error: ' + err);
    }
}

async function list_create(list_id, items){
    try {
        const response = await fetch(API_URL+'/list/'+list_id, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(items)
        });
        
        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
        
        const data = await response.json();
        console.log('list_create', data);
    } catch (error) {
        console.log('Error: ' + err);
    }
}

async function list_delete(list_id){
    try {
        const response = await fetch(API_URL+'/list/'+list_id, {
            method: "delete"
        });
        
        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
        
        const data = await response.json();
        
        console.log('list_delete', data);
    } catch (error) {
        console.log('Error: ' + err);
    }
}

async function list_update(list_id, items){
    try {
        const response = await fetch(API_URL+'/list/'+list_id, {
            method: "put",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(items)
        });
        
        if (!response.ok) {
            const message = 'Error with Status Code: ' + response.status;
            throw new Error(message);
        }
        
        const data = await response.json();
        
        console.log('list_update', data);
    } catch (error) {
        console.log('Error: ' + err);
    }
}

// UI Functions

function createListItem(listId, number) {
    const item = document.createElement('li');
    item.id = number;
    item.classList.add('list-item');
    item.textContent = number;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-button');
    
    removeButton.addEventListener('click', async () => {
        let list = LISTS.find((l)=>l.list_id == listId);
        let newItems = [];

        for(let i=0;i<list.items.length;i++){
            let itemObj = list.items[i];
            if(itemObj != item.id){
                newItems.push(itemObj);
            }
        }

        await list_update(list.list_id, newItems);
        LISTS = await lists_get();

        item.remove();
    });
    item.appendChild(removeButton);
    return item;
}

function createListUI(listId){
    const listContainer = document.createElement('div'); // Container for each list and its controls
    listContainer.classList.add('list-container');

    const title = document.createElement('h3');
    title.textContent = `List ${String.fromCharCode(65 + parseInt(listId))}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('remove-button');
    let list_id = listId;
    removeButton.addEventListener('click', async () => {
        await list_delete(list_id);
        LISTS = await lists_get();

        createLists();
    });
    title.appendChild(removeButton);

    listContainer.appendChild(title);

    const list = document.createElement('ul');
    list.id = listId;
    list.classList.add('list');
    listContainer.appendChild(list);

    const listInput = document.createElement('input');
    listInput.type = 'text';
    listInput.placeholder = 'Enter a number';
    listContainer.appendChild(listInput);

    const listAddButton = document.createElement('button');
    listAddButton.textContent = 'Add to this list';
    listContainer.appendChild(listAddButton);

    const splitButton = document.createElement('button');
    splitButton.textContent = 'Split this list';
    listContainer.appendChild(splitButton);

    listsContainer.appendChild(listContainer); // Append the list container

    listAddButton.addEventListener('click', () => {
        const value = listInput.value.trim();
        if (value !== '') {
            appendNumberToList(value, list);
            listInput.value = ''; // Clear input field
        }
    });

    splitButton.addEventListener('click', () => splitList(list));

    return list;
}