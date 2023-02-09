import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import "./Task.scss";
import { useSelector,useDispatch } from "react-redux";
import { completed_Task } from "../../Redux/actions";

const Task = ({
  setEnableTaskBtn,
  changeShowStateTask,
  listId,
  getEditTaskId,
  changeShowDeleteTask,
  getDeleteTaskId,
}) => {
  const localData = useSelector(state => state.localData)
  const dispatch = useDispatch();

  const [listName, setListName] = useState("");
  const [taskData, setTaskData] = useState(
    localData? [
          localData?.findIndex(
            (x) => x.id == listId
          ),
        ]
      : "".tasks?.filter((i) => i.isChecked === false)
  );
  
  if (listId == 0 || listId == undefined || listId == "") {
    listId = localData && localData[0] ? localData[0].id : 0;
  }

  useEffect(()=>{
    if(localData == null || localData == undefined){
      setListName("");
    }
  },[])

  useEffect(() => {
    if (listId == 0 || listId == undefined || listId == "") {
      listId = localData ? localData[0].id : 0;
    } else if (listId > 0 )  {
      const list = localData?.find((x) => x.id == listId);
      setListName(list ? list.listName : "");
    }
  }, [listId]);

  let listIndex = localData ? localData.findIndex((x) => x.id == listId) : "";
  
  useEffect(() => {
    setTaskData(
      localData && localData[listIndex]
        ? listId != 0 && localData[listIndex].tasks
          ? localData[listIndex].tasks.filter((i) => i.isChecked === false)
          : localData[0].tasks.filter((i) => i.isChecked !== true)
        : ""
    );
  }, [localData]);

  useEffect(() => {
    if (localData && listId > 0 && listId != "") {
      let listIndex = localData.findIndex((x) => x.id == listId);
      console.log(listId,"from tasks")
      setTaskData(
        localData[listIndex].tasks.filter((i) => i.isChecked === false)
      );
      
    } else {
      setTaskData(
        localData ? localData[0].tasks.filter((i) => i.isChecked !== true) : ""
      );
    }
  }, [listId,localData]);

  const editTask = (id) => {
    changeShowStateTask();
    getEditTaskId(id);
  };

  const deleteTask = (id) => {
    changeShowDeleteTask();
    getDeleteTaskId(id);
  };

  const notify = () => {
    toast("Task Submit Successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  };
                                                ///checkbox////

  const handleCheckBox = (id) => {
   dispatch(completed_Task({taskId:id}))
    const taskData = localData.find(list => list.id == listId)?.tasks.filter(task => !task.isChecked);
    setTaskData(taskData);
    notify();
  };

  const taskColors = {
    P1: "lightpink",
    P2: "#F7DC6F",
    P3: "#FFFACD",
  };

  function tasksCompare(a, b) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  if(localData && listId > 0 &&
    localData[listIndex] &&
    localData[localData.findIndex((x) => x.id == listId)]?.tasks.length > 0 &&
    taskData.length != 0)
  {
    setEnableTaskBtn(true);
  }
  else{
    setEnableTaskBtn(false);
  }

  return (
    <div>
      {localData && listId > 0 &&
      localData[listIndex] &&
      localData[localData.findIndex((x) => x.id == listId)]?.tasks.length > 0 &&
      taskData.length != 0 ? (
        <div>
          {taskData.sort(tasksCompare).map((x) => {
            return (
              <div
                className="card taskCard"
                style={{ backgroundColor: taskColors[x.priority] }}
              >
                <div className="card-body taskCardBody">
                  <div className="row">
                    <div className="col-2">
                      <input
                        type="checkbox"
                        label=""
                        checked={x.isChecked}
                        className="taskCheckBoxStatus"
                        onChange={() => handleCheckBox(x.id)}
                        autoComplete="off"
                      />
                    </div>
                    <div className="col-5 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      <p className="card-title">{x.taskName}</p>
                    </div>
                    <div className="col-2 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <p className="card-title">{x.priority}</p>
                    </div>
                    <div className="col-3 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2">
                      <div className="row">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <i
                            className="fa fa-pencil editOption"
                            onClick={() => editTask(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                          <i
                            className="fa fa-trash deleteOption"
                            onClick={() => deleteTask(x.id)}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="alert noTaskAvailable" role="alert">
              {listName
                ? `No Tasks Available for  ${listName} .`
                : "No data Available"}
            </div>
            <div className="col-12 text-center">{
              listName ?  <button
              type="button"
              className="btn btn-primary addTaskButton "
              onClick={changeShowStateTask}
            >
              Add Task
            </button> : ""
            }
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
