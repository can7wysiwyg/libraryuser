export const logoutUser = () => {
    localStorage.removeItem("usertoken")
    


    
    window.location.href="/"
}