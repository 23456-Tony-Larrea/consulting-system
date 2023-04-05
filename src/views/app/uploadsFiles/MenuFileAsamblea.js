import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopNav from 'containers/navs/Topnav';
import SidebarFooter from 'containers/navs/SidebarFolder';
import 'react-circular-progressbar/dist/styles.css';
import { Table } from 'reactstrap';
import axios from '../../../api/axios';
import Swal from 'sweetalert2';
import { Input } from 'reactstrap';
import * as XLSX from 'xlsx';
import 'react-circular-progressbar/dist/styles.css';
import Footer from 'containers/navs/Footer';
import jwt from 'jsonwebtoken';
import { logoutUser } from '../../../redux/actions';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faDiagramNext, faDownload, faForwardFast, faLayerGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import s from './menu.module.css';
import { ToastContainer, toast } from 'react-toastify';

const AppLayout = ({ containerClassnames, children, history }) => {
  const token = localStorage.getItem('token');
  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${token}`;
      const decoded = jwt.decode(token).exp;
      if (decoded < Date.now() / 1000) {
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
        });
      }
      return config;
    },

    (error) => {
      if (error.response.status === 401) {
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
        });
      }
      return Promise.reject(error);
    }
  );
  function MyTable() {
    const data = [
      {
        nombres_apellidos: 'Juan Alex Perez Ochoa',
        cedula: '1717171717',
        cargo: 'Presidente',
        partido_politico: 'PSC',
        jefe_de_bancada: 'mesa psc',
        comisiones: 'comisiones psc',
        cargo_en_comisiones: 'cargo en comisiones psc',
        correo_electronico: 'juan@example.com',
      },
      {
        nombres_apellidos: 'Patricia Alexandra Alvarado Alvarado',
        cedula: '1818181818',
        cargo: 'Vicepresidente',
        partido_politico: 'alianza PAIS',
        jefe_de_bancada: 'mesa alianza PAIS',
        comisiones: 'comisiones alianza PAIS',
        cargo_en_comisiones: 'cargo en comisiones alianza PAIS',
        correo_electronico: 'patricia@example.com',
      },
    ];
    const headers = [
      { label: 'Nombres y Apellidos', key: 'nombres_apellidos' },
      { label: 'Cédula', key: 'cedula' },
      { label: 'Cargo', key: 'cargo' },
      { label: 'Partido político', key: 'partido_politico' },
      { label: 'Jefe de bancada', key: 'jefe_de_bancada' },
      { label: 'Comisiones', key: 'comisiones' },
      { label: 'Cargo en comisiones', key: 'cargo_en_comisiones' },
      { label: 'Correo electronico', key: 'correo_electronico' },
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
    };
    reader.readAsArrayBuffer(file);
  };
  const checkExistingIdentity = async (cedula) => {
    try {
      const response = await axios.get(`api/asambleistas/${cedula}`);
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
    const dataAsamblea = excelData.map((item) => {
      return {
        NOMBRES_APELLIDOS: item.nombres_apellidos,
        cedula: item.cedula,
        CARGO: item.cargo,
        PARTIDO_POLITICO: item.partido_politico,
        JEFE_DE_BANCADA: item.jefe_de_bancada,
        COMISIONES: item.comisiones,
        CARGO_EN_COMISIONES: item.cargo_en_comisiones,
        CORRREO_ELECTRONICO: item.correo_electronico,
      };
    });
    console.log(dataAsamblea);
    for (const [index, item] of dataAsamblea.entries()) {
      const exists = await checkExistingIdentity(item.cedula);
      if (exists) {
        toast.error(`La cédula "${item.cedula}" ya existe en la fila ${index + 1}`);
      } else {
        try {
          const response = await axios.post('api/asambleistasPost', item);
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(MyTable().data);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(excelData.length / pageSize);

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
    XLSX.writeFile(wb, 'asamblea.xlsx');
  };

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        const tokenDecode = jwt.verify(token);
        if (tokenDecode.exp * 1000 < Date.now()) {
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
        dispatch(loginUsers());
      }
      checkToken();
    };

    setTimeout(
      () => {
        setLoading(false);
      } /* ,3000 */
    );
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No tienes permiso para ingresar a esta página!',
      });
      history.push('/');
      window.location.reload();
    }
  }, [excelData, token, history]);

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <SidebarFooter />
      <main>
        {children}
        <h3 className={s.title}>IMPORTAR ASAMBLEA EXCEL<FontAwesomeIcon
                style={{ fontSize: '30px', marginLeft:"10px" }}
                icon={faUsers}
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
            Usuarios Asamblea: {excelData.length}
          </h2>
        )}
        <Table borderless className={`${s.table}`}>
          <thead className={s.thead}>
            <tr>
            <th>Número</th>
            <th>Nombres y Apellidos</th>
            <th>Cédula</th>
            <th>Cargo</th>
            <th>Partido político</th>
            <th>Jefe de bancada</th>
            <th>Comisiones</th>
            <th>Cargo en comisiones</th>
            <th>Correo electrónico</th>
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {displayedData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.nombres_apellidos}</td>
                <td>{item.cedula}</td>
                <td>{item.cargo}</td>
                <td>{item.partido_politico}</td>
                <td>{item.jefe_de_bancada}</td>
                <td>{item.comisiones}</td>
                <td>{item.cargo_en_comisiones}</td>
                <td>{item.correo_electronico}</td>
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
      <Footer />
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
