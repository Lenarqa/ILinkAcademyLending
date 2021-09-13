let formRowItems = document.querySelectorAll(".formRowItemInput");
let hiddenItems = document.querySelectorAll(".hiddenItem");
let inputFile = document.querySelector(".inputFile");

let userExportData = {
    "user_name": "",
    "user_gender": "",
    "user_from": "",
    "user_city": "",
    "user_img": "",
};

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
    document.querySelector(".tellUsBtn").addEventListener("click", clickTellUsBtn);
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

function validateForm () {
    //валидация на ввод только анг и русских букв в форме имени
    formRowItems[0].value = formRowItems[0].value.replace(/[^a-zа-яё\s]/gi, '');
    if(formRowItems[0].value != "" && formRowItems[1].value != ""){
        formRowItems[0].style.borderColor = "#8E43ED";
        formRowItems[1].style.borderColor = "#8E43ED";

        for (let i = 0; i < 3; i++) {
            hiddenItems[i].style.display = 'block';
        }
        formRowItems[2].value = formRowItems[2].value.replace(/[^a-zа-яё\s]/gi, ''); 
        formRowItems[3].value = formRowItems[3].value.replace(/[^a-zа-яё\s]/gi, ''); 
        
        let today = new Date().toISOString().split("T")[0];
        formRowItems[4].setAttribute("max", today);
        if(formRowItems[2].value != "" && formRowItems[3].value != "" && formRowItems[4].value != "") {
            formRowItems[2].style.borderColor = "#8E43ED";
            formRowItems[3].style.borderColor = "#8E43ED";
            formRowItems[4].style.borderColor = "#8E43ED";

            hiddenItems[3].style.display = 'flex';
            if (inputFile.value != undefined && inputFile.value != "") {
                hiddenItems[4].style.display = 'flex';
                let loadedImgItem = createLoadedImg(inputFile.files[0]);
                let loadedFileWrapper = document.querySelector(".loadedFileWrapper");
                // если изображение уже было загружено, то удаляем старое изображении и добавляем новое.
                if(document.querySelector('.loadedFile')) {
                    document.querySelector('.loadedFile').remove();
                }
                loadedFileWrapper.appendChild(loadedImgItem);
                
                
            }else{
                hiddenItems[4].style.display = 'none';
            }
        }else{
            formRowItems[2].style.borderColor = "#D9BBFF";
            formRowItems[3].style.borderColor = "#D9BBFF";
            formRowItems[4].style.borderColor = "#D9BBFF";

            hiddenItems[3].style.display = "none";
        }
    }else{
        formRowItems[0].style.borderColor = "#D9BBFF";
        formRowItems[1].style.borderColor = "#D9BBFF";
        hideItems();
    }
};

function clickTellUsBtn () {
    // проверка что все поля заполнены
    formRowItems.forEach(item => {
        if(item.value === "" ) {
            item.style.borderColor = "red";
        }
        setTimeout(() => {
            item.style.borderColor = "#D9BBFF";
        }, 500);
        return;
    });
    
    if(inputFile.value == "") {
        let addPhoto = document.querySelector(".addPhoto");
        addPhoto.style.borderColor = "red";
        setTimeout(() => {
            addPhoto.style.borderColor = "#D9BBFF";
        }, 500);
        return;
    }

    // присвоение заполненных полей в json
    userExportData["user_name"] = formRowItems[0].value;
    userExportData["user_gender"] = formRowItems[1].value;
    userExportData["user_from"] = formRowItems[2].value;
    userExportData["user_city"] = formRowItems[3].value;

    // для изображения получаем Src уже после файл реадера, т.к от пути файла в компьютере пользователя нет смысла.
    
    if(!document.querySelector(".loadedFileImg")) {
        let addPhoto = document.querySelector(".addPhoto");
        addPhoto.style.borderColor = "red";
        setTimeout(() => {
            addPhoto.style.borderColor = "#D9BBFF";
        }, 500);
        return;
    }else {
        let fileReaderSrc = document.querySelector(".loadedFileImg").src;
        userExportData["user_img"] = fileReaderSrc;
    }
    let btn = document.querySelector('.tellUsBtn');
    btn.style.backgroundColor = "#8E43ED";
    // Вывод готовых данных пользователя в консоль, тут должна быть отправка данных на сервер
    console.log(userExportData);

    let completedSection = document.querySelector(".complead");
    setTimeout(() => {
        completedSection.style.display = "flex";
    }, 10);
    setTimeout(() => {
        completedSection.style.display = "none";
        btn.style.backgroundColor = "#DED9E4";
    }, 2000);


    // зачищаем поля
    clearAll();
    validateForm();
}

clearAll();
initEventsListeners();