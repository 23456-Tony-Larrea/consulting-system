import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import { Table } from 'reactstrap';
import { Input } from 'reactstrap';
import * as XLSX from 'xlsx';
import axios from './../../../api/axios';
import Swal from 'sweetalert2';
import Footer from 'containers/navs/Footer';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faDownload, faPassport } from '@fortawesome/free-solid-svg-icons';
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
        cedula: '1717171717',
        nombres: 'Perez Santillan Juan Carlos',
        mail_iess: 'admin@gmail.com',
        telefono_iess: '0999999999',
        celular_iess: '0999999999',
        direccion_iess: 'Calle 123',
        provincia_iess: 'washington',
        canton_iess: 'hill',
        parroquia_iess: 'nebrazka',
        pais_iess: 'Ecuador',
      },
      {
        cedula: '1818181818',
        nombres: 'Loor Lopez Andrea Maria',
        mail_iess: 'loor2@gmail.com',
        telefono_iess: '0999999999',
        celular_iess: '0998888888',
        direccion_iess: 'Calle 12',
        provincia_iess: 'Misuri',
        canton_iess: 'hiustone',
        parroquia_iess: 'nebrazka',
        pais_iess: 'Ecuador',
      },
    ];

    return {data};
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
  const checkExistingIdentity = async (CEDULA) => {
    try {
      const response = await axios.get(`api/iessGet/${CEDULA}`);
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
    const dataIess = excelData.map((item) => {
      return {
       CEDULA: item.cedula,
        NOMBRE: item.nombres,
        MAIL: item.mail_iess,
        TELEFONO: item.telefono_iess,
        CELULAR: item.celular_iess,
        DIRECCION: item.direccion_iess,
        PROVINCIA: item.provincia_iess,
        CANTON: item.canton_iess,
        PARROQUIA: item.parroquia_iess,
        PAIS: item.pais_iess,
      };
    });
    console.log(dataIess);
    for(const [index, item] of dataIess.entries()){
    const exists = await checkExistingIdentity(item.CEDULA);
    console.log(exists);
    console.log(item);
    if (exists) {
      toast.error(`La cédula "${item.CEDULA}" ya existe en la fila ${index + 1}`);
    } else {
    try{
      const response = await axios.post('api/iessPost',item);
      console.log(response);
      toast.success(`La cédula "${item.CEDULA}" se guardo exitosamente`)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
          text: '¡No se pudo guardar los datos!',
      });
    }
    if(Object.values(item).includes('')){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede dejar campos vacios',
      });
    } 
  }
}
  }
const { data} = MyTable();
const [excelData, setExcelData] = useState([]);
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
  XLSX.writeFile(wb, 'IESS.xlsx');
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

return (
<div id="app-container" className={containerClassnames}>
<TopNav history={history} />
<SidebarFooter />
<main>
{children}

<h3 className={s.title}>IMPORTAR IESS EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faPassport}
              /></h3>

        <div className={s.divContenedorInputButton}>
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
        {excelData.length > 0 && <h2 className={s.tituloTabla}>Usuarios IESS: {excelData.length}</h2>}
        
        <Table  borderless className={`${s.table}`}>
          <thead className={s.thead}>
          <tr>
                <th>Número</th>
                <th>Cédula</th>
                <th>Nombres</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Celular</th>
                <th>Dirección</th>
                <th>Provincia</th>
                <th>Cantón</th>
                <th>País</th>
                <th>Parroquia</th>
              </tr>
            </thead>
            <tbody className={s.tbody}>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.cedula}</td>
                  <td>{item.nombres}</td>
                  <td>{item.mail_iess}</td>
                  <td>{item.telefono_iess}</td>
                  <td>{item.celular_iess}</td>
                  <td>{item.direccion_iess}</td>
                  <td>{item.provincia_iess}</td>
                  <td>{item.canton_iess}</td>
                  <td>{item.pais_iess}</td>
                  <td>{item.parroquia_iess}</td>
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
          <Button onClick={() => sendExcelDatatoDatabase(excelData)}>
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
