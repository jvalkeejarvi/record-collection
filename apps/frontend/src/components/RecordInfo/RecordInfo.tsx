import { List, ListItem, ListItemText } from '@mui/material';
import { RecordDto } from '@record-collection/records-client';

export interface RecordInfoProps {
  record: RecordDto;
}

export function RecordInfo({ record }: RecordInfoProps) {
  return (
    <List>
      <ListItem>
        <ListItemText primary="Artist" secondary={record.artist}></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText primary="Record" secondary={record.name}></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText primary="Id" secondary={record.id}></ListItemText>
      </ListItem>
    </List>
  );
}

export default RecordInfo;
