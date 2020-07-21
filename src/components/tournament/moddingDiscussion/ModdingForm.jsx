import {Button, Form} from "semantic-ui-react";
import React, {useState} from "react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const ModdingForm = ({mapId, userId, query, cookies}) => {
  const [formValues, setFormValues] = useState({
    _id: "",
    moddingMapId: mapId,
    authorOsuId: userId,
    osuTimestamp: "",
    content: "",
    resolved: false
  })

  const {mutate} = useMutation(Api.addModdingComment)
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        _id: "",
        moddingMapId: mapId,
        authorOsuId: userId,
        osuTimestamp: "",
        content: "",
        resolved: false
      })
      query()
    }
  }

  return (
    <Form reply>
      <Form.TextArea />
      <Button content='Add Discussion' labelPosition='left' icon='edit' primary />
    </Form>
  )
}

export default ModdingForm