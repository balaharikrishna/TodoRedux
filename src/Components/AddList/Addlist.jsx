import { useEffect, useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./AddList.scss";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from "react-redux";
import { add_List } from "../../Redux/actions";
import { update_List } from "../../Redux/actions";

const Addlist = ({ show, changeShowState, editListId}) => {

  const [listName, setListName] = useState(""); 
  const dispatch = useDispatch();
  const localData = useSelector(state => state.localData);

  let arrObjsLength = localData? localData.length - 1: 0;
  let listId = localData == null ||localData== undefined ||localData== "" ?  0 : localData[arrObjsLength].id;

  useEffect(() => {
    const list = localData == null || undefined || "" ? "" : localData.find(x => x.id == editListId);
      setListName(list ? list.listName : "");
  },[editListId]); 

  const handleListInput = (e) =>{
    let value =  e.target.value;
    setListName(value);
  }

  const addList = (e) => {
    e.preventDefault();
    dispatch(add_List({listName:listName,id:listId,tasks:[]}));
    listId = listId+1;
     setListName("");
     notify("List Added Successfully");
  };

  const updateList = (e) => {
    e.preventDefault();
    const editListId = e.target.id.value;
    dispatch(update_List({editListId,listName}))
    notify("List Updated Successfully");
  };

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
  
  return (
    <div className="container col-10 col-xs-10 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
      <Modal show={show} onHide={changeShowState}>
        <form onSubmit={editListId > 0 ? updateList : addList}>
          <Modal.Header closeButton className="addListHeader">
            <Modal.Title className="addListHeading">
              {editListId > 0 ? "Update List" : "Add List"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-3 ">
                <label className="nameLabel">Name:</label>
              </div>
              <div className="col-7 ">
                <input
                  type="text"
                  id="listName"
                  name="listName"
                  value={listName}
                  onChange={handleListInput}
                  className="listNameInputBox"
                  placeholder="Please Enter List Name"
                  autoComplete="off"
                  required
                />
                <input
                  type="hidden"
                  name="id"
                  value={editListId ? editListId : ""}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-Footer">
            <Button variant="secondary" onClick={changeShowState}>
              <i class="fa fa-times" aria-hidden="true">
                &nbsp;Close
              </i>
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={listName.length > 0 ? changeShowState : ""}
            >
              {editListId > 0 ? (
                <i class="fa fa-pencil" aria-hidden="true">
                  &nbsp;Update
                </i>
              ) : (
                <i class="fa fa-plus" aria-hidden="true">
                  &nbsp;Add
                </i>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Addlist;
