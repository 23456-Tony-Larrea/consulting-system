import axios from '../../api/axios'
import Swal from 'sweetalert2'
import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Colxx } from 'components/common/CustomBootstrap';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [password_confirmation,setPasswordConfirmation] = useState('');

  const onUserRegister = () => {
    if(name == '' && password == '' && email == '' && password_confirmation =='') {
      toast.error('Por favor ingrese todos los campos');
    }else if (!email) {
      toast.error ('Por favor ingrese su correo');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      toast.error('Correo invalido'); 
    } else if(password =='') {
      toast.error('Por favor ingrese su contraseña');
    } else if(password != password_confirmation) {
      toast.error('Las contraseñas no coinciden');
    } else{
    axios.post('api/auth/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    })
    .then(function (response) {
      if (response.status === 201) {
        localStorage.setItem('token', response.data.access_token);
        runLogoutTimer(dispatch,response.data.expires_in*1000);
        Swal.fire({
          title: 'Bienvenido!',
          text: 'Registro con éxito!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Correo existente!',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3085d6'
      })
    });
  }
        };
 
        function runLogoutTimer(dispatch,expirationTime){
          setTimeout(() => {
            dispatch(logout());
          }, expirationTime);
        }
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">Sistema de Consultas</p>
            <p className="white mb-0">
            Por favor use este formulario para registrarse. <br />
              Si es miembro, por favor{' '}
              <NavLink to="/user/login" className="text-primary roboto black color h8 bold">
                Ingresar
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              Registro
            </CardTitle>
            <Form>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  Nombre 
                </Label>
                <Input type="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}  
                
                />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  E-mail
                </Label>
                <Input type="email" value={email} 
                 onChange={(e) => setEmail(e.target.value)}  
                 />
                
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  Contraseña
                </Label>
                <Input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                 /> 
                
              </FormGroup>
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                 Confirmar Contraseña
                </Label>
                <Input type="password" 
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}  
                />     
              </FormGroup>
              <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  Registro
                </Button>
              </div>
            </Form>
            
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
