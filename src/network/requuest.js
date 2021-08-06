import fetch from "./manager"
import {GET,POST,PUT,DELETE} from "./requestMethods"

export function LoginRequest(adminName){
    return fetch({
        url:"admin/login/"+adminName+'',
        method:GET,
    })
}

export function RegisterQequest(data){
  return fetch({
    url:"admin/register",
    method:POST,
    data:data
})
}

export function GetUserList(page,size){
  return fetch({
    url:"user/findAll/"+page+"/"+size,
    method:GET,
})
}

export function GetUserByAccountNumber(userAccountNumber){
  return fetch({
    url:"user/findByUserAccountNumber/"+userAccountNumber+"",
    method:GET,
})
}

export function GetUsersById(userId){
  return fetch({
    url:"user/findUsersByUserId/"+userId+"",
    method:GET,
})
}

export function GetUsersByAccountNumber(userAccountNumber){
  return fetch({
    url:"user/findUsersByUserAccountNumber/"+userAccountNumber+"",
    method:GET,
  }) 
}

export function GetUsersByName(userName){
  return fetch({
    url:"user/findUsersByUserName/"+userName+"",
    method:GET,
  })   
}
export function GetUsersByPhone(userPhone){
  return fetch({
    url:"user/findUsersByUserPhone/"+userPhone+"",
    method:GET,
  })
}
export function GetDeleteUserList(page,size){
  return fetch({
    url:"user/showDeleteAble/"+page+"/"+size,
    method:GET,
})
}

export function GetDeleteUser(userId){
  return fetch({
    url:"user/findUserDeletableByUserId/"+userId+'',
    method:GET,
})
}

export function DeleteUser(userAccountNumber){
  return fetch({
    url:"user/deleteUser/"+userAccountNumber+"",
    method:DELETE,
})
}

export function UpdateUser(data){
  return fetch({
    url:"user/updateUser",
    method:PUT,
    data:data
})
}

export function AddUser(data){
  return fetch({
    url:"user/addUser",
    method:POST,
    data:data
})
}

export function GetFlightList(page,size){
  return fetch({
    url:"flight/showAll/"+page+'/'+size+'',
    method:GET,
})
}

export function GetTravleFlightList(page,size){
  return fetch({
    url:"flight/showAllNotTraveled/"+page+'/'+size+'',
    method:GET,
})
}

export function GetFlightById(flightId){
  return fetch({
    url:"flight/findFlightById/"+flightId+'',
    method:GET,
  })  
}

export function UpdateFlight(data){
  return fetch({
    url:"flight/updateFlight",
    method:PUT,
    data:data
  })  
}

export function GetAllCities(){
  return fetch({
    url:"/flight/getAllCities",
    method:GET,
  }) 
}

export function GetFlightByPlace(data){
  return fetch({
    url:"/flight/findFlightsByPlaceAndDate",
    method:POST,
    data:data
  }) 
}

export function AddFlight(data){
  return fetch({
    url:"/flight/addFlight",
    method:POST,
    data:data
  }) 
}

export function GetBillList(page,size){
  return fetch({
    url:"bill/showAllBillsByPageF/"+page+'/'+size+'',
    method:GET,
  })  
}
export function GetBillById(billId){
  return fetch({
    url:"bill/findBillByBillId/"+billId+'',
    method:GET,
  })
}

export function GetBillByDate(billDate){
  return fetch({
    url:"bill/findBillsByDate/"+billDate+'',
    method:GET,
  })
}

export function GetBillByUserName(userName){
  return fetch({
    url:"bill/findBillsByUserName/"+userName+'',
    method:GET,
  })
}

export function DeleteBillByBillId(billId){
  return fetch({
    url:"bill/deleteBillByBillId/"+billId+'',
    method:DELETE,
  })
}