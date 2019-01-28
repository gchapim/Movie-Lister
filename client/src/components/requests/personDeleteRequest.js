import axios from 'axios'

const url = '/api/people';

class PersonDeleteRequest {
  static delete(personId, data, success, error, token) {
    let auth = { 'Authorization': token }

    const setSuccess = (response) => {
      success(response.data)
    }

    const setError = (errorMessage) => {
      error(errorMessage)
    }

    axios.delete([url, personId].join('/'), { headers: auth })
         .then(response => { setSuccess(response) })
         .catch(error => {
           console.log(error);
           setError(error)
         })
  }
}

export default PersonDeleteRequest;

