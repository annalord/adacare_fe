import LoginForm from './components/LoginForm'
import LogoutButton from '../../misc_components/LogoutButton'
import HomeButton from '../../misc_components/HomeButton'
// import CSRFToken from '../../misc_components/CSRFToken';
import Cookies from 'js-cookie'


    const Login = (props) => {

      console.log(`in login: ${Cookies.get('csrftoken')}`)

      return (
        <div>
          {/* <CSRFToken></CSRFToken> */}
          <LoginForm />
          <LogoutButton />
          <HomeButton />

        </div>
      )
    };

    export default Login;