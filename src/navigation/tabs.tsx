import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Home" component={Home}/>
        </Tab.Navigator>
    )
}

export default Tabs;