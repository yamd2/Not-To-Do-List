let taskList = []; //all the list in entry
let badList = []; // only list when you mark as bad list
const hrPerWek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj = {
    task,
    hr,
  };

  const totalTaskHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  const total = totalTaskHrs + hr + totalBadHours();
  if (total > hrPerWek) {
    return alert("No more hours left to add new task");
  }

  taskList.push(obj);
  console.log(taskList);
  display();
  totalTaskHours();
};

const display = () => {
  let str = "";

  taskList.map((item, i) => {
    str += ` 
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td>
      <button onclick="deleteItem(${i})"class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick="markAsNotToDo(${i})"class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>
    `;
  });
  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();
};

const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += ` 
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${item.task}</td>
    <td>${item.hr}hr</td>
    <td>
    <button onclick = "deleteBadItem(${i})" class="btn btn-danger">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button onclick="markAsToDo(${i})" class="btn btn-success">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
    </td>
  </tr>`;
  });
  document.getElementById("bad-list").innerHTML = str;
  totalTaskHours();
  totalBadHours();
};

const totalTaskHours = () => {
  const total = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  console.log(total);
  document.getElementById("totalHrs").innerHTML = total + totalBadHours();
};

const totalBadHours = () => {
  const total = badList.reduce((subTtl, item) => {
    return subTtl + item.hr;
  }, 0);
  document.getElementById("totalBadHrs").innerText = total;
  return total;
};

const deleteItem = (i) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }

  const tempArg = taskList.filter((item, index) => {
    return i !== index;
  });
  taskList = tempArg;

  display();
};

const deleteBadItem = (i) => {
  if (!window.confirm("Are you sure you want to delete this task?")) {
    return;
  }

  const tempArg = badList.filter((item, index) => {
    return i !== index;
  });
  badList = tempArg;
  displayBadList();
};

const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1)[0];

  badList.push(itm);

  displayBadList();

  display();

  console.log(badList, taskList);
};

const markAsToDo = (i) => {
  const itm = badList.splice(i, 1)[0];

  taskList.push(itm);

  display();

  displayBadList();

  console.log(taskList, badList);
};
