import './home.scss';
import Addlist from '../AddList/Addlist';
import React, { useState } from 'react';
import Task  from '../Task/task';
import List from '../List/List';
import AddTask from '../AddTask/AddTask';
import DeletePopup from '../DeletePopup/DeletePopup';
import { ToastContainer } from 'react-toastify';
import CompletedTasks from '../CompletedTasks/CompletedTasks.jsx';
import { useSelector } from 'react-redux';


const Home = () => {
  const localData = useSelector(state => state.localData);
  const [show, setShow] = useState(false);
  const [showTask, setTaskShow] = useState(false);
  const [editListId, setEditListId] = useState();
  const [listId, setListId] = useState(0);
  const [editTaskId, setEditTaskId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteListId, setDeleteListId] = useState();
  const [deleteTaskId, setDeleteTaskId] = useState();
  const [showSubmittedTasks, setshowSubmittedTasks] = useState(false);
  const [enableTaskBtn,setEnableTaskBtn]=useState(false);
  const [updatedActiveListId,setUpdatedActiveListId] = useState();
  
  const changeShowState = () => {
    setShow(!show);
  };

  const getEditListId = (id) => {
    setEditListId(id);
  };

  const clearAllFields = () => {
    setEditListId(0);
    changeShowState();
  };
  const changeShowDelete = (id) => {
    setShowDelete(!showDelete);
    id > 0 ? setDeleteListId(id) : setDeleteListId();
  };

  const getUpdatedActiveListId = (id) =>{
    setUpdatedActiveListId(id);
    console.log(id,"updated active list from home")
  }

  ///Tasks///

  const getListId = (e) => {
    setListId(e);
    console.log(e)
  };

  const changeShowStateTask = () => {
    setTaskShow(!showTask);
  };
  const getEditTaskId = (id) => {
    setEditTaskId(id);
  };
  const clearTaskFields = () => {
    setEditTaskId(0);
    changeShowStateTask();
  };

  const getDeleteTaskId = (id) => {
    setDeleteTaskId(id);
  };

  const changeShowDeleteTask = () => {
    setShowDelete(!showDelete);
  };

  ///Submitted Tasks////

  const changeShowSubmittedTasks = () => {
    setshowSubmittedTasks(!showSubmittedTasks);
  };

  return (
    <div className="container">
      <div className="col-12">
        <div className="row">
          <div className="title">
            <p>
              Todo List
              <img
                src="images/todoimage.webp"
                alt="todapp image"
                width="70px"
                height="70px"
              />
            </p>
          </div>
          <div>
            {!localData && listId === 0 ? (
              ""
            ) : (
              <button
                type="button"
                className="btn btn-primary addListButton"
                onClick={clearAllFields}
              >
                <i className="fa fa-plus" aria-hidden="true">
                  &nbsp;Add List
                </i>
              </button>
            )}

            {localData && listId >= 0 ? (
              <button
                type="button"
                className="btn btn-primary completedTasksButton"
                onClick={changeShowSubmittedTasks}
              >
                <i className="fa fa-check" aria-hidden="true">
                  &nbsp;Completed Tasks
                </i>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        
        <Addlist
          show={show}
          changeShowState={changeShowState}
          editListId={editListId}
        />
        <AddTask
          showAddTask={showTask}
          changeShowStateTask={changeShowStateTask}
          listId={listId}
          editTaskId={editTaskId}
         
          getEditTaskId={getEditTaskId}
        />
        <DeletePopup
          showDelete={showDelete}
          changeShowDelete={changeShowDelete}
          deleteListId={deleteListId}
          listId={listId}
          getListId={getListId}
          getUpdatedActiveListId = {getUpdatedActiveListId}
          deleteTaskId={deleteTaskId}
          getDeleteTaskId={getDeleteTaskId}
        />
        <CompletedTasks
          showSubmittedTasks={showSubmittedTasks}
          changeShowSubmittedTasks={changeShowSubmittedTasks}
          listId={listId}
        />
        <ToastContainer />
        <div className="col-12  twoGrids">
          <div className="row">
            {!localData && listId === 0 ? (
              <div className="col-10 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 noListAvailable">
                <p className="listsHeading listsHeadingWithoutLists">Welcome</p>
                <div className=" mr-2 homeLeftGrid" id="homeLeftGrid">
                  <List
                    show={show}
                    changeShowState={changeShowState}
                    getEditListId={getEditListId}
                    getListId={getListId}
                    updatedActiveListId = {updatedActiveListId}
                    changeShowDelete={changeShowDelete}
                    clearAllFields={clearAllFields}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                  <p className="listsHeading">
                    <span className="listsHeading">Lists</span>
                    <span className="actionsListsHeading">Actions</span>
                  </p>
                  <div className=" mr-2 homeLeftGrid" id="homeLeftGrid">
                    <List
                      show={show}
                      changeShowState={changeShowState}
                      getEditListId={getEditListId}
                      getListId={getListId}
                      updatedActiveListId = {updatedActiveListId}
                      changeShowDelete={changeShowDelete}
                    />
                  </div>
                </div>
                <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
                  <p className="tasksMainHeading">
                    <span className="completedHeading">Done?</span>
                    <span className="taskHeading">Tasks</span>
                    <span className="priorityHeading">Priority</span>
                    <span className="actionsTasksHeading">Actions</span>
                  </p>
                  <div className="homeRightGrid" id="homeRightGrid">
                    <Task
                      setEnableTaskBtn={setEnableTaskBtn}
                      changeShowStateTask={changeShowStateTask}
                      listId={listId}
                      getEditTaskId={getEditTaskId}
                      clearTaskFields={clearTaskFields}
                      changeShowDeleteTask={changeShowDeleteTask}
                      getDeleteTaskId={getDeleteTaskId}
                    />
                  </div>
                  {enableTaskBtn && (
                    <div className="addMoreTasks">
                      <button
                        type="button"
                        className="btn btn-primary addTaskFloatingButton"
                        onClick={clearTaskFields}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;