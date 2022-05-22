// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiURL:'http://localhost:3000/api',
  departamentos : [
    {codigo:"Guatemala", nombre:"Guatemala"},
    {codigo:"Mixco", nombre:"Mixco"},
    {codigo:"Villa Nueva", nombre:"Villa Nueva"},
    {codigo:"San Juan Sacatepéquez", nombre:"San Juan Sacatepéquez"},
    {codigo:"Villa Canales", nombre:"Villa Canales"},
    {codigo:"Amatitlán", nombre:"Amatitlán"},
    {codigo:"San Miguel Petapa", nombre:"San Miguel Petapa"},
    {codigo:"Chinautla", nombre:"Chinautla"},
    {codigo:"San José Pinula", nombre:"San José Pinula"},
    {codigo:"Santa Catarina Pinula", nombre:"Santa Catarina Pinula"},
    {codigo:"Palencia", nombre:"Palencia"},
    {codigo:"San Pedro Ayampuc", nombre:"San Pedro Ayampuc"},
    {codigo:"Fraijanes", nombre:"Fraijanes"},
    {codigo:"San Pedro Sacatepéquez", nombre:"San Pedro Sacatepéquez"},
    {codigo:"San Raymundo", nombre:"San Raymundo"},
    {codigo:"Chuarrancho", nombre:"Chuarrancho"},
    {codigo:"San José del Golfo", nombre:"San José del Golfo"},
  ]

};

export const environment2 = {

  tipoEmpresas : [
    {codigo:"Sociedad Colectiva", nombre:"Sociedad Colectiva"},
    {codigo:"Sociedad En Comandita Simple", nombre:"Sociedad En Comandita Simple"},
    {codigo:"Sociedad De Responsabilidad Limitada", nombre:"Sociedad De Responsabilidad Limitada"},
    {codigo:"Sociedad Anónima", nombre:"Sociedad Anónima"},
    {codigo:"Sociedad En Comandita Por Acciones", nombre:"Sociedad En Comandita Por Acciones"},
  ]

}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
