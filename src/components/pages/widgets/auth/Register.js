import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/actions/authAction";
import "./auth.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    idNumber: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  return (
    <>
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <strong>New User Register</strong>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="nameHelp"
                      placeholder="write your name"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />
                   
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputPhoneNumber"
                      aria-describedby="phoneHelp"
                      placeholder="write your phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputidNumber"
                      aria-describedby="idHelp"
                      placeholder="write your national id number"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />


                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn btn-primary">
                    register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
