import React, { useState } from 'react'
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faCar, faHotel, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom';

const Header = ({type}) => {

    const [openDate, setOpenDate] = useState(false); // state to open the close the calender 
    const navigate = useNavigate();

    // state to select the date the calender 
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    // state for selecting the number of person and the room number
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const [destination, setDestination] = useState(""); // to store destination details from serach bar in a state form

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name] : operation === "inc" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const handleSearch = () => {
        navigate("/hotels", { state: {destination, date, options}}); // sending the state info to hotles page
    }


  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

            <div className="headerList">
                <div className="headerListItems active">
                    <FontAwesomeIcon icon={faHotel} />
                    <span>Stays</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attraction</span>
                </div>
                <div className="headerListItems">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport Taxis</span>
                </div>
            </div>
            { type !== "list" && 
            <> 
                <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
                <p className="headerDec">
                    Get reqwarded for your travels unlocking isatant savings of 10% or more with
                    a free Hotel Moment account.
                </p>
                <button className="headerButton">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faHotel} className="headerIcon"/>
                        <input type="text" 
                            placeholder="Where are you going?" 
                            className="headerSearchInput" 
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                        <span onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText">
                            {`${format(date[0].startDate, "MM/dd/yyyy")}`}
                            -
                            {`${format(date[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                            minDate={new Date()}
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                        <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">
                            {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                        </span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=> handleOption("adult", "dec")}>-</button>
                                    <span className="optionCounterNumber"> {options.adult} </span>
                                    <button className="optionCounterButton" onClick={()=> handleOption("adult", "inc")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=> handleOption("children", "dec")}>-</button>
                                    <span className="optionCounterNumber"> {options.children} </span>
                                    <button className="optionCounterButton" onClick={()=> handleOption("children", "inc")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                    <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=> handleOption("room", "dec")}>-</button>
                                    <span className="optionCounterNumber"> {options.room} </span>
                                    <button className="optionCounterButton" onClick={()=> handleOption("room", "inc")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerButton" onClick={ handleSearch} >Search</button>
                    </div>

                </div>
            </>}
        </div>
    </div>
  )
}

export default Header