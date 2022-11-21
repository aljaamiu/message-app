import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { getUsers } from '../routes/UserAction';

const ProtectedRoute = () => {
  // const { user } = useSelector((state) => state.user.user)
  const user = useSelector((state) => state.user.user);
  // const dispatch = useDispatch();

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='unauthorized'>
        <h1>Unauthorized :</h1>
        <span>
          <NavLink to='/login'><h3>Login</h3></NavLink> for access
        </span>
      </div>
    )
  }

  // dispatch(getUsers());

  return <Outlet />
}

export default ProtectedRoute
