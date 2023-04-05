import React,{useState,useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import'react-circular-progressbar/dist/styles.css';
import { Table } from 'reactstrap';
import axios from '../../../api/axios4';
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
import { faAngleLeft, faAngleRight,faWheelchairAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
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
        CODIGO_CONADIS:"62.842",
        CEDULA:"123456789",
        NOMBRES:"JUAN ANDRES",
        APELLIDOS:"LLOA YAPANTA",
        TIPO_DISCAPACIDAD_ACTUAL:"INTELECTUAL",
        GRADO_DISCAPACIDAD_ACTUAL:"GRAVE",
        PORCENTAJE_DISCA_ACTUAL:"70",
        PERIODO_ADQUISICION:"CONGENITO",
        PERIODO_ADQUISICION_TIPO:"ENFERMEDAD",
        PERIODO_ADQUISICION_SUBTIPO:"NO APLICA",
        EDAD:"45",
        TELEFONO_CONVEN:"(02)2457814",
        TELEFONO_CELULAR:"099574524",
        PROVINCIA:"Pichincha",
        CANTON:"Quito",
        PARROQUIA:"Chillogallo",
        SEXO:"M",
        ESTADO_CALIFICACION:"NUEVO"
        },
    ];
    const headers = [
        { label: "CODIGO CONADIS", key: "CODIGO_CONADIS" },
        { label: "CEDULA", key: "CEDULA" },
        { label: "NOMBRES", key: "NOMBRES" },
        { label: "APELLIDOS", key: "APELLIDOS" },
        { label: "TIPO DISCAPACIDAD ACTUAL", key: "TIPO_DISCAPACIDAD_ACTUAL" },
        { label: "GRADO DISCAPACIDAD ACTUAL", key: "GRADO_DISCAPACIDAD_ACTUAL" },
        { label: "PORCENTAJE DISCA ACTUAL", key: "PORCENTAJE_DISCA_ACTUAL" },
        { label: "PERIODO ADQUISICION", key: "PERIODO_ADQUISICION" },
        { label: "PERIODO ADQUISICION TIPO", key: "PERIODO_ADQUISICION_TIPO" },
        { label: "PERIODO ADQUISICION SUBTIPO", key: "PERIODO_ADQUISICION_SUBTIPO" },
        { label: "EDAD", key: "EDAD" },
        { label: "TELEFONO CONVEN", key: "TELEFONO_CONVEN" },
        { label: "TELEFONO CELULAR", key: "TELEFONO_CELULAR" },
        { label: "PROVINCIA", key: "PROVINCIA" },
        { label: "CANTON", key: "CANTON" },
        { label: "PARROQUIA", key: "PARROQUIA" },
        { label: "SEXO", key: "SEXO" },
        { label: "ESTADO CALIFICACION", key: "ESTADO_CALIFICACION" },
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
  const checkExistingCedula = async (CEDULA) => {
    try {
      const response = await axios.get(`conadies/${CEDULA}`);
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
  const dataConadies = excelData.map((item) => {
    return {
    CODIGO_CONADIS:item.CODIGO_CONADIS,
    CEDULA:item.CEDULA,
    NOMBRES:item.NOMBRES,
        APELLIDOS:item.APELLIDOS,
        TIPO_DISCAPACIDAD_ACTUAL:item.TIPO_DISCAPACIDAD_ACTUAL,
        GRADO_DISCAPACIDAD_ACTUAL:item.GRADO_DISCAPACIDAD_ACTUAL,
        PORCENTAJE_DISCA_ACTUAL:item.PORCENTAJE_DISCA_ACTUAL,
        PERIODO_ADQUISICION:item.PERIODO_ADQUISICION,
        PERIODO_ADQUISICION_TIPO:item.PERIODO_ADQUISICION_TIPO,
        PERIODO_ADQUISICION_SUBTIPO:item.PERIODO_ADQUISICION_SUBTIPO,
        EDAD:item.EDAD,
        TELEFONO_CONVEN:item.TELEFONO_CONVEN,
        TELEFONO_CELULAR:item.TELEFONO_CELULAR,
        PROVINCIA:item.PROVINCIA,
        CANTON:item.CANTON,
        PARROQUIA:item.PARROQUIA,
        SEXO:item.SEXO,
        ESTADO_CALIFICACION:item.ESTADO_CALIFICACION,
    };
  });
  console.log(dataConadies);
  for(const [index, item] of dataConadies.entries()){
  console.log(item);
  const exists = await checkExistingCedula(item.CEDULA);
  if (exists) {
    toast.error(`El usuario con la cedula "${item.CEDULA}" ya existe en la fila ${index + 1}`);
  } else {
 try{
    const response = await axios.post('/conadies',item);
    console.log(response);
    toast.success(`El usuario con la cedula "${item.CEDULA}" se guardo exitosamente`)
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
  XLSX.writeFile(wb, 'CONADIS.xlsx');
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

<h3 className={s.title}>IMPORTAR CONADIS EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faWheelchairAlt}
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
    <h2>Usuarios CONADIS: {excelData.length}</h2>
    )
  }
   <Table  borderless className={`${s.table}`}>
    <thead className={s.thead}>
      <tr>
        <th>Número</th>
        <th>Código CONADIS</th>
        <th>Cédula</th>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Tipo de discapacidad actual</th>
        <th>Grado de discapacidad actual</th>
        <th>Porcentaje de discapacidad </th>
        <th>Período adquisición</th>
        <th>Período adquisición tipo</th>
        <th>Período adquisición Subtipo</th>
        <th>Edad</th>
        <th>Teléfono convencional</th>
        <th>Teléfono celular</th>
        <th>Provincia</th>
        <th>Cantón</th>
        <th>Parroquia</th>
        <th>Sexo</th>
        <th>Estado calificación</th>    
      </tr>
    </thead>
    <tbody className={s.tbody}>
      {displayedData.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
            <td>{item.CODIGO_CONADIS}</td>
            <td>{item.CEDULA}</td>
            <td>{item.NOMBRES}</td>
            <td>{item.APELLIDOS}</td>
            <td>{item.TIPO_DISCAPACIDAD_ACTUAL}</td>
            <td>{item.GRADO_DISCAPACIDAD_ACTUAL}</td>
            <td>{item.PORCENTAJE_DISCA_ACTUAL}</td>
            <td>{item.PERIODO_ADQUISICION}</td>
            <td>{item.PERIODO_ADQUISICION_TIPO}</td>
            <td>{item.PERIODO_ADQUISICION_SUBTIPO}</td>
            <td>{item.EDAD}</td>
            <td>{item.TELEFONO_CONVEN}</td>
            <td>{item.TELEFONO_CELULAR}</td>
            <td>{item.PROVINCIA}</td>
            <td>{item.CANTON}</td>
            <td>{item.PARROQUIA}</td>
            <td>{item.SEXO}</td>
            <td>{item.ESTADO_CALIFICACION}</td>

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
