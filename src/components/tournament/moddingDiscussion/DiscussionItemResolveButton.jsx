import { Button, Icon } from 'semantic-ui-react'
import React from 'react'
import { useMutation } from 'react-fetching-library'
import Api from '../../../resources/Api'
import { useCookies } from 'react-cookie'

const DiscussionItemResolveButton = ({ resolved, commentId, query, userId }) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const { mutate } = useMutation(Api.resolveModdingComment)

  const handleSubmit = async (value) => {
    const { error: mutateError } = await mutate(commentId, value, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
    }
  }

  if (resolved) {
    return <Button color={'red'} onClick={() => handleSubmit({ status: false })}><Icon name={'close'}/>Unresolve</Button>
  } else {
    return <Button color={'blue'} onClick={() => handleSubmit({ status: true })}><Icon name={'check'}/>Resolve</Button>
  }
}

export default DiscussionItemResolveButton
