const Pool = require('pg').Pool
var format = require('pg-format')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'COP4710 Final Project',
  password: 'xWd86i5CwHpupa',
  port: 5432,
})

// Get theaters as JSON
const getTheaters = (request, response) => {
  pool.query('SELECT * FROM public.\"Theaters\" ORDER BY \"tid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get theaters as JSON in different sorted orders
const getSortedTheaters = (request, response) => {
  const switchVar = request.params.id
  let sql;
  switch (switchVar) {
    case '0':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tid\" ASC"
      break;
    case '1':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tid\" DESC"
      break;
    case '2':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tname\" ASC"
      break;
    case '3':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tname\" DESC"
      break;
    case '4':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"address\" ASC"
      break;
    case '5':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"address\" DESC"
      break;
    case '6':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tixprice\" ASC"
      break;
    case '7':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tixprice\" DESC"
      break;
    case '8':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"discount\" ASC"
      break;
    case '9':
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"discount\" DESC"
      break;
    default:
      sql = "SELECT * FROM public.\"Theaters\" ORDER BY \"tid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get movies as JSON
const getMovies = (request, response) => {
  pool.query('SELECT * FROM public.\"Movies\" ORDER BY \"mid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get movies as JSON in different sorted orders
const getSortedMovies = (request, response) => {
  const switchVar = request.params.id
  let sql
  switch (switchVar) {
    case '0':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"mid\" ASC"
      break;
    case '1':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"mid\" DESC"
      break;
    case '2':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"mname\" ASC"
      break;
    case '3':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"mname\" DESC"
      break;
    case '4':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"rating\" ASC"
      break;
    case '5':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"rating\" DESC"
      break;
    case '6':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"length\" ASC"
      break;
    case '7':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"length\" DESC"
      break;
    case '8':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"rlsyear\" ASC"
      break;
    case '9':
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"rlsyear\" DESC"
      break;
    default:
      sql = "SELECT * FROM public.\"Movies\" ORDER BY \"mid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get screenings as JSON
const getScreenings = (request, response) => {
  pool.query('SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"sid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get screenings as JSON in different sorted orders
const getSortedScreenings = (request, response) => {
  const switchVar = request.params.id
  let sql
  switch(switchVar) {
    case '0':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"sid\" ASC"
      break;
    case '1':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"sid\" DESC"
      break;
    case '2':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"mid\" ASC"
      break;
    case '3':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"mid\" DESC"
      break;
    case '4':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"tid\" ASC"
      break;
    case '5':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"tid\" DESC"
      break;
    case '6':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"tickets\" ASC"
      break;
    case '7':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"tickets\" DESC"
      break;
    case '8':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"date\" ASC"
      break;
    case '9':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"date\" DESC"
      break;
    case '10':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"time\" ASC"
      break;
    case '11':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"time\" DESC"
      break;
    case '12':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY th.\"address\" ASC"
      break;
    case '13':
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY th.\"address\" DESC"
      break;
    default:
      sql = "SELECT scrn.\"sid\", mv.\"mname\", th.\"tname\", th.\"address\", scrn.\"tickets\", scrn.\"date\", scrn.\"time\" FROM public.\"Screenings\" scrn, public.\"Theaters\" th, public.\"Movies\" mv WHERE scrn.\"mid\" = mv.\"mid\" AND th.\"tid\" = scrn.\"tid\" ORDER BY scrn.\"date\" ASC, scrn.\"time\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get users as JSON
const getUsers = (request, response) => {
  pool.query('SELECT * FROM public.\"Users\" ORDER BY \"uid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get users as JSON in different sorted orders
const getSortedUsers = (request, response) => {
  const switchVar = request.params.id
  let sql
  switch (switchVar) {
    case '0':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"uid\" ASC"
      break;
    case '1':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"uid\" DESC"
      break;
    case '2':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"firstname\" ASC"
      break;
    case '3':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"firstname\" DESC"
      break;
    case '4':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"lastname\" ASC"
      break;
    case '5':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"lastname\" DESC"
      break;
    case '6':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"age\" ASC"
      break;
    case '7':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"age\" DESC"
      break;
    case '8':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"email\" ASC"
      break;
    case '9':
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"email\" DESC"
      break;
    default:
      sql = "SELECT * FROM public.\"Users\" ORDER BY \"uid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get equipment as JSON
const getEquipment = (request, response) => {
  pool.query('SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get equipment as JSON in different sorted orders
const getSortedEquipment = (request, response) => {
  const switchVar = request.params.id
  let sql
  switch(switchVar) {
    case '0':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eid\" ASC"
      break;
    case '1':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eid\" DESC"
      break;
    case '2':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eqname\" ASC"
      break;
    case '3':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eqname\" DESC"
      break;
    case '4':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY th.\"tname\" ASC"
      break;
    case '5':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY th.\"tname\" DESC"
      break;
    case '6':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"cost\" ASC"
      break;
    case '7':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"cost\" DESC"
      break;
    case '8':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"quantity\" ASC"
      break;
    case '9':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"quantity\" DESC"
      break;
    case '10':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY th.\"address\" ASC"
      break;
    case '11':
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY th.\"address\" DESC"
      break;
    default:
      sql = "SELECT eq.\"eid\", eq.\"eqname\", th.\"tname\", th.\"address\", eq.\"cost\", eq.\"quantity\" FROM public.\"Equipment\" eq, public.\"Theaters\" th WHERE eq.\"ownedByTid\" = th.\"tid\" ORDER BY \"eid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get employees as JSON
const getEmployees = (request, response) => {
  pool.query('SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"empid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get employees as JSON in different sorted orders
const getSortedEmployees = (request, response) => {
  const switchVar = request.params.id
  let sql
  switch(switchVar) {
    case '0':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"empid\" ASC"
      break;
    case '1':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"empid\" DESC"
      break;
    case '2':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"firstname\" ASC"
      break;
    case '3':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"firstname\" DESC"
      break;
    case '4':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"lastname\" ASC"
      break;
    case '5':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"lastname\" DESC"
      break;
    case '6':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY th.\"tname\" ASC"
      break;
    case '7':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY th.\"tname\" DESC"
      break;
    case '8':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY th.\"address\" ASC"
      break;
    case '9':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY th.\"address\" DESC"
      break;
    case '10':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"hourlyPay\" ASC"
      break;
    case '11':
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"hourlyPay\" DESC"
      break;
    default:
      sql = "SELECT emp.\"empid\", emp.\"firstname\", emp.\"lastname\", th.\"tname\", th.\"address\", emp.\"hourlyPay\" FROM public.\"Employees\" emp, public.\"Theaters\" th WHERE emp.\"worksAtTid\" = th.\"tid\" ORDER BY \"empid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get visits as JSON
const getVisits = (request, response) => {
  pool.query('SELECT * FROM public.\"Visits\" ORDER BY \"vid\" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get visits as JSON in different sorted orders
const getSortedVisits = (request, response) => {
  const switchVar = request.params.id
  let sql = "SELECT vst.\"vid\", vst.\"date\", vst.\"time\", usr.\"firstname\", usr.\"lastname\", usr.\"email\", th.\"tname\", th.\"address\" FROM public.\"Visits\" vst, public.\"Theaters\" th, public.\"Users\" usr WHERE vst.\"tid\" = th.\"tid\" AND vst.\"uid\" = usr.\"uid\" ORDER BY "
  switch (switchVar) {
    case '0':
      sql = sql + "\"vid\" ASC"
      break;
    case '1':
      sql = sql + "\"vid\" DESC"
      break;
    case '2':
      sql = sql + "\"date\" ASC"
      break;
    case '3':
      sql = sql + "\"date\" DESC"
      break;
    case '4':
      sql = sql + "\"time\" ASC"
      break;
    case '5':
      sql = sql + "\"time\" DESC"
      break;
    case '6':
      sql = sql + "usr.\"firstname\" ASC"
      break;
    case '7':
      sql = sql + "usr.\"firstname\" DESC"
      break;
    case '8':
      sql = sql + "usr.\"lastname\" ASC"
      break;
    case '9':
      sql = sql + "usr.\"lastname\"DESC"
      break;
    case '10':
      sql = sql + "usr.\"email\" ASC"
      break;
    case '11':
      sql = sql + "usr.\"email\" DESC"
      break;
    case '12':
      sql = sql + "th.\"tname\" ASC"
      break;
    case '13':
      sql = sql + "th.\"tname\" DESC"
      break;
    case '14':
      sql = sql + "th.\"address\" ASC"
      break;
    case '15':
      sql = sql + "th.\"address\" DESC"
      break;
    default:
      sql = sql + "\"vid\" ASC"
  }
  pool.query(sql, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Delete theater
const delTheater = (request, response) => {
  const { tid } = request.body
  pool.query('SELECT public.\"delTheater\"($1)', [tid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted theater')
  })
}

// Delete movie
const delMovie = (request, response) => {
  const { mid } = request.body
  pool.query('SELECT public.\"delMovie\"($1)', [mid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted movie')
  })
}

// Delete screening
const delScreening = (request, response) => {
  const { sid } = request.body
  pool.query('DELETE FROM public.\"Screenings\" WHERE \"sid\" = $1', [sid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted screening')
  })
}

// Delete user
const delUser = (request, response) => {
  const { uid } = request.body
  pool.query('SELECT public.\"delUser\"($1)', [uid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted user')
  })
}

// Delete employee
const delEmployee = (request, response) => {
  const { empid } = request.body
  pool.query('DELETE FROM public.\"Employees\" WHERE \"empid\" = $1', [empid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted employee')
  })
}

// Delete equipment
const delEquipment = (request, response) => {
  const { eid } = request.body
  pool.query('DELETE FROM public.\"Equipment\" WHERE \"eid\" = $1', [eid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted equipment')
  })
}

// Delete visit
const delVisit = (request, response) => {
  const { vid } = request.body
  pool.query('DELETE FROM public.\"Visits\" WHERE \"vid\" = $1', [vid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Deleted visit')
  })
}

const addTheater = (request, response) => {
  const { name, address, ticketPrice, discount } = request.body
  pool.query('SELECT public.\"newTheater\"($1, $2, $3, $4)', [name, address, ticketPrice, discount], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added Theater')
  })
}

const addMovie = (request, response) => {
  const { name, rating, length, releaseYear } = request.body
  pool.query('SELECT public.\"newMovie\"($1, $2, $3, $4)', [name, rating, length, releaseYear], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added movie')
  })
}

const addScreening = (request, response) => {
  const { mid, tid, tix, date, time } = request.body
  pool.query('SELECT public.\"newScreening\"($1, $2, $3, $4, $5)', [mid, tid, tix, date, time], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added screening')
  })
}

const addUser = (request, response) => {
  const { firstname, lastname, age, email } = request.body
  pool.query('SELECT public.\"newUser\"($1, $2, $3, $4)', [firstname, lastname, age, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added user')
  })
}

const addEquipment = (request, response) => {
  const { name, tid, price, quantity } = request.body
  pool.query('SELECT public.\"newEquipment\"($1, $2, $3, $4)', [name, tid, price, quantity], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added equipment')
  })
}

const addEmployee = (request, response) => {
  const { firstname, lastname, wage, tid } = request.body
  pool.query('SELECT public.\"newEmployee\"($1, $2, $3, $4)', [tid, wage, firstname, lastname], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added employee')
  })
}

const addVisit = (request, response) => {
  const { date, time, uid, tid } = request.body
  pool.query('SELECT public.\"newVisit\"($1, $2, $3, $4)', [date, time, uid, tid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Added visit')
  })
}

module.exports = {
  getTheaters,
  getMovies,
  getScreenings,
  getUsers,
  getEquipment,
  getEmployees,
  getVisits,
  getSortedTheaters,
  getSortedMovies,
  getSortedScreenings,
  getSortedUsers,
  getSortedEquipment,
  getSortedEmployees,
  getSortedVisits,
  delTheater,
  delMovie,
  delScreening,
  delUser,
  delEmployee,
  delEquipment,
  delVisit,
  addTheater,
  addMovie,
  addScreening,
  addUser,
  addEquipment,
  addEmployee,
  addVisit,
}