let formRowItems = document.querySelectorAll(".formRowItemInput");
let hiddenItems = document.querySelectorAll(".hiddenItem");
let inputFile = document.querySelector(".inputFile");

/*
    метод clearAll нужен чтобы удалять при перезагрузке страницы
        все данные написанные ранее пользователем в инпутах и селектах.
*/
const clearAll = () => {
    formRowItems.forEach(item => {
        item.value = "";
    });

    inputFile.value = "";
    
};

const initEventsListeners = () => {
    for (var i = 0; i < formRowItems.length; i++) {  
        i == 1 ? formRowItems[i].addEventListener('change', validateForm) : formRowItems[i].addEventListener('keyup', validateForm);
    };
    
    hiddenItems[3].addEventListener('change', validateForm);
}

const hideItems = () => {
    hiddenItems.forEach(item => {
        item.style.display = "none";
    });
}

/* Если верхняя линия заполнена открываем 
    строку ниже, иначе скрываем нижнюю строку*/
function validateForm(){
    if(formRowItems[0].value != "" && formRowItems[1].value != ""){
        for (let i = 0; i < 3; i++) {
            hiddenItems[i].style.display = 'block';
        }
        if(formRowItems[2].value != "" && formRowItems[3].value != "" && formRowItems[4].value != "") {
            hiddenItems[3].style.display = 'flex';
            if (inputFile.value != undefined && inputFile.value != "") {
                hiddenItems[4].style.display = 'flex';
            }else{
                hiddenItems[4].style.display = 'none';
            }
        }else{
            hiddenItems[3].style.display = "none";
        }
    }else{
        hideItems();
    }
};

clearAll();
initEventsListeners();