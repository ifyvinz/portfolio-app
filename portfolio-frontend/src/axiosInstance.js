import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://www.ifyvinz.com/api/',  // Django backend URL
});

export default instance;



//Then, in your React components, you can import and use this custom instance:
//javascript
//Copy code
//import axios from './axiosInstance';

//axios.get('/api/some-endpoint').then(response => {
  //console.log(response.data);
//});