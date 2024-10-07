import TodoList from './TodoList.jsx';
import { Box, Tab} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState} from 'react';
import './App.css'


function App() {
  const [value, setValue] = useState('1')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label='Tabs' onChange={handleChange}>
            <Tab label='Home' value='1'/>
            <Tab label='Todos' value='2'/>
          </TabList>
        </Box>
        <TabPanel value='1'>Welcome</TabPanel>
        <TabPanel value='2'>{<TodoList />}</TabPanel>
      </TabContext>
      
    </Box>
     
  );
}

export default App
