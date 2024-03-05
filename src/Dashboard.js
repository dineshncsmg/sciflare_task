import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SwipeableDrawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';
import { UserContext } from './UserContext';

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const isDesktop = useMediaQuery('(min-width:768px)'); // Determine if screen size is desktop
  const [isDrawerOpen, setIsDrawerOpen] = useState(isDesktop); // State for drawer toggle
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedStudent, setEditedStudent] = useState({ id: '', name: '', email: '', department: '' });

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    navigate('/signin');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/signin');
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate, setUser]);

  if (!user) {
    return null;
  }

  const switchActiveMenu = (menu) => {
    setActiveMenu(menu);
  };

  // Define custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#358864',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Typography variant="h6" noWrap sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '1rem' }}>
              {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout} sx={{ display: { xs: 'none', sm: 'block' } }}>
              Log Out
            </Button>
            <IconButton color="inherit" onClick={handleLogout} sx={{ display: { xs: 'block', sm: 'none' } }}>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {isDesktop ? (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <List>
              {['studentList'].map((text) => (
                <ListItem
                  button
                  key={text}
                  selected={activeMenu === text}
                  onClick={() => setActiveMenu(text)}
                >
                  <ListItemText primary="Student List" />
                </ListItem>
              ))}
            </List>
          </Drawer>
        ) : (
          <SwipeableDrawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
          PaperProps={{
            sx: {
              marginTop: '45px' // Adjust the top margin
            }
          }}
        >
          <List>
            {['studentList'].map((text) => (
              <ListItem
                button
                key={text}
                selected={activeMenu === text}
                onClick={() => setActiveMenu(text)}
              >
                <ListItemText primary="Student List" />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            top: { sm: `50px` },
            overflowY: 'auto' // Make student list scrollable in responsive
          }}
        >
          <Toolbar />
          <StudentList />
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent>
              <AddStudentForm switchActiveMenu={switchActiveMenu} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent>
              <AddStudentForm
                switchActiveMenu={switchActiveMenu}
                initialStudent={editedStudent}
                handleClose={() => setOpenEditDialog(false)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
