import {useUser} from '../../Components/UserContext/UserContext';
import { Link } from 'react-router-dom';
import "../../common.css"
import { Button } from "react-bootstrap";
import "./HomePage.css"

const HomePage = () => {
    const {isLoggedIn } = useUser();
    // useEffect(() => {
    //     fetch('https://localhost:7028/api/users')
    //         .then(response => response.json())
    //         .then(res => console.log(res))
    // },[])
  return (
    <div className=" bg-image bg-home div-home " >
        <section className="py-5 text-center container">
              <div className="row py-lg-5" >
              <div className="dot p-1"><span className="live-feed strokeme p-5">Live feed</span></div>
              
                  {isLoggedIn === false ? (
                    <div className="col-lg-6 col-md-8 mx-auto bg-white">
                        <h1 className="fw-light">Sign In</h1>
                        <p className="lead text-body-secondary">
                            You are about to enter the fantastical realm of this
                            <br />
                            'GREAT' website!
                        </p>
                          <p>
                              <Button className='btn btn-primary nobr p-2 '><Link to="/User/SignIn" className='text-white nobr'>Sign-In</Link></Button>
                                <b className='p-2'/>
                              <Button className='btn btn-warning text-black nobr p-2' href="mailto:adminOfSeriosInc@autovade.com" >Registration</Button>
                        </p>
                    </div>
                ) : (
                    // You can add content for logged-in users here
                    <div>
                        {/* Content for logged-in users */}
                    </div>
                )}
            </div>
        </section>
    </div>
  )
}

export default HomePage