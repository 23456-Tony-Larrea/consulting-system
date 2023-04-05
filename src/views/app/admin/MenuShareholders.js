import React,{useState,useEffect}from "react";
import { connect } from "react-redux";
import TopNav from 'containers/navs/Topnav';
import {Input,InputGroup, Button} from 'reactstrap';
import { withRouter } from "react-router-dom";
import axios from '../../../api/axios2';
import UsersShareholders from './UsersShareholders';
import SidebarShareholders from "containers/navs/SidebarShareholders";
import { SpinnerCircular } from 'spinners-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import Footer from "containers/navs/Footer";
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import s from '../../../../src/module.css/admin.module.css';


const AppLayout = ({ containerClassnames, children, history}) => {
    const token = localStorage.getItem('token');

    axios.interceptors.request.use(

            config => {

                config.headers.authorization = `Bearer ${token}`;

                return config;

            },

            error => {
              if(error.response.status === 401){
                localStorage.removeItem('token');
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: '¡Su sesión ha expirado!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                }).then((result) => {
                  if (result.isConfirmed) {
                history.push('/');
                  }
                })
              }
                return Promise.reject(error);
             }   
    )

useEffect(() => {
  setTimeout(() => {
    setLoading2(false);
  },1800);
    if(!token){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Su sesión ha expirado!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
            }).then((result) => {
            if (result.isConfirmed) {
        history.push('/');
    }
    })
    }
}, [token, history]);


 const [dataShareholders, setDataShareholders] =useState([]);
 const [loading, setLoading] = useState(false);
 const [loading2,setLoading2] = useState(true);
 const [showNewQueryButton, setShowNewQueryButton] = useState(false);
 const [errorMesages, setErrorMesages] = useState('');
 const [inputDisabled, setInputDisabled] = useState(false);



 const handleValidation = (value) => {
  if(value.length!==13){
    setErrorMesages('El numero de RUC debe tener 13 dígitos'); 
  }else{
      setErrorMesages('');
      setInputDisabled(true);
      setShowNewQueryButton(true);
  }
    }
 const handleChange = (e) => {
    const  value  = e.target.value;
    handleValidation(e.target.value);
    console.log(value);
    axios.get(`/companiesEcuador/${value}`)
    .then((response) => {
      setDataShareholders(response.data.data); 
        console.log(response);
        setLoading(true);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
}
if (loading2) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ScaleLoader color="#123abc" height={80} width={10} radius={4} margin={4} />
  </div>
  );
}
const handleNewQuery = () => {
  Swal.fire({
    title:'¿Seguro que quieres realizar una nueva consulta?',
    icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Realizar una nueva consulta',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
}
const createPDFShareholders= (dataShareholders) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(10);

    const title = "Consulta de accionistas";
    const x = doc.internal.pageSize.width / 2;
    const y = 40;
    doc.setFontSize(10);  
    doc.text(title, x, y, { align: "center" });
    
    doc.setLineWidth(1);
    doc.setDrawColor(0);
    dataShareholders.map((item) => {
      doc.text("Datos del accionista  : ", marginLeft, 70);
      doc.rect(20,80,550,500)
      doc.text("RUC: " + `${item.RUC||"NO HAY DATOS  " }`, marginLeft, 100);
      doc.text("Nombre de la compañía: " + `${item.NOMBRE||"NO HAY DATOS  " }`, marginLeft, 490);
      doc.text("Situacion legal: " + `${item.SITUACION_LEGAL||"NO HAY DATOS  " }`, marginLeft, 130);
      doc.text("Fecha constitucíon: " + `${item.FECHA_CONSTITUCION||"NO HAY DATOS  " }`, marginLeft, 160);
      doc.text("Província: " +`${item.PROVINCIA||"NO HAY DATOS  " }`,marginLeft,190);
      doc.text("Cantón: "+`${item.CANTON||"NO HAY DATOS  " }`, marginLeft,220)
      doc.text("Ciudad: "+`${item.CIUDAD||"NO HAY DATOS  " }`, marginLeft,250)
      doc.text("Calle: " + `${item.CALLE||"NO HAY DATOS  " }`, marginLeft,280);
      doc.text("Número: " + `${item.NUMERO||"NO HAY DATOS  " }`, marginLeft,310);
      doc.text("Barrrio: " + `${item.BARRIO||"NO HAY DATOS  " }`, marginLeft,340);
      doc.text("Representante: " +`${item.REPRESENTANTE||"NO HAY DATOS  " }`,marginLeft,370);
      doc.text("Cargo: "+`${item.CARGO||"NO HAY DATOS  " }`, marginLeft,400)
      doc.text("Capital suscrito: "+`${item. CAPITAL_SUSCRITO||"NO HAY DATOS  " }`, marginLeft,430)
      doc.text("Ultimo balance: "+`${item.ULTIMO_BALANCE||"NO HAY DATOS "}`, marginLeft, 460);
  });
  doc.save("accionistas.pdf")
  }

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <SidebarShareholders />
      <main>
        <div className={s.contenedorEmpresas}>
          {children}
          <h1 className={s.titleConsulta}>Empresas y acciones</h1>
          <InputGroup>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar por RUC"
              onChange={handleChange}
              maxLength="13"
              pattern="[0-9]*"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                  toast.error('Solo se permiten numeros');
                }
              }}
              disabled={inputDisabled}
              className={s.searchBarEmpresas}
            />
          </InputGroup>
          {showNewQueryButton && (
  <Button onClick={handleNewQuery}>Realizar nueva consulta</Button>
)}
 {errorMesages && <span className="text-danger text-center"
      style={{fontSize:'15px',
      fontWeight:'bold',
      fontFamily:'sans-serif',
      textAlign:'center'
      }}>{errorMesages}</span>}
          {loading &&
            dataShareholders.map((shareholders) => (
              <UsersShareholders
                key={shareholders.RUC}
                shareholders={shareholders}
              />
            ))}

          {loading && dataShareholders.length === 0 && (
            <div className="text-center">
              <h3>No se encontraron resultados</h3>
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="rgba(0, 0, 0, 0.44)"
                secondaryColor="rgba(0, 0, 0, 0.22)"
                enabled={false}
              />
            </div>
          )}
          <div className="text-center">
            {loading && dataShareholders.length > 0 && (
             <div className={s.divEmpresas}>
             {loading && dataShareholders.length > 0 && (
                 <Button
                   onClick={() => createPDFShareholders(dataShareholders)}
                className={s.descargarPdf}
                 >
                   Descargar PDF
                 </Button>
             )}
           </div>
            )}
          </div>
        </div>
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
        <Footer />
      </main>
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
