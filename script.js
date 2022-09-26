const taskList = [];
const badList = [];
const hrPerWek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = frmData.get("hr");

  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  console.log(taskList);
  display();
};

const display = () => {
  let str = "";

  taskList.map((item, i) => {
    str += ` 
    <tr>
    <th scope="row">1</th>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>
      <button class="btn btn-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-success">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
  </tr>
    `;
  });
  document.getElementById("task-list").innerHTML = str;
};
