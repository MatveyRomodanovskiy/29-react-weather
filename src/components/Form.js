import React from 'react';
import {api_key, base_url, languages} from "../utils/constances";

const Form = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
        const city= e.target.city.value.trim();
        const lang=e.target.lang.value;
         fetch(`${base_url}?q=${city}&lang=${lang}&appid=${api_key}&units=metric`)
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        return res;
                    } else {
                        throw new Error(res.status);
                      }
                })
                .then(res => res.json())
                .then(data => {
                    const wheather = {};
                    wheather.city = data.name;
                    wheather.temperature = data.main.temp;
                    wheather.sunset = data.sys.sunset;
                    wheather.sunrise = data.sys.sunrise;
                    alert(`The temperature in ${wheather.city} is ${wheather.temperature} C, 
                    sunrise is at ${new Date(wheather.sunrise*1000)}, 
                    sunset is at ${new Date(wheather.sunset * 1000)}
                    Have a goof day!`)
                })
                .catch((error) => {
                      alert(error);
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type={'text'} name={'city'} placeholder={'City name'}/>
            <select id="lang" required={true}>
                <option value=''>--Please choose language--</option>
                {languages.map(el =><option value ={el.value}>{el.text}</option>)}
            </select>
            <button type={'submit'}>Get weather</button>
        </form>
    );
};

export default Form;