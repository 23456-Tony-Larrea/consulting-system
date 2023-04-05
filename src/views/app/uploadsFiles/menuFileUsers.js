import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import { Table } from 'reactstrap';
import { Input } from 'reactstrap';
import * as XLSX from 'xlsx';
import axios from './../../../api/axios3';
import Footer from 'containers/navs/Footer';
import { ScaleLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faAngleLeft, faAngleRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import s from './menu.module.css';





const AppLayout = ({ containerClassnames, children, history}) => {
  const token = localStorage.getItem('token');

  axios.interceptors.request.use(

    config => {

        config.headers.authorization = `Bearer ${token}`;
        const decoded = jwt.decode(token).exp
        if(decoded < Date.now() / 1000){
          localStorage.removeItem('token');
          dispatch(logoutUser());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Su sesión ha expirado!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.isConfirmed) {
          history.push('/');
          window.location.reload();
            }
          })
        }
        return config;
    },

    error => {
      if(error.response.status === 401){
        localStorage.removeItem('token');
        dispatch(logoutUser());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Su sesión ha expirado!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
        history.push('/');
        window.location.reload();
          }
        })
      }
        return Promise.reject(error);
     }

)

  function MyTable() {
    const data = [
      {
        cedula: '123456789',
        nombre_completo: 'LOPEZ GARZA JUAN ANDRES',
        apellido_paterno: 'LOPEZ',
        apellido_materno: 'GARZA',
        primer_nombre: 'JUAN',
        segundo_nombre: 'ANDRES',
      },
      {
        cedula: '123456789',
        nombre_completo: 'ALVAREZ SATIAN MARIA ANA',
        apellido_paterno: 'ALVAREZ',
        apellido_materno: 'SATIAN',
        primer_nombre: 'MARIA',
        segundo_nombre: 'ANA',
      },
    ];
    return { data };
  }
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(sheetData);
    }
    reader.readAsArrayBuffer(file);
  }
  const checkExistingIdentity = async (cedula) => {
    try {
      const response = await axios.get(`users/${cedula}`);
      console.log("Hi enter to get", response.data);
      if (response.data.length === 0) {
        return false;
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const sendExcelDatatoDatabase= async (excelData) => {
    const dataUser = excelData.map((item) => {
      return {
      cedula: item.cedula,
      nombre_completo: item.nombre_completo,
      apellido_paterno: item.apellido_paterno,
      apellido_materno: item.apellido_materno,
      primer_nombre: item.primer_nombre,
      segundo_nombre: item.segundo_nombre,
      };
    });
    for (const [index, item] of dataUser.entries()) {
      const exists = await checkExistingIdentity(item.cedula);
      if (exists) {
        toast.error(`La cédula "${item.cedula}" ya existe en la fila ${index + 1}`);
      } else {
        try {
          const response = await axios.post('/users', item);
          console.log(response);
          toast.success(`La cédula "${item.cedula}" se guardo exitosamente`)
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No se pudo guardar los datos!',
          });
        }
      }
      if (Object.values(item).includes('')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se puede dejar campos vacios',
        });
      }
    }
  };
const [excelData, setExcelData] = useState([]);
const [loading, setLoading] = useState(false);
const [loading2,setLoading2] = useState(true);
const [data, setData] = useState(MyTable().data);
const [currentPage,setCurrentPage]=useState(0)
const [pageSize,setPageSize]=useState(10)


const pageCount=Math.ceil(excelData.length/pageSize)


const handlePageClick = (data) => {
  setCurrentPage(data.selected);
};

const displayedData = excelData.slice(
  currentPage * pageSize,
  (currentPage + 1) * pageSize
);

const downloadExcel = () => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'registro_civil.xlsx');
};


useEffect(() => {
  const checkToken = ()=>{
    if(token){
      const tokenDecode = jwt.verify(token);
      if(tokenDecode.exp *1000< Date.now()){
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
        });  
        return false;        
      }
      dispatch(loginUsers())
    }
    checkToken();
  }
  setTimeout(() => {
    setLoading2(false);
  },1800);
  if(!token){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡No tienes permiso para ingresar a esta página!',
    });
    history.push('/');
    window.location.reload();
  }
}, [excelData,token, history]);
if (loading2) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <ScaleLoader color="#123abc" height={80} width={10} radius={4} margin={4} />
  </div>
  );
}
return (
<div id="app-container" className={containerClassnames}>
<TopNav history={history} />
<SidebarFooter />
<main>
{children}

<h3 className={s.title}>IMPORTAR REGISTRO CIVIL EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faAddressCard}
              /></h3>

        <div id='exampleFile' className={s.divContenedorInputButton}>
          <Input
            className={s.input}
            onChange={handleFile}
            type="file"
            name="file"
            id="exampleFile"
          />
          <Button className={s.button} onClick={downloadExcel}>
            Descargar plantilla de Excel
            <i>
              <FontAwesomeIcon
                style={{ marginLeft: '10px' }}
                icon={faDownload}
              />
            </i>
          </Button>
        </div>
        {excelData.length > 0 && (
          <h2 className={s.tituloTabla}>
            Usuarios Registro Civil: {excelData.length}
          </h2>
        )}
          <Table borderless className={`${s.table}`}>
            <thead className={s.thead}>
              <tr>
                <th>Número</th>
                <th>Cédula</th>
                <th>Nombre completo</th>
                <th>Apellido paterno</th>
                <th>Apellido materno</th>
                <th>Primer nombre</th>
                <th>Segundo nombre</th>
              </tr>
            </thead>
            <tbody  className={s.tbody}>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.cedula}</td>
                  <td>{item.nombre_completo}</td>
                  <td>{item.apellido_paterno}</td>
                  <td>{item.apellido_materno}</td>
                  <td>{item.primer_nombre}</td>
                  <td>{item.segundo_nombre}</td>
                </tr>
              ))}
            </tbody>
          </Table> 
          {excelData.length > 0 && (
          <ReactPaginate
            className={s.paginacion}
            previousLabel={
              <Button ><FontAwesomeIcon              
              icon={faAngleLeft}
            /></Button>
            }
            nextLabel={
              <Button ><FontAwesomeIcon              
              icon={faAngleRight}
            /></Button>
            }
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        )}

        {excelData.length > 0 && (
          <Button
            onClick={() => sendExcelDatatoDatabase(excelData)}
          >
            <strong>Enviar</strong>
          </Button>
        )}
      <ToastContainer
position="top-right"
hideProgressBar={false}
newestOnTop={false}
autoClose={10000}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      </main>
      <Footer/>
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
