// VKİ: vuvut Kitle indeksi
//kilo
//boy
//vki_hesapla

// 18.5 ve altı Düşük Kilolu
// 18.5 - 24.9 Normal Kilolu
// 25-29.9 Fazla Kilolu
// 30-40 Obez
// 40 ve üstü Aşırı Obez

$(function() {
    $("#vki_hesapla").on("click", function() {
        let kilo = Number($("#kilo").val());
        let boy = Number($("#boy").val()) / 100;

        //Vücut Kitle İndeksi (VKİ) = Vücut Ağırlığı (kg.) / Boy uzunluğunun karesi (m2.)
        let vki = kilo / Math.pow(boy, 2);

        let yuvarlama = Math.round(vki);
        //sonuc:
        $("#sonuc").html(vki);
        if (yuvarlama < 18) {
            $("#sonuc2").html("<i> <b>Düşük Kilolu<</b>  /i>");
        } else if (18 <= yuvarlama && yuvarlama < 24) {
            $("#sonuc2").html("<i><b>Normal Kilolu</b></i>");
        } else if (24 <= yuvarlama && yuvarlama < 29) {
            $("#sonuc2").html("<i><b>Fazla Kilolu</b></i>");
        } else if (30 <= yuvarlama && yuvarlama < 40) {
            $("#sonuc2").html("<i><b>Obez Kilolu</b></i>");
        } else if (yuvarlama >= 40) {
            $("#sonuc2").html("<i> <b>Aşırı Obez</b>  </i>");
        }
    });
});

// Paragraf göster gizle
$(function() {
    $("#goster").click(function() {
        $("#aside-p").show();
    });

    $("#gizle").click(function() {
        $("#aside-p").hide();
    });
});

//sss sıkca sorulan sorular
$(function() {
    $("#sss").click(function() {
        $("#showsss").slideUp(1500).slideDown(1500);
    });
});

//mesaj kısmında counter
//paragraf_sayi  mesaj
$(function() {
    $("#mesaj").on("input", function(e) {
        var max = 150;
        $("#mesaj").focus();
        $("#mesaj").val($("#mesaj").val().substring(0, max));
        var mesajKalan = max - $(this).val().length;
        $("#paragraf_sayi").text("kalan karakter sayısı: " + mesajKalan);
    });
});

//login register
//registerId  registerModal
$(document).ready(function() {
    $("#basic-form").validate({
        errorClass: "error fail-alert",
        validClass: "valid success-alert",
        rules: {
            name: {
                required: true,
                minlength: 3,
            },
            password: {
                required: true,
                number: true,
                min: 8,
                password: true,
            },
            email: {
                required: true,
                email: true,
            },
        },
        messages: {
            name: {
                minlength: "Minumum 3 karakter giriniz",
                required: "Ad alanı boş geçemezsiniz",
            },
            password: {
                required: "Şifre  alanını boş geçemezsiniz",
                //number: "Lütfen sayısal değer giriniz",
                min: "şifre için en az 8 karakter olmalı",
            },
            email: {
                required: "Email alanını boş geçemezsiniz",
                email: "Email formatında girmediniz örneğin: xyz@deneme.com",
            },
        },
    });
});


var taskInput = document.getElementById("new-task"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


//New task list item
var createNewTaskElement = function(taskString) {

    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbx
    //label
    var label = document.createElement("label"); //label
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton = document.createElement("button"); //edit button

    //button.delete
    var deleteButton = document.createElement("button"); //delete button

    label.innerText = taskString;

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";



    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

//Edit an existing task.

var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
}




//Delete task.
var deleteTask = function() {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
    console.log("Incomplete Task...");
    //Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incomplete-tasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function() {
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");


    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}