import React from 'react'
import { Grid } from 'semantic-ui-react'

const HomeExplanation = () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <div className={'text-group'}>
              <h1 className={'text-group-name text-group-name-main'}>The Nomination Planner</h1>
              <div className={'text-group-items'}>
                <div>We, the osu!catch beatmap nominators like to plan and manage all our icons as a team. We do this so
                  everyone knows which mapsets are being worked on, which ones need help from a 2nd BN and which ones
                  are currently qualified.
                </div>
                <br/>
                <div>
                  The nomination planner was first being maintained in a spread sheet (which can be found at <a
                    href={'https://docs.google.com/spreadsheets/d/e/2PACX-1vTo9Mjlupg-0sA7ITTRRLt9fFFObLkFv21-hgXOBWAxw4k1P_empSrwD2blccmyvQoEeqjVcZziNt6V/pubhtml'}>here</a>).
                  This website basically replaces the old spreadsheet and adds a lot of new features to the table such
                  as:
                </div>
                <ul>
                  <li>Adding a new beatmaps and users to the planner with only providing an osu! links</li>
                  <li>Keeping track of all stages of a beatmap in the ranked process</li>
                </ul>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <div className={'text-group'}>
              <div className={'text-group-name'}>Why did we move the planner to a website?</div>
              <div className={'text-group-items'}>
                <div>The maintainability of the spreadsheet became a hassle, this was especially a problem since you had
                  to move the beatmap in multiple stages of the nomination to different tab in the spreadsheet.
                </div>
                <br/>
                <div>Nobody wanted to invest their time into updating the sheet, because of this we ended most of the
                  time with a lot of ranked beatmaps being on the tab of icons in progress.
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={8}>
            <div className={'text-group'}>
              <div className={'text-group-name'}>What can I do on this website?</div>
              <ul className={'text-group-items'}>
                <li>
                  <b>What can you do as an osu!catch nominator?</b>
                  <br/>
                  You can add, edit and delete everything on the beatmap pages, you can think about:
                  <ul>
                    <li>Importing a new set via the osu api</li>
                    <li>Changing the nominator of a set with ease</li>
                    <li>Marking a nominator on a set as 'has nominated'</li>
                    <li>Keeping track of all the events that happened on the set</li>
                    <li>Much more...</li>
                  </ul>
                </li>
                <li>
                  <b>What can you do as a nominator from a different mode?</b>
                  <br/>
                  Currently the same as a guest, we might support all modes in the future if there is need for it.
                </li>
                <li>
                  <b>What can you do as a guest?</b>
                  <br/>
                  You can view all the icons in progress, see all ranked mapsets, view the current graved sets and have
                  access to free text searching on the beatmap and user filters.
                </li>
              </ul>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={'text-group'}>
              <div className={'text-group-name'}>Who is hosting the nomination planner?</div>
              <div className={'text-group-items'}>
                <div>
                  This planner is hosted by <a href={'https://osu.ppy.sh/users/2369776'}>Greaper</a>. If you encounter
                  any problems, have a feature request or want to give feedback then don't hesitate to contact him via
                  osu! or Discord.
                </div>
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <div className={'text-group'}>
              <div className={'text-group-name'}>How can I trust this site?</div>
              <div className={'text-group-items'}>
                <div><b>Everything is open source!</b> The <a
                  href={'https://github.com/Darius-Wattimena/bn-planner-frontend'}>front-end</a> and <a
                  href={'https://github.com/Darius-Wattimena/bnplanner'}>back-end</a> can be found on GitHub.
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>

        </Grid.Row>
      </Grid>
    </div>
  )
}

export default HomeExplanation
