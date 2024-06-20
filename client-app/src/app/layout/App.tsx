import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../home/HomePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import { LoadingComponent } from './LoadingComponent';


function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore.token, commonStore.appLoaded])


  if (!commonStore.appLoaded) return <LoadingComponent content='loading ..' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {
        location.pathname === '/' ? <HomePage /> :
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Outlet />
            </Container>
          </>
      }
    </>
  )
}

export default observer(App);