import * as React from 'react';
import {DashboardMenuItem, MenuItemLink} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PeopleIcon from '@material-ui/icons/People';

export const menu = () => (
    <div>
        <DashboardMenuItem/>
        <MenuItemLink to="/envInfo" primaryText="환경정보" leftIcon={<BookIcon/>}/>
        <MenuItemLink to="/apiInfo" primaryText="API정보" leftIcon={<ChatBubbleIcon/>}/>
        <MenuItemLink to="/transfer" primaryText="이관" leftIcon={<PeopleIcon/>}/>
    </div>
);