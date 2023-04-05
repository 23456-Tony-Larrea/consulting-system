import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';

import { loginUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from '../../api/axios'	

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Por favor ingrese su contraseña';
  } else if (value.length < 4) {
    error = 'El valor debe tener más de 3 caracteres';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Por favor ingrese su correo';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Correo invalido';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {

  const dispatch = useDispatch();

  const [email] = useState('');
  const [password] = useState('');

  useEffect(() => {
   
  },);

  const onUserLogin = (values) => {
    
    const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Por favor ingrese su correo';
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Correo invalido';
    }
    return error;
  };

    axios.post('api/auth/login', {
      email: values.email,
      password: values.password
    })
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        runLogoutTimer(dispatch,response.data.expires_in*1000);
        Swal.fire({
          title: '¡Bienvenido!',
          text: '¡Ingreso con éxito!',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6'
        });
        dispatch(loginUser(response.data.user, history));
      }
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        title: '¡Error!',
        text: '¡Usuario  o clave incorrecta!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    );
  };
  function runLogoutTimer(dispatch,expirationTime){
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
  const initialValues = { email, password };

  return (
    <Row className={`h-100`} style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"red"}}>
      <Colxx xxs="12" md="10" >
        <Card className="auth-card ">
          <div className="position-relative col-12 d-flex-column justify-content-center text-center image-side ">
            <h1 style={{fontWeight:"bold", color:"white", marginTop:"20px", backdropFilter:"blur(3px)",textShadow:"2px 2px 2px black"}}>Sistema de Consultas</h1>
            <h4 style={{fontWeight:"bold", color:"white", backdropFilter:"blur(3px)",textShadow:"2px 2px 2px black"}}>
              Utilice sus credenciales para iniciar sesión.
              <br />
              Si no es miembro, por favor contáctate con el administrador.
            </h4>
          </div>
          <div className="form-side">
           
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                     Constraseña
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    
                    <Button
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                      
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
