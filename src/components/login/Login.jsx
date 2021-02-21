import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useMutation } from 'react-fetching-library'
import Api from '../../resources/Api'
import { pushNotification } from '../../util/NotificationUtil'

const Login = (props) => {
  const history = useHistory()
  const { mutate } = useMutation(Api.loginWithToken)
  const [setCookie] = useCookies(['bnplanner_osu_token'])

  const code = new URLSearchParams(props.location.search).get('code')
  const state = new URLSearchParams(props.location.search).get('state')

  const handleSubmit = async (code) => {
    const { payload } = await mutate(code)
    if (payload === '') {
      pushNotification('Login Error', 'Could not login, please try again later or contact Greaper if this keeps occurring', 'danger')
    } else {
      const data = JSON.parse(payload)

      setCookie('bnplanner_osu_access_token', data.access_token, { maxAge: data.expires_in })
    }
  }

  if (new URLSearchParams(props.location.search).has('error')) {
    history.push(state)
  }

  useEffect(() => {
    handleSubmit(code).then(() => {
      history.push(state)
    })
  }, [])

  return (
    <Dimmer active>
      <Loader indeterminate className={'header-text'}>Preparing Nomination Planner</Loader>
    </Dimmer>
  )
}

export default Login
