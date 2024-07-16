import { useDispatch, useSelector } from "react-redux"
import { AuthComp } from "../../helpers/AuthComp"
import { DashboardComp } from "../../helpers/DashboardComp"
import { useEffect } from "react"
import { getGenres } from "../../redux/actions/genreAction"



function NavigationComp() {

  const genres = useSelector((state) => state.genreRdcr.genres)
  const dispatch = useDispatch()


  useEffect(() => {


    const fetchGenres = async() => {

      try {

        await dispatch(getGenres())
        
      } catch (error) {
        console.error("there was  a problem")
      }


    }


    fetchGenres()


  }, [dispatch])


  if(!genres) {
    return(<>
    <h6 className="text-center">data is loading</h6>
    
    </>)
  }


  if(genres.length === 0) {

    return(<>
      <h6 className="text-center">data is loading</h6>
      
      </>)



  }

    return(<>
            <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
            <div className="container">
                <a className="navbar-brand" href="/">
                    VirtualLibrary<span></span>
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsFurni">
                    <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">HOME</a>
                        </li>
                        <li className="nav-item">
                            {DashboardComp()}
                        </li>
                        <li className="nav-item">
                            {AuthComp()}
                        </li>
                        <li className="nav-item dropdown ">
                            <p className="nav-link dropdown-toggle"  id="moreBooksDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                MORE BOOKS
                            </p>
                            <ul className="dropdown-menu  here-color" aria-labelledby="moreBooksDropdown">
                            {Array.isArray(genres) ? genres.map((genre) => (
    genre.subgenres.length > 0 && genre.subgenres.map((subgenre, index) => (
        <li className="here-color" key={`${genre._id}-${index}`}>
            <a className="dropdown-item here-color" href={`/books_by_genre/${subgenre}`}>
                {subgenre}
            </a>
        </li>
    ))
)) : <li>THERE WAS A PROBLEM</li>}
                                
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>



    
    </>)
}

export default NavigationComp