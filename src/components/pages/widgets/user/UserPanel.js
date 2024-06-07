function UserPanel() {
    return(<>


<div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4 animated-card">
          <div className="card text-white bg-primary">
            <div className="card-body text-center">
            <i className="icon fas fa-user"></i>

              <h5 className="card-title mt-2"><a href="/my_profile" style={{color: "white"}}> View Profile </a></h5>
              <p className="card-text">view and manage your profile</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4 animated-card">
          <div className="card text-white bg-success">
            <div className="card-body text-center">
            <i className="icon fas fa-book"></i>

              <h5 className="card-title mt-2"> <a href="/my_readings" style={{color: "white"}}>My Books </a></h5>
              <p className="card-text">read and manage your borrowed books</p>
            </div>
          </div>
        </div>
       

       


      </div>
    </div>

    
    
    </>)
}


export default UserPanel