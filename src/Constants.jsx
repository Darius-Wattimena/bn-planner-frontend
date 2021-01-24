export const BEATMAP_STATUS = {
  Qualified: {
    id: 1,
    name: "Qualified",
    explanation: "Beatmaps which are qualified on osu.",
    className: "beatmap-status-qualified"
  },
  Bubbled: {
    id: 2,
    name: "Bubbled",
    explanation: "Beatmaps which are bubbled on osu.",
    className: "beatmap-status-bubbed"
  },
  Pending: {
    id: 5,
    name: "Pending",
    explanation: "Beatmaps which are being worked on by the nominators.",
    className: "beatmap-status-pending"
  },
  Disqualified: {
    id: 3,
    name: "Disqualified",
    explanation: "Beatmaps where the nomination is disqualified on osu.",
    className: "beatmap-status-dqed"
  },
  Popped: {
    id: 4,
    name: "Popped",
    explanation: "Beatmaps where the nomination is popped on osu.",
    className: "beatmap-status-popped"
  },
  Ranked: {
    id: 6,
    name: "Ranked",
    explanation: "Beatmaps which are ranked on osu.",
    className: "beatmap-status-ranked"
  },
  Graved: {
    id: 7,
    name: "Graved",
    explanation: "Beatmaps which are not being worked on by the mapper/nominators.",
    className: "beatmap-status-graved"
  },
  Unfinished: {
    id: 8,
    name: "Unfinished",
    explanation: "Beatmaps which are still work in progress.",
    className: "beatmap-status-unfinished"
  }
}

export const USER_ROLES = {
  BeatmapNominator: {
    id: "BN",
    name: "Full",
    full: "Full",
    detailed: "Beatmap Nominator",
    explanation: "A full beatmap nominator capable of nominating catch.",
    className: "user-role-bn",
    cellColor: "#7249A5"
  },
  ProbationBeatmapNominator: {
    id: "PBN",
    name: "Probation",
    full: "Probation",
    detailed: "Probation Beatmap Nominator",
    explanation: "A probation beatmap nominator capable of nominating catch.",
    className: "user-role-pbn",
    cellColor: "#995BA5"
  },
  NominationAssessmentTeam: {
    id: "NAT",
    name: "NAT",
    full: "NAT",
    detailed: "Nomination Assessment Team",
    explanation: "A member of the nomination assessment team which main focus is catch.",
    className: "user-role-nat",
    cellColor: "#A53D3C"
  },
  RetiredCatch: {
    id: "CA",
    name: "Retired",
    full: "Retired",
    detailed: "Retired Nominator",
    explanation: "A catch nominator who retired.",
    className: "user-role-rc",
    cellColor: "#696969"
  },
  Observer: {
    id: "OBS",
    name: "Other",
    full: "Other",
    detailed: "Other",
    explanation: "A nominator who is capable of nominating osu/taiko/mania.",
    className: "user-role-observer"
  },
  Guest: {
    id: "GST",
    name: "Guest",
    full: "Guest",
    detailed: "Guest",
    explanation: "Site visitors who ever logged in.",
    className: "user-role-observer"
  }
}