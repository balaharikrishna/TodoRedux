import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./DeletePopup.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { delete_List, delete_Task,empty_Store } from "../../Redux/actions";

const DeletePopup = ({showDelete,changeShowDelete,deleteListId,deleteTaskId,listId,getListId,getUpdatedActiveListId,getDeleteTaskId}) =>{
  const localData = useSelector((state) => state.localData);
  const dispatch = useDispatch();

  if(listId==0){
    listId = localData && localData.length >0 ? localData[0].id : 0;
  }

  const deleteList = (e) => {
    e.preventDefault();
    if(localData.length==1){
      dispatch(empty_Store());
      getListId(0);
      getUpdatedActiveListId(Math.random())
      localStorage.clear()
    }else{
      dispatch(delete_List({deleteListId}))
      getListId(localData && localData.length >0 ? localData[0].id : 0);
      getUpdatedActiveListId(Math.random());
    }
    notify("List Deleted Succesfully");
    changeShowDelete();
  };

  const deleteTask = (e) =>{
    e.preventDefault();
    if (listId == 0) {
      listId = localData[0].id;
    }
    dispatch(delete_Task({listId:listId,deleteTaskId:deleteTaskId}))
    notify("Task Deleted Succesfully");
    getDeleteTaskId(0);
    changeShowDelete();
  }

  const clearDeleteTaskId=()=>{
    getDeleteTaskId(0);
    changeShowDelete();
  }
 
  const notify = (note) => {
    toast(note, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
    });
  }

  return(<div className="container">
  <Modal show={showDelete} onHide={clearDeleteTaskId} className="deleteModel">
    <form >
      <Modal.Body className="modalBody">
        <div className="row">
          <div className="col-12 ">
           <label className="namelabel">Delete {deleteListId > 0 && !deleteTaskId > 0 ? localData.find(x => x.id == deleteListId).listName : "" } Permanently?</label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={clearDeleteTaskId} >
        <i class="fa fa-times" aria-hidden="true"></i> Close
        </Button>
        <Button variant="danger" type="submit" onClick={ listId > 0  && deleteTaskId > 0 ? deleteTask : deleteList } >
        <i class="fa fa-trash" aria-hidden="true"></i> Delete
        </Button>
      </Modal.Footer>
    </form>
  </Modal>
</div>);
}
export default DeletePopup