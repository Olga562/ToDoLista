const listInput = document.getElementById("myInput");
const listAlert = document.getElementById("Alert");
const listUl = document.getElementById("list-items");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");



// Lisätään tuote listaan
function addItem(){
    var inputValue = listInput.value;
    // Tarkistetaan syöte
    if(inputValue=="" || inputValue.length < 2){
        listAlert.innerText = "Invalid item input!";
        listInput.style.borderColor = "red";  // Asetetaan punainen reunus
        listInput.classList.add("error");  // Lisää 'error' luokan
        return;
    }

    listAlert.innerText = "";// Poistaa virheilmoituksen
    listInput.style.borderColor = "";  // Poistaa punaisen reunan
    listInput.classList.remove("error");

    var listItem = createNewItem(inputValue);//Luodaan uusi tuote
    listUl.appendChild(listItem);//Lisätään se listaan 
    listInput.value = "";//Tyhjenettään syöttökenttä
    saveListItem();//Talennetaan 
    updateCounters();//Laskurin päivitys
    
}

//Luodaan uusi listan tuote ja delete-nappin
function createNewItem(inputValue){
    var listItem = document.createElement("li");
    var label = document.createElement("label");
    var deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = "\u00D7";//Nappiin tulee "x" merkki
    label.innerText = inputValue;
    listItem.appendChild(label);
    listItem.appendChild(deleteBtn);
   
    deleteBtn.addEventListener("click", removeItem);//Lisätään delete-nappiin toiminallisuutta
    listItem.addEventListener("click", function(){
        this.classList.toggle("checked");
        saveListItem();//Tallenetaan lista ja päivitetään laskuri
        updateCounters();
    });
    return listItem

}
//poistetaan tuote listasta
function removeItem(){
    var listItem = this.parentNode;//Haetaan elementti
    listUl.removeChild(listItem);
    saveListItem();
    updateCounters();
}

//Tuodaan tuoteet Local Storage:sta
function readListItems(){
    var savedItems = localStorage.getItem("listed-items");
    savedItems = JSON.parse(savedItems);
    if(!savedItems){
        return
    }
    savedItems.forEach((element) => {
        var listItem = createNewItem(element);//Luodaan lista
        listUl.appendChild(listItem);
    })
}

//Tallenetaan tuotteet Local Storage:en
function saveListItem(){
    let list = [];
    document.querySelectorAll("#list-items li").forEach((element) =>{
        var liItem = element.querySelector("label").textContent;
        list.push(liItem);
    })
    localStorage.setItem("listed-items", JSON.stringify(list))

}


//Laskurin päivittäminen
function updateCounters() {
    const completedTasks = document.querySelectorAll(".checked").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.checked)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
  }
   
    
