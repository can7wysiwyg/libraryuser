import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { PasswordReset } from "../../../redux/actions/authAction";


function ResetPassword() {
    const[formData, setFormData] = useState({password: ""})
    const dispatch = useDispatch()

 const accessToken =  JSON.parse(JSON.stringify(localStorage.getItem('accessToken')));


 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async(event) => {
    event.preventDefault()

    await dispatch(PasswordReset(formData, accessToken))



  }

 
           


    return(<>

<Container style={{ marginTop: "4rem", fontFamily: "Times New Roman" }}>
        <h4 className="text-center">Enter Details For Password Reset</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicAuthorCountry">
                <Form.Control
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="write your new password"
                  required
                />
              </Form.Group>

              
              {
              formData.password.length > 8  ? (
                <Button type="submit">Change Password</Button>
              ) : (
                <p className="text-danger">password should be longer than 8 digits</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>

    
    
    </>)
}


export default ResetPassword