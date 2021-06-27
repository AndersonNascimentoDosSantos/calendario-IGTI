import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@material-ui/core';
import { CalendarGenerator } from '../../../Utils/CalendarGenerator';
import { useEffect } from 'react';
import { getEventEndPoint, IEvent } from '../../../Utils/Backend';
import { useState } from 'react';

// import { Container } from './styles';
const useStyles = makeStyles({
  table: {
    minHeight: '100vh',
    borderTop: '1px solid rgb(224,224,224)',
    '& td ~ td,& th ~ th': {
      borderLeft: '1px solid rgb(224,224,224)',
    },
  },
});

export const CalendarScreen: React.FC = () => {
  const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  const [events, setEvents] = useState<IEvent[]>([]);
  const weeks = CalendarGenerator(getToday(), events);
  const firstDate = weeks[0][0].date;
  const LastDate = weeks[weeks.length - 1][6].date;
  const classes = useStyles();

  useEffect(() => {
    //aqui a função setEvents recebe o parametro passado automaticamente do retorno do then
    getEventEndPoint(firstDate, LastDate).then(setEvents);
  }, [firstDate, LastDate]);
  return (
    <Box display="flex" height="100vh" alignItems="stretch">
      <Box
        width="16rem"
        textAlign="center"
        borderRight="1px solid rgb(224,224,224)"
        padding="0.5re 1rem"
      >
        <h1>Agenda React</h1>
        <Button variant="contained" color="primary">
          adicionar evento
        </Button>
        <Box marginTop="3rem">
          <h3>Agendas</h3>
          <FormControlLabel
            control={<Checkbox onChange={() => {}} name="gilad" />}
            label="Pessoal"
          />
          <FormControlLabel
            control={<Checkbox onChange={() => {}} name="gilad" />}
            label="Trabalho"
          />
        </Box>
      </Box>
      <TableContainer component={'div'}>
        <Box
          display="flex"
          padding="0.5rem 1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex={1}>
            <IconButton aria-label="mês anterior">
              <Icon>chevron_left</Icon>
            </IconButton>
            <IconButton aria-label="proximo mês">
              <Icon>chevron_right</Icon>
            </IconButton>
          </Box>
          <Box flex={1} paddingLeft="1rem">
            <h3>junho de 2021</h3>
          </Box>

          <IconButton aria-label="proximo mês">
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
          </IconButton>
        </Box>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {DAYS_OF_WEEK.map((day, index) => {
                return (
                  <TableCell key={index} align="center">
                    {day}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, index) => (
              <TableRow key={index}>
                {week.map((cell, ind) => {
                  return (
                    <TableCell key={ind} align="center">
                      {cell.date}
                      {cell.eventsDay.map((E) => (
                        <div key={Math.round(ind * Math.random() * 1000)}>
                          {E.time || ''}
                          {E.desc || ''}
                        </div>
                      ))}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

function getToday(): string {
  return '2021-06-17';
}
