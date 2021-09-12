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
        i == 1 || i == 4 ? formRowItems[i].addEventListener('change', validateForm) : formRowItems[i].addEventListener('keyup', validateForm);
    };
    hiddenItems[3].addEventListener('change', validateForm);
}

const hideItems = () => {
    hiddenItems.forEach(item => {
        item.style.display = "none";
    });
}

const createLoadedImg = (inputImg) => {
    let loadImp = document.createElement("img");
    loadImp.className = "loadedFileImg";

    /* 
        чтобы преобразовать путь документа с компьютерного (C:/folder/img) 
        в url использовал FileReader, этот же url буду использовать 
        при нажатии на кнопку отправить в кнопке 
    */ 
    if (FileReader) {
        var fr = new FileReader();
        fr.onload = function () {
            loadImp.src = fr.result;
        }
        fr.readAsDataURL(inputImg);
    }
    
    let fileName = inputImg.name.split(".")[0];
    // ограничил длинну наименования фото 10 символами.
    if(fileName.length > 10) {
        fileName = fileName.substring(0, 10);   
    }

    let fileType = inputImg.name.split(".")[1];
    let fileSize = (parseInt(inputImg.size)/1024)/1024;

    let loadedFileContent = document.createElement("div");
    loadedFileContent.className = "loadedFileContent";
    loadedFileContent.innerHTML =  `
             <p>${fileName}</p>
             <p class="loadedFileInfo">${fileType} ${fileSize.toFixed(3)} mb</p>
    `;

    let imgDelete = document.createElement("img");
    imgDelete.className = "loadedFimeDeleteImg"
    imgDelete.src = "./assets/tellUsSection/delete.png";
    imgDelete.alt = "deleteImg";
    imgDelete.addEventListener("click", (e) => {
        var target = e.target;
        var parent = target.parentElement;
        parent.remove();
        // код для создания данных для отправки на сервер.
    });

    let loadedFileDiv  = document.createElement("div");
    loadedFileDiv.className = "loadedFile";

    loadedFileDiv.appendChild(loadImp);
    loadedFileDiv.appendChild(loadedFileContent);
    loadedFileDiv.appendChild(imgDelete);
    
    return loadedFileDiv;
}

/* Если верхняя линия заполнена открываем 
    строку ниже, иначе скрываем нижнюю строку*/
function validateForm(){
    //валидация на ввод только анг и русских букв в форме имени
    formRowItems[0].value = formRowItems[0].value.replace(/[^a-zа-яё\s]/gi, ''); 

    if(formRowItems[0].value != "" && formRowItems[1].value != ""){
        for (let i = 0; i < 3; i++) {
            hiddenItems[i].style.display = 'block';
        }
        formRowItems[2].value = formRowItems[2].value.replace(/[^a-zа-яё\s]/gi, ''); 
        formRowItems[3].value = formRowItems[3].value.replace(/[^a-zа-яё\s]/gi, ''); 
        
        let today = new Date().toISOString().split("T")[0];
        formRowItems[4].setAttribute("max", today);
        if(formRowItems[2].value != "" && formRowItems[3].value != "" && formRowItems[4].value != "") {
            hiddenItems[3].style.display = 'flex';
            if (inputFile.value != undefined && inputFile.value != "") {
                hiddenItems[4].style.display = 'flex';
                let loadedImgItem = createLoadedImg(inputFile.files[0]);
                let loadedFileWrapper = document.querySelector(".loadedFileWrapper");
                loadedFileWrapper.appendChild(loadedImgItem);
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


// form validation

// const formSend = (e) => {
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementsByClassName(".form");

//     form.addEventListener("submit", formSend);
// });

clearAll();
initEventsListeners();