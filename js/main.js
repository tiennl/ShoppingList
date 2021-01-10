showTask();

let addTaskInput = document.getElementById("addTaskInput");
let addTaskDescription = document.getElementById("addTaskDescription");
let addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", function(){
    addTaskInputVal = addTaskInput.value;
    addTaskDescriptionVal = addTaskDescription.value;

    if(addTaskInputVal.trim() != 0){
        var taskObj = [];
        let webTask = localStorage.getItem("localTask");
        if(webTask != null){
            taskObj = JSON.parse(webTask);
        }
        taskObj.push({'taskName':addTaskInputVal, 'taskDescription':addTaskDescriptionVal, 'completeStatus':false});
        localStorage.setItem("localTask", JSON.stringify(taskObj));
        addTaskInput.value = '';
        addTaskDescription.value = '';
    }

    showTask();
})

// show
function showTask(){
    let webTask = localStorage.getItem("localTask");
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
    }
    let html = '';
    let addedTaskList = document.getElementById("addedTaskList");
    taskObj.forEach((item, index) => {

        if(item.completeStatus===true){
            taskCompleteValue = `<td class="completed">${item.taskName}</td>
            <td class="completed">${item.taskDescription}</td>`;
        }else{
            taskCompleteValue = `<td>${item.taskName}</td>
            <td>${item.taskDescription}</td>`;
        }

        html += `<tr>
                    <th scope="row">${index+1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="editTask(${index})" class="text-primary"><i class="fas fa-pencil-alt"></i>Edit</button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="fas fa-check"></i>Done</button></td>
                    <td><button type="button" onclick="deleteItem(${index})" class="text-danger"><i class="fas fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedTaskList.innerHTML = html;
}

// edit
function editTask(index){
    let saveIndex = document.getElementById("saveIndex");
    let addTaskBtn = document.getElementById("addTaskBtn");
    let saveTaskBtn = document.getElementById("saveTaskBtn");
    saveIndex.value = index;
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask); 
    
    addTaskInput.value = taskObj[index]['taskName'];
    addTaskDescription.value = taskObj[index]['taskDescription'];
    addTaskBtn.style.display="none";
    saveTaskBtn.style.display="block";
}

// save
let saveTaskBtn = document.getElementById("saveTaskBtn");
saveTaskBtn.addEventListener("click", function(){
    let addTaskBtn = document.getElementById("addTaskBtn");
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask); 
    let saveIndex = document.getElementById("saveIndex").value;
    
    for (keys in taskObj[saveIndex]) {
        if(keys == 'taskName'){
            taskObj[saveIndex].taskName = addTaskInput.value;
            taskObj[saveIndex].taskDescription = addTaskDescription.value;
        }
      }

    saveTaskBtn.style.display="none";
    addTaskBtn.style.display="block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    addTaskInput.value='';
    addTaskDescription.value = '';
    showTask();
})

// delete
function deleteItem(index){
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    taskObj.splice(index, 1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
}

// mark done
let addedTaskList = document.getElementById("addedTaskList");
    addedTaskList.addEventListener("click", function(e){
        // showtask();
        let webTask = localStorage.getItem("localTask");
        let taskObj = JSON.parse(webTask);
            
        let myTarget = e.target;
        if (myTarget.classList[0] === 'text-success'){
            let myTargetId = myTarget.getAttribute("id");
                
            myTargetPreSibling = myTarget.parentElement.previousElementSibling.previousElementSibling;
                    
            for (keys in taskObj[myTargetId]) {
                if(keys == 'completeStatus' && taskObj[myTargetId][keys]==true){
                    taskObj[myTargetId].completeStatus = false;
                }else if(keys == 'completeStatus' && taskObj[myTargetId][keys]==false){
                    taskObj[myTargetId].completeStatus = true;
                }
            }

            // showtask();        
            localStorage.setItem("localTask", JSON.stringify(taskObj));
            showTask();
        }
    })

// delete all
let deleteAllBtn = document.getElementById("deleteAllBtn");
deleteAllBtn.addEventListener("click", function(){
    let saveTaskBtn = document.getElementById("saveTaskBtn");
    let addTaskBtn = document.getElementById("addTaskBtn");
    let webTask = localStorage.getItem("localTask");
    let taskObj = JSON.parse(webTask);
    if (webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    saveTaskBtn.style.display="none";
    addTaskBtn.style.display="block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    showTask();
})
