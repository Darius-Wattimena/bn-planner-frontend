import React, {useEffect} from "react"
import {useCookies} from "react-cookie"
import {useHistory} from "react-router-dom"
import {ENV} from "../../Settings"
import {Dimmer, Loader} from "semantic-ui-react"

const queryString = require('query-string')

const Login = (props) => {
  let history = useHistory()
  const [cookies, setCookie] = useCookies(['bnplanner_osu_token'])

  const code = new URLSearchParams(props.location.search).get("code")

  if (new URLSearchParams(props.location.search).has("error")) {
    history.push("/")
  }

  useEffect(() => {
    const requestOptions = {
      method: 'post',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: queryString.stringify({
        grant_type: "authorization_code",
        client_id: ENV.osu.id,
        client_secret: ENV.osu.secret,
        redirect_uri: ENV.osu.redirect,
        code: code
      })
    }

    let osuLoginTokenUrl = ENV.proxy + "https://osu.ppy.sh/oauth/token"

    fetch(osuLoginTokenUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        setCookie("bnplanner_osu_access_token", data.access_token, {maxAge: data.expires_in})
        history.push("/")
      })
  }, [])

  return (
    <Dimmer active>
      <Loader indeterminate className={"header-text"}>Preparing Nomination Planner</Loader>
    </Dimmer>
  )
}

export default Login