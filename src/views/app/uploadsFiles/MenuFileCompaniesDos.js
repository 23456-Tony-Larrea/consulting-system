import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import'react-circular-progressbar/dist/styles.css';
import { Table } from 'reactstrap';
import axios from '../../../api/axios2';
import Swal from 'sweetalert2';
import { Input } from 'reactstrap';
import * as XLSX from 'xlsx';
import'react-circular-progressbar/dist/styles.css';
import Footer from 'containers/navs/Footer';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faBuilding, faBuildingUn, faDownload } from '@fortawesome/free-solid-svg-icons';
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
        RUC:"17266244461001",
        NOMBRE:"anthony larrea",
        SITUACION_LEGAL:"ajjaaj",
        TIPO:"ajaja",
        PAIS:"jajaja",
        REGION:"akakak",
        PROVINCIA:"ajajja",
        CANTON:"ajajaj",
        CIUDAD:"aajja",
        CALLE:"ajja",
        NUMERO:"ajajja",
        INTERSECCION:"ajajja",
        BARRIO:"ajaja",
        REPRESENTANTE:"ajjaja",
        CARGO:"AJAJAJ",
        CAPITAL_SUSCRITO:"ajaja",
        ULTIMO_BALANCE:2021
        },
    ];
    const headers = [
    {label:'RUC' ,key:'RUC'},
    {label:'NOMBRE' ,key:'NOMBRE'},
    {label:'SITUACION LEGAL' ,key:'SITUACION LEGAL'},
    {label:'TIPO' ,key:'TIPO'},
    {label:'PAIS' ,key:'PAIS'},
    {label:'REGION' ,key:'REGION'},
    {label:'PROVINCIA' ,key:'PROVINCIA'},
    {label:'CANTON' ,key:'CANTON'},
    {label:'CIUDAD' ,key:'CIUDAD'},
    {label:'CALLE' ,key:'CALLE'},
    {label:'NUMERO' ,key:'NUMERO'},
    {label:'INTERSECCION' ,key:'INTERSECCION'},
    {label:'BARRIO' ,key:'BARRIO'},
    {label:'REPRESENTANTE' ,key:'REPRESENTANTE'},
    {label:'CARGO' ,key:'CARGO'},
    {label:'CAPITAL SUSCRITO' ,key:'CAPITAL SUSCRITO'},
    {label:'ULTIMO BALANCE' ,key:'ULTIMO_BALANCE'},
    ];
    return { data, headers };
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
  const checkExistingRUC = async (RUC) => {
    try {
      const response = await axios.get(`companiesEcuador/${RUC}`);
      console.log("Hi enter to get", response.data.data);
      if (response.data.data.length === 0) {
        return false;
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
 const sendExcelDatatoDatabase= async (excelData) => {
  const dataCompanies = excelData.map((item) => {
    return {
        RUC: item.RUC,
        NOMBRE: item.NOMBRE,
        SITUACION_LEGAL: item.SITUACION_LEGAL,
        TIPO: item.TIPO,
        PAIS: item.PAIS,
        REGION: item.REGION,
        PROVINCIA: item.PROVINCIA,
        CANTON: item.CANTON,
        CIUDAD: item.CIUDAD,
        CALLE: item.CALLE,
        NUMERO: item.NUMERO,
        INTERSECCION: item.INTERSECCION,
        BARRIO: item.BARRIO,
        REPRESENTANTE: item.REPRESENTANTE,
        CARGO: item.CARGO,
        CAPITAL_SUSCRITO: item.CAPITAL_SUSCRITO,
        ULTIMO_BALANCE: item.ULTIMO_BALANCE,
    };
  });
  console.log(dataCompanies);
  for(const [index, item] of dataCompanies.entries()){
  console.log(item);
  const exists = await checkExistingRUC(item.RUC);
  if (exists) {
    toast.error(`EL RUC "${item.RUC}" ya existe en la fila ${index + 1}`);
  } else {
 try{
    const response = await axios.post('/companiesEcuador',item);
    console.log(response);
    toast.success(`EL RUC "${item.RUC}" se guardo exitosamente`)
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
        text: '¡No se pudo guardar los datos!',
    });
  }
}
}
}
      
const [excelData, setExcelData] = useState([]);
const [loading, setLoading] = useState(true);
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
  XLSX.writeFile(wb, 'companias.xlsx');
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
   setLoading(false);
  }/* ,3000 */);
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

<h3 className={s.title}>IMPORTAR EMPRESAS EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faBuilding}
              /></h3>

    <div id='exampleFile' className={s.divContenedorInputButton}>
          <Input 
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
    <h2>Usuarios Empresa: {excelData.length}</h2>
    )
  }
   <Table  borderless className={`${s.table}`}>
    <thead className={s.thead}>
      <tr>
      <th>Número</th>
      <th>RUC</th>
      <th>Nombre</th>
      <th>Situación política</th>
      <th>Tipo</th>
      <th>País</th>
      <th>Región</th>
      <th>Provincia</th>
      <th>Cantón</th>
      <th>Ciudad</th>
      <th>Calle</th>
      <th>Número</th>
      <th>Intersección</th>
      <th>Barrio</th>
      <th>Representante</th>
      <th>Cargo</th>
      <th>Capital suscrito</th>
      <th>Último balance</th>
      </tr>
    </thead>
    <tbody className={s.tbody}>
      {displayedData.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
            <td>{item.RUC}</td>
            <td>{item.NOMBRE}</td>
            <td>{item.SITUACION_LEGAL}</td>
            <td>{item.TIPO}</td>
            <td>{item.PAIS}</td>
            <td>{item.REGION}</td>
            <td>{item.PROVINCIA}</td>
            <td>{item.CANTON}</td>
            <td>{item.CIUDAD}</td>
            <td>{item.CALLE}</td>
            <td>{item.NUMERO}</td>
            <td>{item.INTERSECCION}</td>
            <td>{item.BARRIO}</td>
            <td>{item.REPRESENTANTE}</td>
            <td>{item.CARGO}</td>
            <td>{item.CAPITAL_SUSCRITO}</td>
            <td>{item.ULTIMO_BALANCE}</td>
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
