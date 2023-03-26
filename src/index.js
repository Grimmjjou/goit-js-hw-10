import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEle=document.getElementById('search-box');
const listEle=document.querySelector('.country-list');
const infoEle=document.querySelector('.country-info');

const cleanMarkup=ref=>(ref.innerHtml='');

const inputHandler=elem=>{
    const textInput=elem.target.value.trim();
    if(!textInput){
        cleanMarkup(listEle);
        cleanMarkup(infoEle);
        return
    }
    fetchCountries(textInput)
    .then(data=>{console.log(data);
    if(data.length>10){Notify.info("Too many matches found. Please enter a more specific name.")
return;}
renderMarckup(data)})
.catch(err=>{
    cleanMarkup(listEle);
    cleanMarkup(infoEle);
    Notify.failure("Oops, there is no country with that name");
});
};
const renderMarckup=data=>{
    if(data.length===1){
        cleanMarkup(listEle);
        const markupInfo=createInfoMarkup(data);
        infoEle.innerHTML=markupInfo;
    }else{
        cleanMarkup(infoEle);
        const markupList=createListMarkup(data);
        listEle.innerHTML=markupList;
    }
};
const createListMarkup=data=>{
    return data
    .map(({name,flags})=>`<li><img src="${flags.svg}" alt="${name.official}" width=60 px heigth=60 px>${name.official}<li>`,)
    .join('');
};

const createInfoMarkup=data=>{
    return data.map((
        {name,capital,population,flags,languages}
    )=>`<h1><img src="${flags.svg}" alt="${name.official}" width=60 px heigth=60 px>${name.official}</h1>
    <p>Capital:${capital}<p>
    <p>Population:${population}<p>
    <p>Languages:${languages}<p>`,);
};
inputEle.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));