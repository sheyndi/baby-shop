import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { userOut } from '../features/userSlice';
import '../../public/css/NavBar.scss';

const NavBar = () => {
    const user = useSelector(state => state.user.currentUser);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(userOut());
    };

    return (
        <div className="NavBar">
            <nav className="nav-bar-nav">
                <ul className="nav-bar-list">
                    <li className="nav-bar-item nav-bar-products"><Link className="nav-bar-link" to="/collection">מוצרים</Link></li>
                    <li className='nav-bar-item'>שלום {user?.userName || "אורח"}</li>
                    <li>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            size="small"
                                            {...bindTrigger(popupState)}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}><FaUser></FaUser></Avatar>
                                        </IconButton>
                                    </Tooltip>

                                    {user ? (
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}>Profile</MenuItem>
                                            <MenuItem onClick={popupState.close}>My account</MenuItem>
                                            <MenuItem onClick={() => { popupState.close(); handleLogout(); }}>Logout</MenuItem>
                                        </Menu>) : (<Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={() => { popupState.close(); navigate('/login'); }}>התחברות</MenuItem>
                                            <MenuItem onClick={() => { popupState.close(); navigate('/signup'); }}>הרשמה</MenuItem>
                                        </Menu>)}
                                </React.Fragment>
                            )}
                        </PopupState>

                    </li>
                    <li className="nav-bar-item">
                        <Link className="nav-bar-link" to="/cart">
                        <IconButton>
                            <Badge
                                badgeContent={cart.quantityProduct}
                                color="primary"
                                overlap="circular"
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        fontSize: "10px", 
                                        minWidth: "17px", 
                                        height: "17px",   
                                        right: 1,         
                                        top: 1           
                                    }
                                }}
                            >
                                <ShoppingCartIcon fontSize="big" />
                            </Badge>
                        </IconButton>
                    </Link>
                    </li>
                    {user?.role === 'admin' && <li className="nav-bar-item">
                        <Link className="nav-bar-link" to="/addProduct">הוספת מוצר</Link>
                    </li>}
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;