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
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faBuildingShield, faDownload } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from 'react-toastify';
import s from './menu.module.css';


const AppLayout = ({ containerClassnames, children, history}) => {
  const token = localStorage.getItem('token');

  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  function MyTable() {
    const data = [
      {
        cedula: '1717171717',
        nivel: 'teniente',
        cargo: 'a3',
       },
      {
        cedula: '1818181818',
        nivel: 'comandante',
        cargo: 'a2',
       },
    ];
  
    return { data};
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
  const checkExistingIdentity = async (ced) => {
    try {
      const response = await axios.get(`api/policias/${ced}`);
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
  const sendExcelDatatoDatabase = async (excelData) => {
    const dataPolices = excelData.map((item) => {
      return {
        identity: item.cedula,
        level: item.nivel,
        charge: item.cargo,
      };
    });
    for (const [index, item] of dataPolices.entries()) {
      const exists = await checkExistingIdentity(item.identity);
      if (exists) {
        toast.error(`La cédula "${item.identity}" ya existe en la fila ${index + 1}`);
      } else {
        try {
          const response = await axios.post('api/policiasPost', item);
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
const [data, setData] = useState(MyTable().data);
const [currentPage,setCurrentPage]=useState(0)
const [pageSize,setPageSize]=useState(10)
const [errorMessage, setErrorMessage] = useState('');


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
  XLSX.writeFile(wb, 'policias.xlsx');
};

useEffect(() => {
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

<h3 className={s.title}>IMPORTAL POLICÍA EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faBuildingShield}
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
    <h2 className={s.tituloTabla}>Usuarios policias: {excelData.length}</h2>
    )
  }
          <Table  borderless className={`${s.table}`}>
            <thead className={s.thead}>
              <tr>
                <th>Número</th>
                <th>Cédula</th>
                <th>Nivel</th>
                <th>Cargo</th>
                </tr>
            </thead>
            <tbody className={s.tbody}>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.cedula}</td>
                  <td>{item.nivel}</td>
                  <td>{item.cargo}</td>
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
