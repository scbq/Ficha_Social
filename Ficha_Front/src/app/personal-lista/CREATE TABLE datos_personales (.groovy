CREATE TABLE datos_personales (
    nombre string [restricciones],
    apellido string [restricciones],
    pers_cod string [restricciones],
    sexo string [restricciones],
    fecha_nacimiento date [restricciones],
    grado string [restricciones],
    categoria string [restricciones],
    estado_civil string [restricciones],
    sistema_salud string [restricciones],
    sistema_previsional string [restricciones],
    domicilio string [restricciones],
    region string [restricciones],
    comuna string [restricciones],
    foto string [restricciones],
    fecha_creacion date [restricciones],
    PRIMARY KEY (pers_cod),
    FOREIGN KEY (pers_cod) REFERENCES datos_complementarios(rut)
);

datos_personales

CREATE TABLE datos_complementarios (
    pers_cod string [restricciones],
    seguro string [restricciones],
    nivel_educacional string [restricciones],
    pago_en_educacion string [restricciones],
    estado_domicilio string [restricciones],
    pueblo_indigena string [restricciones],
    cursa_estudios_particulares string [restricciones],
    enfermedad_cronica string [restricciones],
    discapacidad string [restricciones],
    paga_pension_alimenticia string [restricciones],
    PRIMARY KEY (pers_cod)
);  

CREATE TABLE ficha_social (
    pers_cod string [restricciones],
    fecha_creacion date [restricciones],
    PRIMARY KEY (pers_cod)
);      


CREATETABLE familiar (
    pers_cod string [restricciones],
    nombre string [restricciones],
    apellido string [restricciones],                                                         
    parentesco string [restricciones],
    fecha_nacimiento date [restricciones],  
    cargas string [restricciones],
    sistema_salud string [restricciones],
    vive_en_el_domicilio string [restricciones],
    estado_civil string [restricciones],
    nivel_educacional string [restricciones],
    enfermedad_base_discapac string [restricciones],
    aporta string [restricciones],
    rango_aporte number [restricciones],
    seguro_complementario string [restricciones],
    PRIMARY KEY (pers_cod)

);















inset in to table values 'nombre'












inset in to table values 'nombre'