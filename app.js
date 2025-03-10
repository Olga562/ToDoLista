const listInput = document.getElementById("myInput");
const listAlert = document.getElementById("Alert");
const listUl = document.getElementById("list-items");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");



//Adding item to the list
function addItem(){
    var inputValue = listInput.value;
    //Checking input
    if(inputValue=="" || inputValue.length < 2){
        listAlert.innerText = "Invalid item input!";
        listInput.classList.add("error");  // Add 'error' class
        return;
    }

    listAlert.innerText = "";//Remove error message
    listInput.classList.remove("error");//Remove "error" class

    var listItem = createNewItem(inputValue);//Creating new item and adding it to the list
    listUl.appendChild(listItem);
    listInput.value = "";//Clear input field
    saveListItem(); 
    updateCounters();
    
}

//Creating new item and delete button
function createNewItem(inputValue){
    var listItem = document.createElement("li");
    var label = document.createElement("label");
    var deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = "\u00D7";//Button with "x"
    label.innerText = inputValue;
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);
   
    deleteBtn.addEventListener("click", removeItem);//Adding event listener to the button
    listItem.addEventListener("click", function(){
        this.classList.toggle("checked");
        saveListItem();//Saving list and updating counter
        updateCounters();
    });
    return listItem

}
//Deleting item from the list
function removeItem(){
    var listItem = this.parentNode;//get element
    listUl.removeChild(listItem);
    saveListItem();
    updateCounters();
}

//Bringing from Local Storage
function readListItems(){
    var savedItems = localStorage.getItem("listed-items");
    savedItems = JSON.parse(savedItems);
    if(!savedItems){
        return
    }
    savedItems.forEach((element) => {
        var listItem = createNewItem(element);//creating list
        listUl.appendChild(listItem);
    })
}

//Saving to Local Storage
function saveListItem(){
    let list = [];
    document.querySelectorAll("#list-items li").forEach((element) =>{
        var liItem = element.querySelector("label").textContent;
        list.push(liItem);
    })
    localStorage.setItem("listed-items", JSON.stringify(list))

}


//Updating the list
function updateCounters() {
    const completedTasks = document.querySelectorAll(".checked").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.checked)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }
   
    
