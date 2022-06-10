export const ABOUT_TIT = { eng: 'About the App:', spa: 'Acerca de:' }
export const ABOUT_DEF = {
  eng: "This App was developed as a tool to assess how much the electrode's and cell's elaboration conditions affect the energy and power output of a battery bank. Its simplicity was sought to aid in the process of choosing components and scaling energy storage systems.",
  spa: 'Esta aplicación ha sido diseñada como una herramienta para determinar el efecto de las condiciones de preparación de electrodos y celdas en la energía y potencia de salida de paquetes de baterías. Además, debido a su naturaleza eficiente y sencilla puede ayudar a la toma de decisiones relacionada con la elección de componentes y el escalamiento de sistemas de almacenamiento de energía.',
}

export const BU_TIT = { eng: 'Base unit:', spa: 'Unidad mínima:' }
export const BU_DEF = {
  eng: 'The Base Unit is the minimum set of components required to achieve an autonomous electrochemical operation. This assembly is composed of: 3 electrodes (2 single coated anodes and 1 central double coated cathode), current collectors, separators, electrolyte, and additives (Super P carbon and a binder).',
  spa: 'La Unidad Minima es el arreglo de componentes necesario que permite el funcionamiento electroquímico de manera independiente. En este caso se ha elegido como el conjunto de 3 electrodos, dos ánodos single coated y un cátodo double coated en el centro. Los aditivos, como carbon super P y binder en los electrodos, los colectores de corriente, separador y electrolito necesarios forman parte de este arreglo.',
}

export const CTD_TIT = {
  eng: 'Charge Thickness Dependency:',
  spa: 'Charge Thickness Dependency:',
}
export const CTD_DEF = {
  eng: 'The relationship between thickness and loading of the active material is very complex and subject to different preparation conditions and treatments. If you already know the charge and thickness of your system, enter them independently. If you do not know them, you can enable the Charge Thickness Dependency option, which uses a linear relationship between cathodic charge and cathodic electrode thickness, where 50um = 1mg/cm2',
  spa: 'La relación entre el espesor y la carga del material activo es muy compleja y está sujeta a diferentes condiciones de preparación y tratamientos. Si ya conoce la carga y el espesor de su sistema ingréselos de forma independiente. Si no los conoce, puede habilitar la opción Charge Thickness Dependency, que usa una relación lineal entre carga catódica y espesor de electrodo catódico, donde 50um = 1mg/cm2',
}

export const VOL_TIT = { eng: 'Volume:', spa: 'Volumen:' }
export const VOL_DEF = {
  eng: 'The volume is calculated as a continuous addition of thicknesses, multiplied by the cross-sectional area. This should be understood as a first approximation to the minimum volume that can be expected to be obtained with the parameters used. It should be noted that the space that will exist between the different components of the array is not considered in this approximation, and may significantly affect the final volume.',
  spa: 'El volumen es calculado como una adición continua de espesores, multiplicados por el área transversal. Esto debe ser entendido como una primera aproximación al volúmen mínimo que es esperable obtener con los parámetros usados. Se advierte que el espacio que existirá entre los diferentes componentes del arreglo no está considerado en esta aproximación, y puede afectar de manera importante el volumen final.',
}
