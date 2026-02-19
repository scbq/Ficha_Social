export interface DevuelveAccesoV2 {
    rut: string;
    refresh_token: string;
    exp_refresh: Date;
    fecha: Date;
    idSistema: number;
    token: string;
    type: string;
}