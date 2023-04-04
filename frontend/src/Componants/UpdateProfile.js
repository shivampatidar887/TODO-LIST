import React, { Fragment, useState, useEffect } from "react";
import "./form.css";
import { AiOutlineMail } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUser, updateProfile } from "../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";
import LoginSignUp from "./LoginSignup";
import { toast } from "react-toastify";
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const { error, isUpdated, loading: eloading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const token = localStorage.getItem('token');
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email
    };
    dispatch(updateProfile(userData));
  };

  useEffect(() => {
    if (!isAuthenticated && eloading === false) {
      navigate("/");
    }
    else if (isAuthenticated === true && loading === false) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(getUser(token));
      navigate("/home");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, loading, isAuthenticated, error, user, isUpdated, navigate]);
  return (
    <Fragment>
      {isAuthenticated === true ? (
        <Fragment>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfile">
                  <RxAvatar />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfile">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  id="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      ) : (
        <LoginSignUp />
      )}
    </Fragment>
  );
};

export default UpdateProfile;
