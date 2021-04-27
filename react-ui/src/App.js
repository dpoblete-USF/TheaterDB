import React, {Component} from "react";
import axios from "axios";
import './App.css';

const api = axios.create({
  baseURL: 'http://localhost:9000'
})

// Keep track of what table to display
let mode = 0
// Keep track of sorting mode
// 0 by default for all except scrnSM which is 8
let thSM = 0
let mvSM = 0
let empSM = 0
let eqSM = 0
let scrnSM = 0
let uSM = 0
let vSM = 0

class App extends Component {
  state = {
    items: []
  }

  newThItem = {
    newTName: "",
    newTAddr: "",
    newTPrice: 0.00,
    newTDiscount: 0.00
  }

  newMvItem = {
    newMName: "",
    newMRating: "",
    newMLength: "",
    newMRlsYear: ""
  }

  newScrnItem = {
    newSMID: 0,
    newSTID: 0,
    newSTIX: 0,
    newSDate: "",
    newSTime: ""
  }

  newUserItem = {
    newFName: "",
    newLName: "",
    newAge: 0,
    newEmail: ""
  }

  newEmpItem = {
    newEFName: "",
    newELName: "",
    newEWage: 0.00,
    newETID: 0
  }

  newEquipItem = {
    newEQName: "",
    newEQTID: 0,
    newEQPrice: 0.00,
    newEQQnt: 0
  }
  
  newVisitItem = {
    newVDate: "",
    newVTime: "",
    newVUID: 0,
    newVTID: 0
  }

  constructor() {
    super();
    this.getSortedTheaters(thSM);
  }
  
