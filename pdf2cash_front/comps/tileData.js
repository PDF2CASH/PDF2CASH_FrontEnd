// This file is shared across the demos.

import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import TimelineIcon from '@material-ui/icons/Timeline';

export const mailFolderListItems = (
    <div>
        <ListItem button component="a" href="/worker">
            <ListItemIcon>
                <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Listar Funcionarios" />
        </ListItem>
        <ListItem button component="a" href="/invoice">
            <ListItemIcon>
                <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Listar Nota Fiscais" />
        </ListItem>
        <ListItem button component="a" href="/invoice/create">
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Criar Nota Fiscal" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Criar Funcionarios" />
        </ListItem>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button component="a" href="/">
            <ListItemIcon>
                <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Ver analises" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
        </ListItem>
    </div>
);
