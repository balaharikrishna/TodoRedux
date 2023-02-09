const initialData = {
  localData: JSON.parse(localStorage.getItem("tododata")),
};

const reducer = (state = initialData, action) => {

  switch (action.type) {
    case "ADD_LIST":
      const { id, listName, tasks } = action.payload;
      if (state.localData?.length >= 0) {
        return {
          ...state,
          localData: [
            ...state.localData,
            {
              listName: listName,
              id: id + 1,
              tasks: tasks,
            },
          ],
        };
      } else {
        return {
          localData: [
            {
              listName: listName,
              id: id + 1,
              tasks: tasks,
            },
          ],
        };
      }

    case "UPDATE_LIST":
      const { editListId, updatedListName } = action.payload;
      const index = state.localData.findIndex((x) => x.id == editListId);
      const newArray = [...state.localData];
      newArray[index].listName = updatedListName;
      return {
        ...state,
        localData: newArray,
      };

    case "DELETE_LIST":
      console.log(action.payload.deleteListId);
      const filteredList = state.localData.filter(
        (x) => x.id !== action.payload.deleteListId
      );
      return {
        ...state,
        localData: filteredList,
      };

    case "ADD_TASK":
      const { listId, taskName, priority, isChecked } = action.payload;
      var listDataIndex = state.localData.findIndex((x) => x.id == listId);
      const taskId = state.localData[listDataIndex].tasks[
        state.localData[listDataIndex].tasks.length - 1
      ]
        ? state.localData[listDataIndex].tasks[
            state.localData[listDataIndex].tasks.length - 1
          ].id + 1
        : 1;
      const newListArray = [...state.localData];
      const newTask = [
        ...state.localData[listDataIndex].tasks,
        {
          id: taskId,
          taskName: taskName,
          priority: priority ? priority : "P3",
          isChecked: isChecked,
        },
      ];
      newListArray[listDataIndex].tasks = newTask;
      return {
        ...state,
        localData: newListArray,
      };

    case "UPDATE_TASK":
      const { updateListId, editTaskId, updateTaskName, updatePriority } =
        action.payload;
      let UpdateListDataIndex = state.localData.findIndex(
        (x) => x.id == updateListId
      );
      let taskIndex = state.localData[UpdateListDataIndex].tasks.findIndex(
        (x) => x.id == editTaskId
      );
      const updateListArray = [...state.localData];
      updateListArray[UpdateListDataIndex].tasks[taskIndex].taskName =
        updateTaskName;
      updateListArray[UpdateListDataIndex].tasks[taskIndex].priority =
        updatePriority;
      return {
        ...state,
        localData: updateListArray,
      };

    case "DELETE_TASK":
      const { deletelistId, deleteTaskId } = action.payload;
      let listIndex = state.localData.findIndex((x) => x.id == deletelistId);
      const deleteListArray = [...state.localData];
      deleteListArray[listIndex].tasks = deleteListArray[
        listIndex
      ].tasks.filter((i) => i.id !== deleteTaskId);
      return {
        ...state,
        localData: deleteListArray,
      };

    case "COMPLETED_TASK":
      const completedListArray = [...state.localData];
      completedListArray.forEach((list) => {
        list.tasks.forEach((task) => {
          if (task.id == action.payload.taskId) {
            task.isChecked = true;
          }
        });
      });
      console.log(action.payload, completedListArray);
      return {
        ...state,
        localData: completedListArray,
      };

    case "UNDO_COMPLETED_TASK":
      const { undoCompletedTaskListId, undoCompletedTaskId } = action.payload;
      const completedlistIndex = state.localData.findIndex(
        (x) => x.id == undoCompletedTaskListId
      );
      const CompletedtaskIndex = state.localData[
        completedlistIndex
      ].tasks.findIndex((x) => x.id == undoCompletedTaskId);
      const undoCompletedListArray = [...state.localData];
      undoCompletedListArray[completedlistIndex].tasks[
        CompletedtaskIndex
      ].isChecked = false;
      return {
        ...state,
        localData: undoCompletedListArray,
      };
      
    case "EMPTY_STORE":
      let emptyArray = null;
      console.log("hitted empry store reducer");
      return {
        ...state,
        localData: emptyArray,
      };

    default:
      return state;
  }
};

export default reducer;