  getSortedTheaters = async (smode) => {
    mode = 0
    thSM = smode
    let data = await api.get(`/theaters/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delTh = async (id) => {
    let res = await api.put(`/delTh`, { tid: `${id}` })
    this.getSortedTheaters(thSM)
    console.log(res)
  }

  getSortedMovies = async (smode) => {
    mode = 1
    mvSM = smode
    let data = await api.get(`/movies/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delMv = async (id) => {
    let res = await api.put('/delMv', { mid: `${id}` })
    this.getSortedMovies(mvSM)
    console.log(res)
  }

  getSortedScreenings = async (smode) => {
    mode = 2
    scrnSM = smode
    let data = await api.get(`/screenings/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delScrn = async (id) => {
    let res = await api.put('/delScrn', { sid: `${id}` })
    this.getSortedScreenings(scrnSM)
    console.log(res)
  }

  getSortedUsers = async (smode) => {
    mode = 3
    uSM = smode
    let data = await api.get(`/users/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delUsr = async (id) => {
    let res = await api.put('/delUser', { uid: `${id}` })
    this.getSortedUsers(uSM)
    console.log(res)
  }

  getSortedEmployees = async (smode) => {
    mode = 4
    empSM = smode
    let data = await api.get(`/employees/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delEmp = async (id) => {
    let res = await api.put('/delEmp', { empid: `${id}` })
    this.getSortedEmployees(empSM)
    console.log(res)
  }

  getSortedEquipment = async (smode) => {
    mode = 5
    eqSM = smode
    let data = await api.get(`/equipment/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delEq = async (id) => {
    let res = await api.put('/delEq', { eid: `${id}` })
    this.getSortedEquipment(eqSM)
    console.log(res)
  }

  getSortedVisits = async (smode) => {
    mode = 6
    vSM = smode
    let data = await api.get(`/visits/${smode}`).then(({ data }) => data)
    this.setState({items: data})
  }

  delVisit = async (id) => {
    let res = await api.put('/delVisit', { vid: `${id}` })
    this.getSortedVisits(vSM)
    console.log(res)
  }

  addNewTh = async (nme, addr, prc, dsc) => {
    if (nme === "" || addr === "" || prc === "" || dsc === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Theater form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addTh', { name: `${nme}`, address: `${addr}`, ticketPrice: `${prc}`, discount: `${dsc}` })
      console.log(res)
      this.getSortedTheaters(thSM)
    }
  }

  addNewMv = async (nme, rt, ln, rls) => {
    if (nme === "" || rt === "" || ln === "" || rls === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Movie form fields must be filled before submitting')
    }
    else {
      let fixedln = ln + ":00"
      let res = await api.put('/addMv', { name: `${nme}`, rating: `${rt}`, length: `${fixedln}`, releaseYear: `${rls}`})
      console.log(res)
      this.getSortedMovies(mvSM)
    }
  }

  addNewScrn = async (nmid, ntid, numtix, dte, tme) => {
    if (nmid === "" || ntid === "" || numtix === "" || dte === "" || tme === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Screening form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addScrn', { mid: `${nmid}`, tid: `${ntid}`, tix: `${numtix}`, date: `${dte}`, time: `${tme}` })
      console.log(res)
      this.getSortedScreenings(scrnSM)
    }
  }

  addNewUsr = async (fname, lname, ag, mail) => {
    if (fname === "" || lname === "" || ag === "" || mail === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all User form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addUser', { firstname: `${fname}`, lastname: `${lname}`, age: `${ag}`, email: `${mail}`})
      console.log(res)
      this.getSortedUsers(uSM)
    }
  }

  addNewEmp = async (fname, lname, etid, pay) => {
    if (fname === "" || lname === "" || etid === "" || pay === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Employee form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addEmp', { firstname: `${fname}`, lastname: `${lname}`, wage: `${pay}`, tid: `${etid}`})
      console.log(res)
      this.getSortedEmployees(empSM)
    }
  }

  addNewEquip = async (nme, ntid, prc, qnt) => {
    if (nme === "" || ntid === "" || prc === "" || qnt === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Equipment form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addEq', { name: `${nme}`, tid: `${ntid}`, price: `${prc}`, quantity: `${qnt}` })
      console.log(res)
      this.getSortedEquipment(eqSM)
    }
  }

  addNewVis = async (dte, tme, nuid, ntid) => {
    if (dte === "" || tme === "" || nuid === "" || ntid === "") {
      alert('Error: all form fields must be filled before submitting')
      console.log('Error: all Visit form fields must be filled before submitting')
    }
    else {
      let res = await api.put('/addVisit', { date: `${dte}`, time: `${tme}`, uid: `${nuid}`, tid: `${ntid}` })
      console.log(res)
      this.getSortedVisits(vSM)
    }
  }

  resetForm = (event) => {
    event.target.reset()
    // This resets ALL saved information on forms
    // Not sure how to fix this yet, but only causes problem in niche case
    // New Theater item
    this.newThItem.newTName = ""
    this.newThItem.newTAddr = ""
    this.newThItem.newTPrice = 0.00
    this.newThItem.newTDiscount = 0.00
    // New Movie item
    this.newMvItem.newMLength = ""
    this.newMvItem.newMName = ""
    this.newMvItem.newMRating = ""
    this.newMvItem.newRlsYear = ""
    // New Screening item
    this.newScrnItem.newSMID = 0
    this.newScrnItem.newSTID = 0
    this.newScrnItem.newSTIX = 0
    this.newScrnItem.newSDate = ""
    this.newScrnItem.newSTime = ""
    // New User item
    this.newUserItem.newFName = ""
    this.newUserItem.newLName = ""
    this.newUserItem.newAge = 0
    this.newUserItem.newEmail = ""
    // New Employee item
    this.newEmpItem.newEFName = ""
    this.newEmpItem.newELname = ""
    this.newEmpItem.newETid = 0
    this.newEmpItem.newEWage = 0.00
    // New Equipment item
    this.newEquipItem.newEQName = ""
    this.newEquipItem.newEQPrice = 0.00
    this.newEquipItem.newEQQnt = 0
    this.newEquipItem.newEQTID = 0
    // New Visit item
    this.newVisitItem.newVTime = ""
    this.newVisitItem.newVDate = ""
    this.newVisitItem.newVUID = 0
    this.newVisitItem.newVTID = 0
  }

  // Input change handlers
  tInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newThItem[name] = value
  }

  mvInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newMvItem[name] = value
  }

  scrnInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newScrnItem[name] = value
  }

  usrInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newUserItem[name] = value
  }

  empInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newEmpItem[name] = value
  }

  equipInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newEquipItem[name] = value
  }

  visitInChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.newVisitItem[name] = value
  }

  // Form submission handlers
  submitMvForm = (event) => {
    event.preventDefault()
    this.addNewMv(this.newMvItem.newMName, this.newMvItem.newMRating, this.newMvItem.newMLength, this.newMvItem.newMRlsYear)
  }

  submitThForm = (event) => {
    event.preventDefault()
    this.addNewTh(this.newThItem.newTName, this.newThItem.newTAddr, this.newThItem.newTPrice, this.newThItem.newTDiscount)
  }

  submitScrnForm = (event) => {
    event.preventDefault()
    this.addNewScrn(this.newScrnItem.newSMID, this.newScrnItem.newSTID, this.newScrnItem.newSTIX, this.newScrnItem.newSDate, this.newScrnItem.newSTime)
  }

  submitUForm = (event) => {
    event.preventDefault()
    this.addNewUsr(this.newUserItem.newFName, this.newUserItem.newLName, this.newUserItem.newAge, this.newUserItem.newEmail)
  }

  submitEmpForm = (event) => {
    event.preventDefault()
    this.addNewEmp(this.newEmpItem.newEFName, this.newEmpItem.newELName, this.newEmpItem.newETID, this.newEmpItem.newEWage)
  }

  submitEquipForm = (event) => {
    event.preventDefault()
    this.addNewEquip(this.newEquipItem.newEQName, this.newEquipItem.newEQTID, this.newEquipItem.newEQPrice, this.newEquipItem.newEQQnt)
  }

  submitVisitForm = (event) => {
    event.preventDefault()
    this.addNewVis(this.newVisitItem.newVDate, this.newVisitItem.newVTime, this.newVisitItem.newVUID, this.newVisitItem.newVTID)
  }
  
  // Rendering page
  render() {
    switch(mode) {
      case 0:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Insert New Theater</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitThForm}>
              <label>
                Name:&ensp;
                <input
                  name="newTName"
                  type="text"
                  onInput={this.tInChange}
                />
              </label>
              <label>
                &ensp;Address:&ensp;
                <input
                  name="newTAddr"
                  type="text"
                  onInput={this.tInChange}
                />
              </label>
              <br/>
              <label>
                &ensp;Ticket Price:&ensp;
                <input
                  name="newTPrice"
                  type="number"
                  min="0.00"
                  step="0.01"
                  onInput={this.tInChange}
                />
              </label>
              <label>
                &ensp;Discount:&ensp;
                <input
                  name="newTDiscount"
                  type="number"
                  min="0.00"
                  max="1.00"
                  step="0.01"
                  onInput={this.tInChange}
                />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Theater to Database" />
            </form>
            <center><h2>Theaters</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>TID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Ticket Price</th>
                    <th>Discount Factor</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(0)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(2)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(4)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(6)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(8)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(9)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.tid}>
                        <td><center>{item.tid}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>{item.tixprice}</center></td>
                        <td><center>{item.discount}</center></td>
                        <td><center>
                          <button onClick={() => {this.delTh(item.tid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
          );
      case 1:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Insert New Movie</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitMvForm}>
              <label>
                Name:&ensp;
                <input
                  name="newMName"
                  type="text"
                  onInput={this.mvInputChange} />
              </label>
              <label>
                &ensp;Rating:&ensp;
                <input
                  name="newMRating"
                  type="text"
                  onInput={this.mvInputChange} />
              </label>
              <br/>
              <label>
                Length:&ensp;
                <input
                  name="newMLength"
                  type="time"
                  onInput={this.mvInputChange} />
              </label>
              <label>
                Release Year:&ensp;
                <input
                  name="newMRlsYear"
                  type="number"
                  min="1878"
                  max="9999"
                  step="1"
                  onInput={this.mvInputChange} />
              </label>
              <p>(<strong>Note:</strong> always use AM for Length input submission unless movie is more than 12 hours long)</p>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Movie to Database" />
            </form>
            <center><h2>Movies</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>MID</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Length</th>
                    <th>Release Year</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedMovies(0)}}>↑</button>
                        <button onClick={() => {this.getSortedMovies(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedMovies(2)}}>↑</button>
                        <button onClick={() => {this.getSortedMovies(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedMovies(4)}}>↑</button>
                        <button onClick={() => {this.getSortedMovies(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedMovies(6)}}>↑</button>
                        <button onClick={() => {this.getSortedMovies(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedMovies(8)}}>↑</button>
                        <button onClick={() => {this.getSortedMovies(9)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.mid}>
                        <td><center>{item.mid}</center></td>
                        <td><center>{item.mname}</center></td>
                        <td><center>{item.rating}</center></td>
                        <td><center>{item.length}</center></td>
                        <td><center>{item.rlsyear}</center></td>
                        <td><center>
                          <button onClick={() => {this.delMv(item.mid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      case 2:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Add New Screening</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitScrnForm}>
              <label>
                Movie ID #:&ensp;
                <input
                 name="newSMID"
                 type="number"
                 min="0"
                 step="1"
                 onInput={this.scrnInChange} />
              </label>
              <label>
                &ensp;Theater ID #:&ensp;
                <input
                 name="newSTID"
                 type="number"
                 min="0"
                 step="1"
                 onInput={this.scrnInChange} />
              </label>
              <label>
                &ensp;# of Tickets:&ensp;
                <input
                 name="newSTIX"
                 type="number"
                 min="0"
                 step="1"
                 onInput={this.scrnInChange} />
              </label>
              <br/>
              <label>
                Date:&ensp;
                <input
                 name="newSDate"
                 type="date"
                 onInput={this.scrnInChange} />
              </label>
              <label>
                &ensp;Time:&ensp;
                <input
                 name="newSTime"
                 type="time"
                 onInput={this.scrnInChange} />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Screening to Database" />
            </form>
            <center><h2>Screenings</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>SID</th>
                    <th>Movie Name</th>
                    <th>Theater Name</th>
                    <th>Theater Address</th>
                    <th># of Tickets</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(0)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(2)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(4)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(12)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(13)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(6)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(8)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(9)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedScreenings(10)}}>↑</button>
                        <button onClick={() => {this.getSortedScreenings(11)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.sid}>
                        <td><center>{item.sid}</center></td>
                        <td><center>{item.mname}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>{item.tickets}</center></td>
                        <td><center>{item.date.substring(0, item.date.indexOf("T"))}</center></td>
                        <td><center>{item.time}</center></td>
                        <td><center>
                          <button onClick={() => {this.delScrn(item.sid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      case 3:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Add New User</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitUForm}>
              <label>
                First Name:&ensp;
                <input
                name="newFName"
                type="text"
                onInput={this.usrInChange} />
              </label>
              <label>
                &ensp;Last Name:&ensp;
                <input
                name="newLName"
                type="text"
                onInput={this.usrInChange} />
              </label>
              <br/>
              <label>
                Age:&ensp;
                <input
                name="newAge"
                type="number"
                min="0"
                step="1"
                onInput={this.usrInChange} />
              </label>
              <label>
                &ensp;Email:&ensp;
                <input
                name="newEmail"
                type="text"
                onInput={this.usrInChange} />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New User to Database" />
            </form>
            <center><h2>Users</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>UID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedUsers(0)}}>↑</button>
                        <button onClick={() => {this.getSortedUsers(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedUsers(2)}}>↑</button>
                        <button onClick={() => {this.getSortedUsers(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedUsers(4)}}>↑</button>
                        <button onClick={() => {this.getSortedUsers(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedUsers(6)}}>↑</button>
                        <button onClick={() => {this.getSortedUsers(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedUsers(8)}}>↑</button>
                        <button onClick={() => {this.getSortedUsers(9)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.uid}>
                        <td><center>{item.uid}</center></td>
                        <td><center>{item.firstname}</center></td>
                        <td><center>{item.lastname}</center></td>
                        <td><center>{item.age}</center></td>
                        <td><center>{item.email}</center></td>
                        <td><center>
                          <button onClick={() => {this.delUsr(item.uid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      case 4:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Add New Employee</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitEmpForm}>
              <label>
                First Name:&ensp;
                <input
                name="newEFName"
                type="text"
                onInput={this.empInChange} />
              </label>
              <label>
                &ensp;Last Name:&ensp;
                <input
                name="newELName"
                type="text"
                onInput={this.empInChange} />
              </label>
              <br/>
              <label>
                Employer Theater ID #:&ensp;
                <input
                name="newETID"
                type="number"
                min="0"
                step="1"
                onInput={this.empInChange} />
              </label>
              <label>
                &ensp;Hourly Wage:&ensp;
                <input
                name="newEWage"
                type="number"
                min="0.00"
                step="0.01"
                onInput={this.empInChange} />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Employee to Database" />
            </form>
            <center><h2>Employees</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Theater Name</th>
                    <th>Theater Address</th>
                    <th>Hourly Wage</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(0)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(2)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(4)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(6)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(8)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(9)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEmployees(10)}}>↑</button>
                        <button onClick={() => {this.getSortedEmployees(11)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.empid}>
                        <td><center>{item.empid}</center></td>
                        <td><center>{item.firstname}</center></td>
                        <td><center>{item.lastname}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>{item.hourlyPay}</center></td>
                        <td><center>
                          <button onClick={() => {this.delEmp(item.empid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      case 5:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Add New Equipment</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitEquipForm}>
              <label>
                Equipment Name:&ensp;
                <input
                name="newEQName"
                type="text"
                onInput={this.equipInChange} />
              </label>
              <label>
                &ensp;Theater Owner ID #:&ensp;
                <input
                name="newEQTID"
                type="number"
                min="0"
                step="1"
                onInput={this.equipInChange} />
              </label>
              <br/>
              <label>
                Cost:&ensp;
                <input
                name="newEQPrice"
                type="number"
                min="0.00"
                step="0.01"
                onInput={this.equipInChange} />
              </label>
              <label>
                &ensp;Quantity:&ensp;
                <input
                name="newEQQnt"
                type="number"
                min="0"
                step="1"
                precision="2"
                onInput={this.equipInChange} />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Equipment to Database" />
            </form>
            <center><h2>Equipment</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>Equipment ID</th>
                    <th>Name</th>
                    <th>Theater Owner Name</th>
                    <th>Theater Owner Address</th>
                    <th>Cost</th>
                    <th>Quantity At Theater</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(0)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(2)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(4)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(10)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(11)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(6)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedEquipment(8)}}>↑</button>
                        <button onClick={() => {this.getSortedEquipment(9)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.eid}>
                        <td><center>{item.eid}</center></td>
                        <td><center>{item.eqname}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>{item.cost}</center></td>
                        <td><center>{item.quantity}</center></td>
                        <td><center>
                          <button onClick={() => {this.delEq(item.eid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      case 6:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Add New Visit</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitVisitForm}>
              <label>
                Visit Date:&ensp;
                <input 
                name="newVDate"
                type="date"
                onInput={this.visitInChange} />
              </label>
              <label>
                &ensp;Visit Time:&ensp;
                <input
                name="newVTime"
                type="time"
                onInput={this.visitInChange} />
              </label>
              <br/>
              <label>
                Visitor's User #:&ensp;
                <input
                name="newVUID"
                type="number"
                min="0"
                step="1"
                onInput={this.visitInChange} />
              </label>
              <label>
                &ensp;ID # of Theater Visited:&ensp;
                <input
                name="newVTID"
                type="number"
                min="0"
                step="1"
                onInput={this.visitInChange} />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Visit to Database" />
            </form>
            <center><h2>Visits</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>Visit ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Theater Name</th>
                    <th>Theater Address</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(0)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(2)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(4)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(6)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(8)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(9)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(10)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(11)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(12)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(13)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedVisits(14)}}>↑</button>
                        <button onClick={() => {this.getSortedVisits(15)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.vid}>
                        <td><center>{item.vid}</center></td>
                        <td><center>{item.date.substring(0, item.date.indexOf("T"))}</center></td>
                        <td><center>{item.time}</center></td>
                        <td><center>{item.firstname}</center></td>
                        <td><center>{item.lastname}</center></td>
                        <td><center>{item.email}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>
                          <button onClick={() => {this.delVisit(item.vid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
        );
      default:
        return (
          <div className="App">
            <h1><strong>TheaterDB</strong></h1>
            <center><h2>Available Pages</h2></center>
            <p>
              <button onClick={() => {this.getSortedTheaters(thSM)}}>Theaters</button>
              <button onClick={() => {this.getSortedMovies(mvSM)}}>Movies</button>
              <button onClick={() => {this.getSortedScreenings(scrnSM)}}>Screenings</button>
              <br/>
              <button onClick={() => {this.getSortedUsers(uSM)}}>Users</button>
              <button onClick={() => {this.getSortedEmployees(empSM)}}>Employees</button>
              <button onClick={() => {this.getSortedEquipment(eqSM)}}>Equipment</button>
              <button onClick={() => {this.getSortedVisits(vSM)}}>Visits</button>
            </p>
            <center><h2>Insert New Theater</h2></center>
            <form onReset={this.resetForm} onSubmit={this.submitThForm}>
              <label>
                Name:&ensp;
                <input
                  name="newTName"
                  type="text"
                  onInput={this.tInChange}
                />
              </label>
              <label>
                &ensp;Address:&ensp;
                <input
                  name="newTAddr"
                  type="text"
                  onInput={this.tInChange}
                />
              </label>
              <br/>
              <label>
                &ensp;Ticket Price:&ensp;
                <input
                  name="newTPrice"
                  type="number"
                  min="0.00"
                  step="0.01"
                  onInput={this.tInChange}
                />
              </label>
              <label>
                &ensp;Discount:&ensp;
                <input
                  name="newTDiscount"
                  type="number"
                  min="0.00"
                  max="1.00"
                  step="0.01"
                  onInput={this.tInChange}
                />
              </label>
              <br/>
              <br/>
              <input type="reset" value="Clear Form Fields" />
              <br/>
              <input type="submit" value="Submit New Theater to Database" />
            </form>
            <center><h2>Theaters</h2></center>
            <center>
              <table width="85%" border="1px solid black" text-align="center">
                <tbody>
                  <tr bgcolor="lightgray">
                    <th>TID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Ticket Price</th>
                    <th>Discount Factor</th>
                    <th bgcolor="#ffa5a1" rowSpan="2">Delete Entry</th>
                  </tr>
                  <tr bgcolor="lightgray">
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(0)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(1)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(2)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(3)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(4)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(5)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(6)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(7)}}>↓</button>
                      </center>
                    </td>
                    <td>
                      <center>
                        <button onClick={() => {this.getSortedTheaters(8)}}>↑</button>
                        <button onClick={() => {this.getSortedTheaters(9)}}>↓</button>
                      </center>
                    </td>
                  </tr>
                  {
                    this.state.items.map(item =>
                      <tr key={item.tid}>
                        <td><center>{item.tid}</center></td>
                        <td><center>{item.tname}</center></td>
                        <td><center>{item.address}</center></td>
                        <td><center>{item.tixprice}</center></td>
                        <td><center>{item.discount}</center></td>
                        <td><center>
                          <button onClick={() => {this.delTh(item.tid)}}>X</button>
                        </center></td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </center>
          </div>
          );
    }
  }
}

export default App;
