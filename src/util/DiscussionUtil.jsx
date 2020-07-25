import React from "react"

// matches on '00:00:000' or '00:00:000 (1)' or '00:00:000 (1,2)'
export const timestampRegex = /(\d\d:\d\d:\d\d\d)/
export const timestampWithComboRegex = /(\d\d:\d\d:\d\d\d(?: \((?:\d)+(?:,\d)*\))?)/

export function formatOsuLinks(text) {
  let parts = text.split(timestampWithComboRegex);
  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <a key={i} className={'beatmap-disussion-osulink'} href={'osu://edit/' + parts[i]}>{parts[i]}</a>;
  }
  return <div>{parts}</div>;
}