const urlBase = 'https://backendcp-test.fach.cl/';
const urlMiFach = 'cpserv-mifach/mifach/';
const urlLogin = 'portal-login/login/';
const urlFeaCic = 'ws-documentos-fea/';

export const environment = {
    nameProyect: 'Bienestar Social',
    produccion: false,
    apiBaseUrl: 'http://localhost:8080',
    webComponent: false,
    idSistema: 301,
    endPointAuth: {
        get: {
            devuelveAviso: `${urlBase}${urlLogin}devuelve_aviso/{idSistema}`,
            refreshToken: `${urlBase}${urlLogin}refresh_token`,
            validate: `${urlBase}${urlLogin}validate`,
        },
        post: {
            devuelveAccesoV2: `${urlBase}${urlLogin}devuelve_acceso_v2/`,

        }
    },
    endPointsGlobal: {
        documentos: {
            devuelveFirmantes: `${urlBase}${urlLogin}devuelve_firmantes/{criterio}/{rut}`,
            pieFirma: `${urlBase}${urlMiFach}pie_firma`,
            buscarFuncionarioNombre: `${urlBase}${urlMiFach}buscar_funcionario_nombre`,
            devuelveMembrete: `${urlBase}${urlMiFach}devuelve_membrete/{idUnidad}`,
            enviaFirmarCic: `${urlBase}${urlFeaCic}envia_firmar`, //Envia documento para que devuelve idFea
            firmarDocumentoCic: `${urlBase}${urlFeaCic}firmar_documento`, //Firma Documento
            devuelveDocumentoCic: `${urlBase}${urlFeaCic}documento/{idDocumento}`,//Devuelve documento en base64 para mostrar en front
            eliminarDocumentoFea: `${urlBase}${urlFeaCic}eliminar_documento_fea`,//Elimina documento cuando la peticion sale erronea
        },
        infoUser: {
            devuelveResumenFuncionario: `${urlBase}${urlMiFach}devuelve_resumen_funcionario/{rutFuncionario}`,
            devuelveGrupoFamiliar: `${urlBase}${urlMiFach}devuelve_grupofamiliar/`,
            devuelveConyuge: `${urlBase}${urlMiFach}devuelve_conyuge/{rut}`,
            esFuncionaria: `${urlBase}${urlMiFach}es_funcionaria/{rut}`,
            devuelveDestinaciones: `${urlBase}${urlMiFach}devuelve_destinaciones`,
            devuelveListaCalificaciones: `${urlBase}${urlMiFach}devuelve_lista_calificacion`,
            devuelveFoto: `${urlBase}${urlMiFach}devuelve_foto/{rut}`,
            devuelveEspeEsca: `${urlBase}${urlMiFach}espe_esca/{codCat}/{grado}`, //se tiene que crear en mi fach y borrar de sisper , se utiliza en siscur
        },
    },
    //Endpoint correspondientes al proyecto que se va creando
    endPointsProyecto: {
        get: {},
        post: {}
    }


};
