import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./List.css";
import { clearErrors, deletetask, getTask } from '../actions/taskActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginSignUp from './LoginSignup';
import {MdDelete} from "react-icons/md";
import {AiOutlineForm} from "react-icons/ai";
import {BsArrowRightCircleFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, tasks } = useSelector((state) => state.tasks);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading: delloading, error: delerror, isDeleted } = useSelector((state) => state.updateTask);
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleCollapse = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };
  const deleteTaskhandler = (Id) => {
    dispatch(deletetask(Id));
    setTimeout(function () {
      dispatch(getTask());
      toast.success("Task Deleted");
    }, 500)
  };
  useEffect(() => {
    if (typeof isAuthenticated === "undefined" && loading === false) {
      navigate("/")
    }
    if (isAuthenticated === false && loading === false) {
      navigate("/")
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTask());
  }, [dispatch, error]);

  return (
    <Fragment>{isAuthenticated === true ? (<Fragment>
      <div className="list">
        <div className="header">
          <p>Hello {user.name.split(" ")[0]} ! What's in your mind Today?</p>
          <Link to="/task/new">ADD TASK</Link>
        </div>
        <h2>Tasks</h2>
        <div className='main'>
          {tasks && tasks.map((task, index) => {
            return (
              <div className="task" key={task._id}>
                <div className="tit">
                  <h2>{task.title}</h2>
                  <div className="last">
                    <Link to="#" onClick={() => deleteTaskhandler(task._id)}><i className="fa fa-trash" style={{ color: 'red' }} aria-hidden="true"><MdDelete/> </i></Link>
                    <Link to={`/task/${task._id}`}><i className="fa fa-pencil-square" aria-hidden="true"><AiOutlineForm /></i></Link>
                    <Link to="#"><i className="fa fa-arrow-circle-down" onClick={() => handleCollapse(index)} aria-hidden="true"><BsArrowRightCircleFill/></i></Link>
                  </div>
                </div>
                <div className="desc" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                  {task.description}
                </div>
              </div>
            );
          })}
          {!tasks && <p>No tasks found</p>}
        </div>
      </div>
    </Fragment>) : (<LoginSignUp />)}
    </Fragment>


  );
};

export default List;
