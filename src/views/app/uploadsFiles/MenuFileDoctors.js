import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import'react-circular-progressbar/dist/styles.css';
import { Table } from 'reactstrap';
import axios from '../../../api/axios';
import * as XLSX from 'xlsx';
import { Input } from 'reactstrap';
import Swal from 'sweetalert2';
import Footer from 'containers/navs/Footer';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faDownload, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
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
      if(error.response.status=== 401){
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
        cedula:'1717171717',
        email: 'admin@gmail.com',
        telefono: '099999999',
        email_trabajo: 'zona@work.com',
        sexo:'masculino',
        ciudad:'Quito'
       },
      {
        cedula:'1818181818',
        email: 'user@gmail.com',
        telefono: '0912345678',
        email_trabajo: 'edu@work.com',
        sexo:'femenino',
        ciudad:'Guayaquil'
       },
    ];

    return {data};
  }
  const [data, setData] = useState(MyTable().data);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Doctores.xlsx');
  };

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
  const checkExistingIdentity = async (identity) => {
    try {
      const response = await axios.get(`api/doctores/${identity}`);
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
    const dataDoctors = excelData.map((item) => {
      return {
        identity: item.cedula,
        email: item.email,
        cellphone: item.telefono,
        work_email: item.email_trabajo,
        sex: item.sexo,
        city: item.ciudad
      };
    });
    console.log(dataDoctors);
    for(const [index, item] of dataDoctors.entries()){
      const exists = await checkExistingIdentity(item.identity);
    console.log(item);
    if (exists) {
      toast.error(`La cédula "${item.identity}" ya existe en la fila ${index + 1}`);
    } else {
    try{
      const response = await axios.post('/api/doctoresPost',item);
      console.log(response);
      toast.success(`La cédula "${item.identity}" se guardo exitosamente`)
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
const [excelData,setExcelData] = useState([]);
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
}, [token, history]);

return (
<div id="app-container" className={containerClassnames}>
<TopNav history={history} />
<SidebarFooter />
<main>
{children}

<h3 className={s.title}>IMPORTAR DOCTORES EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faUserDoctor}
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
          {excelData.length > 0 && (
          <h2 className={s.tituloTabla}>
            Usuarios Doctores: {excelData.length}
          </h2>
        )}
          <Table  borderless className={`${s.table}`}>
            <thead className={s.thead}>
              <tr>
              <th>Número</th>
              <th>Cédula</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Email del trabajo</th>
              <th>Sexo</th>
              <th>Ciudad</th>
                </tr>
            </thead>
            <tbody className={s.tbody}>
              {displayedData.map((item, index) => (
                <tr key={index}>
                <td scope="row">{index + 1}</td>
                  <td>{item.cedula}</td>
                  <td>{item.email}</td>
                  <td>{item.telefono}</td>
                  <td>{item.email_trabajo}</td>
                  <td>{item.sexo}</td>
                  <td>{item.ciudad}</td>
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
