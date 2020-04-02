import React, {useState} from "react";
import { useResource } from 'rest-hooks';
import BeatmapResource from "../../resources/beatmap/BeatmapResource";
import {
  Icon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "semantic-ui-react";
import BeatmapByFilterResource from "../../resources/beatmap/BeatmapByFilterResource";
import BeatmapFilter from "./BeatmapFilter";

const Beatmaps = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState({
    "artist": null,
    "title": null,
    "mapper": null,
    "isPending": null,
    "isWorkInProgress": null,
    "isAwaitingResponse": null,
    "isBubbled": null,
    "isQualified": null,
    "isPopped": null,
    "isDisqualified": null,
    "isGraved": null,
    "isRanked": null,
    "limit": limit,
    "skip": (page - 1) * limit,
    "countTotal": true,
    "nominator": []
  });

  const beatmaps = useResource(BeatmapByFilterResource.searchShape(filter), {});
  const from  = (limit * (page - 1)) + 1;
  const to = from + beatmaps.count - 1;

  return (
    <div>
      <h1>Beatmaps</h1>
      <BeatmapFilter />
      <Table celled inverted selectable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Artist</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Mapper</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beatmaps.response.map(beatmap => (
            <TableRow>
              <TableCell>{beatmap.artist}</TableCell>
              <TableCell>{beatmap.title}</TableCell>
              <TableCell>{beatmap.mapper}</TableCell>
              <TableCell>{beatmap.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Table.Footer>
          <Table.Row>
            <TableHeaderCell>
              Showing {from} until {to} out of {beatmaps.total}
            </TableHeaderCell>
            <TableHeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <MenuItem as='a' icon>
                  <Icon name='chevron left' />
                </MenuItem>
                <MenuItem as='a' icon>{page}</MenuItem>
                <MenuItem as='a' icon>
                  <Icon name='chevron right' />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
};

export default Beatmaps