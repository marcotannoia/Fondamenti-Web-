const user = "username";
const pass = "password";
//codifico la stinga "usr:pass" in formato BASE64
const basicAuth = Buffer.from(`${user}:${pass}`).toString('base64');

//interrogo l'endpoint (in questo caso carriera ma è uguale per tutti)
fetch('https://poliba.esse3.cineca.it/e3rest/api/carriere-service-v1/carriere', {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'authorization': `Basic ${basicAuth}`,      // qui passo la stringa codificate delle credenziali, specificando il tipo di login BASIC
    'X-Esse3-permit-invalid-jsessionid': 'true' // dice al server di risolvere l'auteticazione "in modalità" STATELESS
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));