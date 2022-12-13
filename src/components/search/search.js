import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        if(inputValue.length > 3) {
            return fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
            geoApiOptions)
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value:    `${city.latitude} ${city.longitude}`,
                            label:  `${city.name}, ${city.country}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
        } else {
            return;
        }
    }

    const handleOnchange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city (results apear after 5th character)"
            debounceTimeout={800}
            value={search}
            onChange={handleOnchange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;


