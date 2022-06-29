export { fetchCountries };
import Notiflix from 'notiflix';
function fetchCountries(name) {
  const myfetch = fetch(`https://restcountries.com/v3.1/name/${name}`).then(
    response => {
    //   console.log(response);
      if (!response.ok) {
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      } else {
        return response.json();
      }
    }
  );
  //   .catch(error => {return Notiflix.Notify.failure(
  //     'Oops, there is no country with that name'
  //   );})

  return myfetch;
}
