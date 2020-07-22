import React from "react"
import reactStringReplace from "react-string-replace"

// matches on '00:00:000' or '00:00:000 (1)' or '00:00:000 (1,2)'
export const timestampRegex = /(\d\d:\d\d:\d\d\d)/

export function formatOsuLinks(text) {
  return reactStringReplace(text, timestampRegex, (match, i) => {
    return <a key={i} className={'beatmap-disussion-osulink'} href={'osu://edit/' + match}>{match}</a>
  })
}