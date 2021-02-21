import Api from '../../../resources/Api'
import { Button, Icon } from 'semantic-ui-react'
import React from 'react'
import DiscussionItemResponseTextArea from './DiscussionItemResponseTextArea'
import DiscussionItemResolveButton from './DiscussionItemResolveButton'

const DiscussionItemResponseBox = ({ moddingComment, isWriting, setIsWriting, userId, users, query }) => {
  if (isWriting && isWriting === true) {
    return (
      <div className={'beatmap-discussion-main-actions'}>
        <DiscussionItemResponseTextArea
          users={users}
          userId={userId}
          moddingCommentId={moddingComment._id}
          setIsWriting={setIsWriting}
          query={query}
          request={Api.addModdingResponse}
        />
      </div>
    )
  } else {
    return (
      <div className={'beatmap-discussion-main-actions'}>
        <DiscussionItemResolveButton query={query} commentId={moddingComment._id} resolved={moddingComment.resolved}
          userId={userId}/>
        <Button color={'green'} onClick={() => setIsWriting(true)}><Icon name={'reply'}/>Respond</Button>
      </div>
    )
  }
}

export default DiscussionItemResponseBox
