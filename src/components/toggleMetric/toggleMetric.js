

const ToggleMetric = ({celciusChange}) => {

    const handleOnchange = (e) => {
        console.log(e.target.value)
        celciusChange(e.target.value)
    }
    return (
        
        <>  
                    <div className="toggle-unit">
                        <select className="form-control form-control-lg" onChange={handleOnchange}>
                            <option value="°F">°F</option>
                            <option value="°C">°C</option>
                        </select>
                    </div>
        </>

    )
}

export default ToggleMetric;