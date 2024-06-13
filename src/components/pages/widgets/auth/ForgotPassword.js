import { useState } from "react"
import { useDispatch } from "react-redux"
import { PasswordForgot } from "../../../redux/actions/authAction";
import { Container, Form, Row, Col, Button } from "react-bootstrap";


function ForgotPassword() {
    const[formData, setFormData] = useState({idNumber: "", email: ""})
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    

      const handleSubmit = async(event) => {
        event.preventDefault()

        await dispatch(PasswordForgot(formData))

      }
    


    return(<>

<Container style={{marginTop: "4rem", fontFamily: "Times New Roman"}}>
        <h4 className="text-center">Enter Details For Password Reset</h4>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
      
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
            
              

              <Form.Group className="mb-3" controlId="formBasicAuthorCountry">
                
                <Form.Control
                  type="text"
                  name="idNumber"
                  value={ formData.idNumber }
                  onChange={handleChange}

                  placeholder="write your ID number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                
                <Form.Control
                  type="email"
                  name="email"
                  value={ formData.email }
                  onChange={handleChange}

                  placeholder="write your email"
                  required
                />
              </Form.Group>




              <Button type="submit">submit details</Button>


</Form>
</Col>
</Row>
</Container>
    

    
    
    </>)


}

export default ForgotPassword