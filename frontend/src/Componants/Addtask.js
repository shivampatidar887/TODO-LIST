import React, { Fragment, useEffect, useState } from "react";
import "./form.css";
import { useSelector, useDispatch } from "react-redux";
import { NEW_TASK_RESET } from "../constants/taskConstants";
import { useNavigate } from "react-router-dom";
import { TbFileDescription } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import LoginSignUp from "./LoginSignup";
import { toast } from "react-toastify"
import { clearErrors, createTask } from "../actions/taskActions";
const Addtask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newTask);
    const { isAuthenticated, user, loading: mloading } = useSelector((state) => state.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (typeof isAuthenticated === "undefined" && mloading === false) {
            navigate("/")
        }
        if (isAuthenticated === false && mloading === false) {
            navigate("/")
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Task Created Successfully");
            navigate("/home");
            dispatch({ type: NEW_TASK_RESET });
        }
    }, [dispatch, error, navigate, success]);

    const createTaskSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("title", title);
        myForm.set("description", description);
        dispatch(createTask(myForm));
    };

    return (
        <Fragment>
            {isAuthenticated === true ? (<Fragment>
                {isAuthenticated === true ? (<Fragment>
                    <div className="newTaskContainer">
                        <div className="newTaskBox">
                            <form
                                className="createTaskForm"
                                encType="multipart/form-data"
                                onSubmit={createTaskSubmitHandler}
                            >
                                <h1 style={{ color: '#fff' }} >Create Task</h1>
                                <div className="newTaskinpt">
                                    <BsPencilSquare />
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="newTaskinpt">
                                    <TbFileDescription />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="createTaskBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>) : (<LoginSignUp />)}
            </Fragment>) : (<LoginSignUp />)}
        </Fragment>

    );
};

export default Addtask;
