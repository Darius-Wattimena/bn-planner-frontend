export const BEATMAP_STATUS = {
  Qualified: {
    id: 1,
    name: "Qualified",
    className: "beatmap-status-qualified"
  },
  Bubbled: {
    id: 2,
    name: "Bubbled",
    className: "beatmap-status-bubbed"
  },
  Pending: {
    id: 5,
    name: "Pending",
    className: "beatmap-status-pending"
  },
  Disqualified: {
    id: 3,
    name: "Disqualified",
    className: "beatmap-status-dqed"
  },
  Popped: {
    id: 4,
    name: "Popped",
    className: "beatmap-status-popped"
  },
  Ranked: {
    id: 6,
    name: "Ranked",
    className: "beatmap-status-ranked"
  },
  Graved: {
    id: 7,
    name: "Graved",
    className: "beatmap-status-graved"
  }
}

export const USER_ROLES = {
  BeatmapNominator: {
    id: "BN",
    name: "Full",
    full: "Full",
    detailed: "Beatmap Nominator",
    className: "user-role-bn"
  },
  ProbationBeatmapNominator: {
    id: "PBN",
    name: "Probation",
    full: "Probation",
    detailed: "Probation Beatmap Nominator",
    className: "user-role-pbn"
  },
  NominationAssessmentTeam: {
    id: "NAT",
    name: "NAT",
    full: "NAT",
    detailed: "Nomination Assessment Team",
    className: "user-role-nat"
  },
  RetiredCatch: {
    id: "CA",
    name: "Retired",
    full: "Retired",
    detailed: "Retired Nominator",
    className: "user-role-rc"
  },
  Observer: {
    id: "OBS",
    name: "Other",
    full: "Other",
    detailed: "Other",
    className: "user-role-observer"
  },
  Guest: {
    id: "GST",
    name: "Guest",
    full: "Guest",
    detailed: "Guest",
    className: "user-role-observer"
  }
}