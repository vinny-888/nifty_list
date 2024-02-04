const API_URL = 'http://localhost:3000';
let LISTS = [];
const island_urls = ['https://niftyis.land/wenisland/300bloomisland', 'https://niftyis.land/hatebillgates/foxiishrooms', 'https://niftyis.land/911/0', 'https://niftyis.land/JoshTheSpaniard/0', 'https://niftyis.land/Nargoth/0', 'https://niftyis.land/UnchainedNinja/unrealtournament', 'https://niftyis.land/damage/0', 'https://niftyis.land/WAM81/0', 'https://niftyisland.com/play/Mr420/0', 'https://niftyis.land/linhlinh/0', 'https://niftyis.land/SoulsGOD/cityarena', 'https://niftyis.land/Doc34/doc34', 'http://niftyis.land/LOLA03', 'https://niftyis.land/SeeTee/0', 'https://niftyis.land/ninja902', 'https://niftyis.land/Pyeman/0', 'https://niftyis.land/Kingstefano87/0', 'https://niftyis.land/Fancy/fancy', 'https://niftyis.land/GusTheBusCrypto/0', 'https://niftyis.land/RyanDuty', 'https://www.niftyisland.com/play/entropyeq/0', 'https://niftyisland.com/play/Omormac', 'https://niftyis.land/SigilWisp/portalisland', 'https://niftyis.land/DjBangz/djjagman', 'https://niftyis.land/daboyjeff/bag-fudders-sisle', 'https://niftyis.land/DonaldTrump/outset-island', 'https://niftyis.land/BrainiacGameFI/brainiac', 'https://niftyis.land/AlexNFT', 'https://niftyis.land/monugupta', 'https://niftyis.land/Awfuldreamsofu22/0', 'https://niftyis.land/Coolio', 'https://niftyis.land/TheWintersFox/degenturtlearena', 'https://niftyis.land/LoveGotchi/lovegotchi', 'https://niftyis.land/nantucket', 'https://niftyis.land/Minagi/0', 'https://niftyis.land/Skavincci/0', 'https://niftyis.land/Metageist/metageist', 'https://niftyis.land/KingPepe', 'https://niftyis.land/tofu167/0', 'https://niftyis.land/FunkyApe/rust', 'https://niftyis.land/MrSingularity/0', 'https://www.niftyisland.com/play/Cornelius/0', 'https://niftyis.land/letis/colosseum', 'https://niftyis.land/MythicDomain/0', 'https://niftyis.land/Lemon', 'https://niftyis.land/kodavista', 'https://niftyis.land/karathrice', 'https://niftyis.land/dr0peth/pudgy', 'https://niftyis.land/web3GGs', 'https://niftyis.land/BTCspectre/btcspectre', 'https://www.niftyisland.com/play/Giu4731', 'https://niftyis.land/Aoi/0', 'https://niftyis.land/Crafty', 'https://niftyis.land/BAPe/0', 'https://niftyis.land/Manahunter/0', 'https://niftyis.land/phisteycuffs/0', 'https://niftyis.land/Kerplunk/ultrapalm-grandprix', 'https://niftyis.land/0x4595/0', 'https://niftyis.land/Tictacmagic', 'https://niftyis.land/TheMisrable/0', 'https://niftyis.land/JacobRiley/1-eyed-willies-pleasure-paradise', 'https://niftyis.land/asdasdasd/0', 'https://niftyis.land/Alex', 'https://niftyisland.com/play/forgpapi', 'https://niftyis.land/fireman/sappyland', 'https://niftyis.land/spoobs/fustudios', 'https://niftyis.land/Wide', 'https://niftyis.land/itsklsh/0', 'https://niftyis.land/razzle/0', 'https://niftyis.land/floAr/lighthouse', 'https://niftyis.land/PENN', 'https://niftyis.land/N8E39/0', 'https://niftyis.land/DeeBoss/0', 'https://niftyis.land/Gobz/0', 'https://niftyis.land/Swayze/0', 'https://niftyis.land/ARKADEUM', 'https://niftyis.land/SWYB/0', 'https://niftyis.land/Tunckex/olagg', 'https://niftyis.land/dethneer/0', 'https://niftyis.land/Billie/0', 'https://niftyis.land/metaversepirate', 'https://niftyis.land/rizzle', 'https://niftyis.land/Surpriser/0', 'https://niftyis.land/Trislit/ctf', 'https://www.niftyisland.com/play/CrushingBlow/bpmrunner', 'https://niftyis.land/Evo/evo', 'https://niftyis.land/sharktails/sharkpark', 'https://niftyis.land/imROnMAN/0', 'https://niftyis.land/koogs/tiltedtowers', 'https://niftyis.land/RayVeze/0', 'https://niftyis.land/OvaDaSTREET/0', 'https://niftyis.land/Biggunn/biggs-sky-high-arena', 'https://niftyis.land/SSDW/WinterChaos', 'https://niftyis.land/yowza/0', 'https://niftyis.land/SHAKEnBAKE/0', 'https://niftyis.land/Johndoe55573/0', 'https://niftyis.land/camscott/1', 'https://niftyis.land/Supersalad/cove', 'https://niftyis.land/Drea/drea-m', 'https://niftyis.land/blairbear/0'];
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
    let island_url = island_urls[parseInt(number)];
    let name = island_url.split('/')[3];
    item.innerHTML = '<span>#' + number + '</span> <a href="'+island_url+'">'+name+'</a>';

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.classList.add('button');
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
    removeButton.classList.add('button');
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
    listInput.classList.add('inputNumber');
    listInput.type = 'number';
    listInput.placeholder = 'Island #';
    listContainer.appendChild(listInput);

    const listAddButton = document.createElement('button');
    listAddButton.textContent = 'Add Item';
    listAddButton.classList.add('button');
    listAddButton.classList.add('add-button');
    listContainer.appendChild(listAddButton);

    const splitButton = document.createElement('button');
    splitButton.textContent = 'Split List';
    splitButton.classList.add('button');
    splitButton.classList.add('split-button');
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