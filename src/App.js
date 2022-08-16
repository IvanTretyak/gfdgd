import './App.css';
import Papa from "papaparse";
import {FixedSizeList} from 'react-window';
import axios from "axios";
import map from "lodash/map";
import {useEffect, useState,useCallback} from "react";
import Search from "./Components/Search";
import HightLight from './utils/hightlight';


function App() {
    const light = useCallback((str) => {
        console.log("hello")
        return (
          <HightLight filter={word} str={str}/>
        )
      }, [])
    const Row = ({index, style}) => {
        



        return(
            <div style={style}>
                <div className="country">
                    {<p className="country__country">
                        Город: {light(showCollection[index].city)}
                    </p>}
                    {<p className="country__lat">
                        Широта: {showCollection[index].lat}
                    </p>}
                    {<p className="country__lng">
                        Долгота: {showCollection[index].lng}
                    </p>}
                    {<p className="country__city">
                        Страна: {light(showCollection[index].country)}
                    </p>}
                    {<p className="country__population">
                        Численность: {showCollection[index].population}
                    </p>}
                </div>
            </div>
        );
    }
    
   


    const [countries, setCountries] = useState("");
    const [showCollection,setShowCollection]=useState("")
    const [word, setWord] = useState("");


    const filterCity = (cities, word) => {
        console.log("word"+word)

        if(word===""){ 
            return countries
        }
        const tempArray = [];
        map(cities, (element) => {
            if (element.city.indexOf(word) !== -1 || element.country.indexOf(word) !== -1) {
                tempArray.push(element);
            }
        })
       return tempArray;
    }

    useEffect(() => {
        const getCountries = async () => {
            const response = await axios.get(
                "https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv"
            );
    
            const data = await response.data;
            const parsedData = Papa.parse(data, {
                header: true,
            });
            setCountries(parsedData.data);
            setShowCollection(parsedData.data)
        }
        getCountries();
    }, []);
useEffect(() => {setShowCollection(filterCity(countries,word))},[word])


    return (
        <>
            <Search setWord={setWord}/>
            <FixedSizeList
                height={1000}
                width="100%"
                itemSize={300}
                itemCount={showCollection.length}
            >
                {Row}
            </FixedSizeList>
        </>
    );
}

export default App;
