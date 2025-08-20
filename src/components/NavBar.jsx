import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
import logo from '../assets/logo.png';
import '../../public/css/NavBar.scss';

const NavBar = () => {
    const user = useSelector(state => state.user.currentUser);
    const categories = ["אקססוריז", "ביגוד וטקסטיל", "עגלות", "רהיטים", "מתנות", "צעצועים"];
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(userOut());
    };

    return (
        <div className="NavBar">
            <nav className="nav-bar-nav">
                <ul className="nav-bar-list">
                    <div className="logo-section">
                        <li className='logo'><img src={logo} alt="" /></li>
                        <li className="nav-bar-item nav-bar-products"><Link className="nav-bar-link" to="/collection">מוצרים</Link></li>
                        {user?.role === 'admin' && <li className="nav-bar-item nav-bar-add-product">
                            <Link className="nav-bar-link" to="/addProduct">הוספת מוצר</Link>
                        </li>}
                    </div>
                    
                    <div className="left-links">
                        <li className='nav-bar-item nav-bar-greeting'>שלום {user?.userName || "אורח"}</li>
                        <li className="nav-bar-item nav-bar-user-menu">
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
                        <li className="nav-bar-item nav-bar-cart">
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
                    </div>
                </ul>
            </nav>
            
            {(location.pathname.startsWith('/collection')) && (
                <div className="categoryLinks">
                    {categories.map(cat => (
                        <NavLink
                            className={({ isActive }) => isActive ? "activeLinkCat" : "linkCat"}
                            key={cat}
                            to={encodeURI(`/collection/${cat}`)}
                        >
                            {cat}
                        </NavLink>
                    ))}
                </div>
            )}
            
        </div>
    );
}

export default NavBar;